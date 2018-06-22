module.exports =  {
    getData (state) {
      return state.data
    },
    getPrayerTimes (state) {
      return state.PrayerTimes
    },
    getMethod(state){
      return state.prayerMethod
    }
}