import Vue from 'vue'
import Cookies from 'js-cookie'

export const USER_SIGNIN = 'USER_SIGNIN' // 登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT' // 退出登录

const user = {
  state: Cookies.getJSON('user') || {},
  mutations: {
    [USER_SIGNIN] (state, user) {
      console.log('state.......',state)
      // sessionStorage.setItem('user', JSON.stringify(user))
      Object.assign(state, user)
    },
    [USER_SIGNOUT] (state) {
      console.log('state.......',state)
      // sessionStorage.removeItem('user')
      Object.keys(state).forEach(k => Vue.delete(state, k))
    }
  },
  actions: {
    [USER_SIGNIN] ({
      commit
    }, user) {
      return new Promise((resolve, reject) => {
        commit(USER_SIGNIN, user)
        resolve()
      })
    },
    [USER_SIGNOUT] ({
      commit
    }) {
      return new Promise((resolve, reject) => {
        commit(USER_SIGNOUT)
        resolve()
      })
    }
  }
}

export default user
