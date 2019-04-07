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
export function queryParams(search='') {
  search = search.replace(/.+?\?(.*)#?|$/, (input, $1) => {
    return $1
  })
  let arr = search.split('&')
  let queryObj = arr.reduce((ret, item) => {
    let tempArr = item.split('=')
    ret[tempArr[0]] = tempArr[1]
    return ret
  }, {})
  return queryObj
}
