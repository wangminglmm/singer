import axios from 'axios'
const TIMEOUT = 40000
const service = axios.create({
  timeout: TIMEOUT,
  headers: { 'format': 'JSON' }
})

export default service
