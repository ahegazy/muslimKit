const Vue = require('nativescript-vue');

const App = require('./components/App');
const httpModule = require("http");
const fileSystem = require("tns-core-modules/file-system");
const store = require('./store')
const geoLocation = require('nativescript-geolocation');

Vue.prototype.$httpModule = httpModule;
Vue.prototype.$fileSystem = fileSystem;
Vue.prototype.$store = store;
Vue.prototype.$geoLocation = geoLocation;

//Vue.config.silent = false;

new Vue({
  render: h => h(App),
}).$start();
