const Vue = require('nativescript-vue');
const Vuex = require('vuex');

Vue.use(Vuex);

const mutations = require('./mutations');
const actions = require('./actions');
const getters = require('./getters');

module.exports = new Vuex.Store({
  state: {
    isLoading: false,
    data: {}
    },
  mutations,
  actions,
  getters
  
})