const Vue = require('nativescript-vue');
const httpModule = require("http");
const fileSystem = require("tns-core-modules/file-system");
const Azkar = fileSystem.knownFolders.currentApp().getFolder('Azkar');

module.exports = {
    checklocalStorage: function({commit,dispatch}) {
            let data = this.getters.getData
                for (let i=0;i<data.list.length;i++){
                    dispatch('getFile',{
                        fname: data.list[i].filename,
                        url : data.list[i].url
                    })
                }
                
            },
            getList: function({commit,dispatch}){
                if(!this.state.data.hasOwnProperty('list')){    
                    let path = fileSystem.path.join(Azkar.path, 'list.json');
                    let exists = fileSystem.File.exists(path);
                    if(!exists){
                        dispatch('updateList');
                        //.then(()=>{return});
                    }else{
                        dispatch('readFile',{
                            fname: 'list'
                        })
                    }
                }
            },
            updateList: function({commit,dispatch}){ //force update the list from the internet even if it exists .. 
                dispatch('getFile',{
                    fname: 'list',
                    url : 'https://raw.githubusercontent.com/ahegazy/muslimKit/master/json/list.json'
                }).then(()=>{
                    dispatch('checklocalStorage');
                })
            },updateData: function({commit,dispatch},payload){
                fname = payload.fname;
                url = payload.url
    
                    let path = fileSystem.path.join(Azkar.path, fname + '.json');
                    let exists = fileSystem.File.exists(path);
        
                    if(!exists){
                        dispatch('getFile',{
                            fname:  fname,
                            url : url
                        })
                    }else {
                        dispatch('readFile',{
                            fname: fname
                        })
                    }
            },
            getFile: function({commit,dispatch},payload){
                let fname = payload.fname;
                let url = payload.url;
                
                httpModule.getJSON(url).then((response) => {
                    dispatch('saveFile',{
                        fname: fname,
                        data: response
                    })
                    commit('updateVar', {
                        var: fname,
                        data : response
                    })     
                }, (e) => {
                    console.log('err')
                    alert('No internet connection ' + e);
                });   
        
            },
            saveFile: function({commit},payload){
                let fname = payload.fname;
                let data = payload.data;

                const path = fileSystem.path.join(Azkar.path, fname + '.json');
                const file = fileSystem.File.fromPath(path);

                file.writeText(JSON.stringify(data))
                    .then((result) => {
                    /*    this.dispatch('readFile',{
                            fname: fname
                        })*/
                        console.log('Done writing data');
                    }).catch((err) => {
                        console.log(err);
                    });
            },
            readFile: function({commit},payload){
                let fname = payload.fname;

                const file = Azkar.getFile(fname + '.json');
                let data;
                file.readText()
                .then((response) => {
                    console.log('file read success');
                    data = JSON.parse(response); 
                    commit('updateVar', {
                        var: fname,
                        data : data
                    })                    
                });
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