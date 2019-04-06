import http from './http'
import {formatSeconds} from './filters'
export default {
  install: function(vue) {
    vue.prototype.$http = http
    vue.filter('formatSeconds', formatSeconds)
  }
}
export function debounce(fn, delay) {
  let timer
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}
