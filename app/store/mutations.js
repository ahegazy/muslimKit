const Vue = require('nativescript-vue');

module.exports = {
    updateVar(state,payload){
        state.data[payload.var] = payload.data
    }
}