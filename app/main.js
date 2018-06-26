const Vue = require('nativescript-vue');

const App = require('./components/App');
const httpModule = require("http");
const fileSystem = require("tns-core-modules/file-system");
const store = require('./store')
const geoLocation = require('nativescript-geolocation');
const platformModule = require("tns-core-modules/platform");
const utilityModule = require("utils/utils");
const SocialShare = require("nativescript-social-share");

Vue.prototype.$httpModule = httpModule;
Vue.prototype.$fileSystem = fileSystem;
Vue.prototype.$store = store;
Vue.prototype.$geoLocation = geoLocation;
Vue.prototype.$platform = platformModule;
Vue.prototype.$utility = utilityModule;
Vue.prototype.$SocialShare = SocialShare;
Vue.prototype.$currentVersion = '0.2.3';
//Vue.config.silent = false;

new Vue({
  render: h => h(App),
}).$start();
