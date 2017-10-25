import axios from './axios'
// import {
//   addInterceptor
// } from './interceptor'
const apiUrl = '/api'
axios.addInterceptor(axios)// 添加拦截
export const loginByPWD = params => {
  return axios.post(`${apiUrl}/user/login`, params)
}
export const removeFeedback = params => {
  return axios.get(`${apiUrl}/feedback/remove`, {
    params: params
  })
}
export const queryFeedbacks = params => {
  return axios.post(`${apiUrl}/feedback`+params.id,params)
}
export const GetGithubOauth = () => {
  return axios.get(`${apiUrl}/user/oauthPath`)
}
export const signUpByPWD=params=>{
  return axios.post(`${apiUrl}/user/signUp`,params)
}
// export const GetOauthUserInfo = params => {
//   return axios.get(`${apiUrl}/users/getOauthUser`, {
//     params: params
//   })
// }
