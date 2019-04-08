import axios from 'axios'
import qs from 'qs';
const TIMEOUT = 40000
const service = axios.create({
  timeout: TIMEOUT,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
// 把每个请求链接拼接参数
service.interceptors.request.use(function(config) {
  let queryObj = sessionStorage.getItem('token') || '{}'
  queryObj = JSON.parse(queryObj)
  config.params = config.params || {}
  config.params.u = queryObj.u || ''
  config.params.p = queryObj.p || ''
  config.params.v = queryObj.v || ''
  config.data = qs.stringify(config.data)
  return config
})
service.interceptors.response.use(function(res) {
  return res.data
})
export default service
