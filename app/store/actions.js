const Vue = require('nativescript-vue');
const httpModule = require("http");
const fileSystem = require("tns-core-modules/file-system");
const Azkar = fileSystem.knownFolders.currentApp().getFolder('Azkar');

module.exports = {
    checklocalStorage: function({commit,dispatch}) {
            let data = this.getters.getData
                for (let i=0;i<data.list.length;i++){
                    return new Promise((resolve, reject) => {
                        dispatch('getFile',{
                        fname: data.list[i].filename,
                        url : data.list[i].url
                    }).then((res)=>{
                        resolve(res)
                    }).catch((err) => {
                        reject(err)
                    })
                })
                }
                
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
                                resolve(res)
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
                    }).then(()=>{
                        dispatch('checklocalStorage').then((res)=>{
                            resolve(res)
                        }).catch((err) => {
                            reject(err)
                        });
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
                            resolve(res)
                        }).catch((err) => {
                            reject(err)
                        })
                    })
                    }else {
                        return new Promise((resolve, reject) => {
                            dispatch('readFile',{
                                fname: fname
                            }).then((res)=>{
                                resolve(res)
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
                    httpModule.getJSON(url).then((response) => {
                        dispatch('saveFile',{
                            fname: fname,
                            data: response
                        }).catch((err) => {
                            reject(err)
                        })
                        commit('updateVar', {
                            var: fname,
                            data : response
                        })     
                        resolve('got file from internet')
                    }, (err) => {
                            console.log('No internet connection ' + err);
                            reject('Error in getting file from the internet, please allow this app to use internet and try again/')
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
                            resolve('Done writing data')
                            console.log('Done writing data');
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
                        console.log('file read success');
                        data = JSON.parse(response); 
                        commit('updateVar', {
                            var: fname,
                            data : data
                        })
                        resolve('file read success')
                    }).catch((err) => {
                        console.log('Error in reading file: ' + err.stack);
                        reject('Error reading file: ' + err.stack)
                    });
                })
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
            }//
        
}