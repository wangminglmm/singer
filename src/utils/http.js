import axios from 'axios'
const TIMEOUT = 40000
const service = axios.create({
  timeout: TIMEOUT,
  // headers: { 'format': 'JSON' }
})
// 把每个请求链接拼接参数
service.interceptors.request.use(function(config) {
  let queryObj = sessionStorage.getItem('token') || '{}'
  queryObj = JSON.parse(queryObj)
  config.params = config.params || {}
  config.params.u = queryObj.u || ''
  config.params.p = queryObj.p || ''
  config.params.v = queryObj.v || ''
  return config
})
service.interceptors.response.use(function(res) {
  return res.data
})
export default service
