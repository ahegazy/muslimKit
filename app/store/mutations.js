const Vue = require('nativescript-vue');

module.exports = {
    updateVar(state,payload){
        state.data[payload.var] = payload.data
    },
    updatePrayerTimes(state,payload){
        state.PrayerTimes = payload.data
    },
    updateMethod(state,payload){
        state.prayerMethod = payload.data
    },
    updateNewestVer(state,payload){
        state.newestVer = payload.data
    }
}