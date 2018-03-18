const axios = require('axios')

const ajaxFun = function (url, headers = {
  'Content-Type': 'application/json'
}, timeout = 25000) {
  const ajax = axios.create({
    baseURL: url,
    headers: headers,
    timeout: timeout // 请求超时时间
  })

  // 注册请求拦截器
  ajax.interceptors.request.use(config => {
    return config
  }, err => {
    return Promise.reject(err)
  })
  // 注册响应拦截器
  ajax.interceptors.response.use(response => {
    return Promise.resolve(response.data)
  }, err => {
    return Promise.reject(err)
  })
  return ajax
}

module.exports = ajaxFun