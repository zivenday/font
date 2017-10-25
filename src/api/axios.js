import store from '../store'
import axios from 'axios'
import Cookie from 'js-cookie'
import router from '../router'
// 添加请求拦截器
axios.defaults.withCredentials = true
let addInterceptor = axios => {
  axios.interceptors.request.use(
    // 在发送请求之前做某事
    config => {
      return config
    },
    function (error) {
      // 请求错误时做些事
      return Promise.reject(error)
    })
  // 添加响应拦截器
  axios.interceptors.response.use(
    function (response) {
      // 对响应数据做些事
      if(response.data.code===1){
        console.log(response.data.message)
            Cookie.remove('user')
            router.push({path:'/login'})
      }
      console.log(document.cookie)
      return response
    },
    function (error) {
      // 请求错误时做些事
      return Promise.reject(error)
    })
}
axios.addInterceptor = addInterceptor
export default axios
