const httpModule = require("http");
const fileSystem = require("tns-core-modules/file-system");
const geoLocation = require('nativescript-geolocation');
const appVersion = require("nativescript-appversion");

const Azkar = fileSystem.knownFolders.currentApp().getFolder('Azkar');
const date = new Date();

module.exports = {
    checklocalStorage: function({commit,dispatch}) {
            let data = this.getters.getData
            return new Promise((resolve, reject) => {
                for (let i=0;i<data.list.length;i++){
                        dispatch('getFile',{
                        fname: data.list[i].filename,
                        url : data.list[i].url
                    }).then((res)=>{
                        commit('updateVar', {
                            var: data.list[i].filename,
                            data : res
                        })
                    }).catch((err) => {
                        reject(err)
                    })
                }
                resolve('local files updated')
                })
                
            },
            getList: function({commit,dispatch}){
                if(!this.state.data.hasOwnProperty('list')){    
                    let path = fileSystem.path.join(Azkar.path, 'list.json');
                    let exists = fileSystem.File.exists(path);
                    if(!exists){
                        return new Promise((resolve, reject) => {
                            dispatch('updateList').then((res)=>{
                                resolve(res)
                            }).catch((err) => {
                                reject(err)
                            });
                        });
                    }else{
                        return new Promise((resolve, reject) => {
                            dispatch('readFile',{
                                fname: 'list'
                            }).then((res)=>{
                                commit('updateVar', {
                                    var: 'list',
                                    data : res
                                })        
                                resolve('Success: reading datafully')
                            }).catch((err) => {
                                reject(err)
                            })
                        })
                    }
                }
            },
            updateList: function({commit,dispatch}){ //force update the list from the internet even if it exists .. 
                return new Promise((resolve, reject) => {
                    dispatch('getFile',{
                        fname: 'list',
                        url : 'https://ahegazy.github.io/muslimKit/json/list.json'
                    }).then((res)=>{
                        commit('updateVar', {
                            var: 'list',
                            data : res
                        })
                        resolve('list updated')
                    }).catch((err) => {
                        reject(err)
                    })
                })
                
                
            },updateData: function({commit,dispatch},payload){
                fname = payload.fname;
                url = payload.url

                    let path = fileSystem.path.join(Azkar.path, fname + '.json');
                    let exists = fileSystem.File.exists(path);
        
                    if(!exists){
                        return new Promise((resolve, reject) => {
                            dispatch('getFile',{
                            fname:  fname,
                            url : url
                        }).then((res)=>{
                            commit('updateVar', {
                                var: fname,
                                data : res
                            })
                            resolve(fname + ' updated')    
                        }).catch((err) => {
                            reject(err)
                        })
                    })
                    }else {
                        return new Promise((resolve, reject) => {
                            dispatch('readFile',{
                                fname: fname
                            }).then((res)=>{
                                commit('updateVar', {
                                    var: fname,
                                    data : res
                                })        
                                resolve('Success: reading datafully')
                            }).catch((err) => {
                                reject(err)
                            })
                        })
                    }
            },
            getFile: function({commit,dispatch},payload){
                let fname = payload.fname;
                let url = payload.url;
                return new Promise((resolve, reject) => {
                    httpModule.getJSON(url).then((res) => {
                        dispatch('saveFile',{
                            fname: fname,
                            data: res
                        }).catch((err) => {
                            reject(err)
                        })
                        resolve(res)
                    }, (err) => {
                            console.log('No internet connection ' + err);
                            reject('Error in connecting to the internet, please allow this app to use internet and try again.')
                        });   
                    })
            },
            saveFile: function({commit},payload){
                let fname = payload.fname;
                let data = payload.data;

                const path = fileSystem.path.join(Azkar.path, fname + '.json');
                const file = fileSystem.File.fromPath(path);
                return new Promise((resolve, reject) => {
                    file.writeText(JSON.stringify(data))
                        .then((result) => {
                            resolve('Success: writing data')
                            console.log('Success: writing data');
                        }).catch((err) => {
                            console.log('Error in saving file: ' + err);
                            reject('Error saving file: ' + err)
                        });
                })
            },
            readFile: function({commit},payload){
                let fname = payload.fname;

                const file = Azkar.getFile(fname + '.json');
                let data;
                return new Promise((resolve, reject) => {
                    file.readText()
                    .then((response) => {
                        console.log('Success: reading data');
                        data = JSON.parse(response); 
                        resolve(data);
                    }).catch((err) => {
                        console.log('Error in reading file: ' + err.stack);
                        reject('Error reading file: ' + err.stack)
                    });
                })
            },getCurrentLocation: function({commit,dispatch},payload){
                return new Promise((resolve, reject) => {
                    dispatch('geoLocationisEnabled').then(()=>{
                        geoLocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000}).
                        then(function(loc) {
                            if (loc) {
                                resolve(loc);
                            }else{
                                reject('Error in getting location');
                            }
                        }, function(e){
                            reject('Error in getting location: ' + e.message);
                            console.log("Error: " + e.message);
                        });
                    }).catch((e) => {
                        reject(e);
                    })
                });
            },geoLocationisEnabled: function({commit,dispatch},payload){
                return new Promise((resolve, reject) => {
                        geoLocation.isEnabled().then(function (isEnabled) {
                            if (!isEnabled) {
                                geoLocation.enableLocationRequest().then(function (res) {
                                    resolve(res)
                                }, function (e) {
                                    console.log("Error: " + (e.message || e));
                                    reject("Error: " + (e.message || e))
                                });
                            }else {
                                resolve('Location is enabled')
                            }         
                    }, function (e) {
                        console.log("Error: " + (e.message || e));
                        reject("Error: " + (e.message || e))
                    });
                });
            },updatePrayerTime({commit,dispatch},payload){
                let month = date.getMonth() + 1;
                let year = date.getFullYear();
                return new Promise((resolve, reject) => {
                    dispatch('getCurrentLocation').then((res)=>{ //check if methood changed
                        let location = res
                        let method = this.getters.getMethod  
                        dispatch('getFile',{
                            url: 'http://api.aladhan.com/v1/calendar?latitude='+location.latitude+'&longitude='+location.longitude+'&method='+method+'&month='+month+'&year='+year, 
                            fname: 'prayerTimes'
                        }).then((res) => {
                            dispatch('getTodayPrayers',{
                                data : res.data
                            }).then(()=>{
                                resolve('Prayers Time Updated')
                            }).catch((err)=>{
                                reject(err)
                            })
                        }).catch((err) => {
                            reject(err)
                        });
                    }).catch((err)=>{
                        reject(err)
                    })
                });
            },
            getPrayerTimes:  function({commit,dispatch},payload){
                if(!this.state.data.hasOwnProperty('prayerTimes')){    
                    let path = fileSystem.path.join(Azkar.path, 'prayerTimes.json');
                    let exists = fileSystem.File.exists(path);
                    return new Promise((resolve, reject) => {
                        if(!exists){
                            reject("Please choose your configuration and click update.")
                        }else{
                            dispatch('readFile',{
                                fname: 'prayerTimes'
                            }).then((res)=>{
                                dispatch('getTodayPrayers',{
                                    data : res.data
                                }).then(()=>{
                                    resolve('Prayer Time Updated')
                                }).catch((err)=>{
                                    reject(err)
                                })
                            }).catch((err) => {
                                reject(err)
                            })
                    }
                });
                }
            },
            getTodayPrayers: function({commit,dispatch},payload){
                let data = payload.data;
                let PrayingTimes = {};
                var dd = date.getDate();
                var mm = date.getMonth()+1;
                var yyyy = date.getFullYear();
                if(dd<10){
                    dd='0'+dd;
                } 
                if(mm<10){
                    mm='0'+mm;
                }

                if(data[0].date.gregorian.date.split("-")[1] === mm){
                    let CurrentDate = dd + '-' + mm + '-' + yyyy
                    for(let i = 0;i<data.length;i++){
                        if(data[i].date.gregorian.date === CurrentDate){
                            PrayingTimes = data[i];
                        }
                    }
                    commit('updateMethod',{
                        data: PrayingTimes.meta.method.id
                    })
                    commit('updatePrayerTimes', {
                        data : PrayingTimes
                    })
                }else {
                    dispatch('updatePrayerTime').then((res)=>{                    
                        resolve(res)
                    }).catch((err)=>{
                        reject(err)
                    })
                }
            },
            navigate: function({commit},payload){
                let to = payload.to;
                this.$navigateTo(viewAzkar,{
                    context: {
                        propsData: { 
                            view: to.filename 
                        }
                    }
                });
            },
            checkforUpdate: function({commit,dispatch},payload){
                return new Promise((resolve, reject) => {
                    dispatch('getFile',{
                        fname: 'version',
                        url : 'https://ahegazy.github.io/muslimKit/json/version.json'                   
                    }).then((res) => {
                        commit('updateNewestVer',{
                            data: res
                        })
                        this.dispatch('checkIfnewest').then(res=>{
                            resolve(res);
                        }).catch(err => {
                            reject(err)
                        });
                    }).catch((err) => {
                        reject (err);
                    });
                });
            },
            checkIfnewest({commit,dispatch},payload){
                let that = this;
                return new Promise((resolve, reject) => {
                    appVersion.getVersionName().then(function(v) {
                        let currentVer = v.split('.');
                        let newestVer = that.getters.getNewestVer;
                        if(Object.keys(newestVer).length === 0){
                            dispatch('checkforUpdate').then(res=>{
                                resolve(res)
                            }).catch(err=>{
                                reject(err);
                            });
                        }else{
                            newVer = newestVer.CurrentVersion.split('.');
                            if (newVer[0] > currentVer[0] || (newVer[0] === currentVer[0] && newVer[1] > currentVer[1]) || (newVer[0] === currentVer[0] && newVer[1] === currentVer[1] && newVer[2] > currentVer[2])){
                                console.log('new Version Available')
                                resolve(true);
                            }
                            resolve(false);    
                        }
                    }).catch(err => {
                        reject(err);
                    });
                });
            }
        
}