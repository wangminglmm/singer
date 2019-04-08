// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Plugin from './utils/index'
import store from './store/index'
import Vant from 'vant'
import {initJsBridge} from './utils/jsBridge'
initJsBridge()
Vue.use(Plugin)
Vue.config.productionTip = false
import './assets/css/base.css'
import 'vant/lib/index.css'
Vue.use(Vant)
import {queryParams} from './utils/index'
saveToken() // 页面初始化把用户信息保存在sessionStorage
function saveToken() {
  let tokenObj = queryParams(location.href)
  if (tokenObj['u']) {
    store.commit('setUserInfo', tokenObj)
    sessionStorage.setItem('token', JSON.stringify(tokenObj))
  }
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
