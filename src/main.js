// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import  { AlertPlugin } from 'vux'
import VueLazyload from 'vue-lazyload'
import loading from './images/loading'
import https from './plugins/https';
Vue.use(AlertPlugin);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: loading,
  attempt: 1
});
Vue.use(https);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  https: 'https-test',
  template: '<App/>',
  components: { App }
})
