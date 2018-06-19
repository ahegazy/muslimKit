const Vue = require('nativescript-vue');

const App = require('./components/App');
const httpModule = require("http");
const fileSystem = require("tns-core-modules/file-system");
const store = require('./store')

Vue.prototype.$httpModule = httpModule;
Vue.prototype.$fileSystem = fileSystem;
Vue.prototype.$store = store;

//Vue.config.silent = false;

new Vue({
  render: h => h(App),
}).$start();
