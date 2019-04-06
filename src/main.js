// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Plugin from './utils/index'
import store from './store/index'
import Vant from 'vant'
Vue.use(Plugin)
Vue.config.productionTip = false
import './assets/css/base.css'
import 'vant/lib/index.css'
Vue.use(Vant)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
