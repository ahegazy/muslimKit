const Vue = require('nativescript-vue');

module.exports = {
    updateVar(state,payload){
        state.data[payload.var] = payload.data
    },
    updatePrayerTimes(state,payload){
        state.PrayerTimes = payload.data
    }
}