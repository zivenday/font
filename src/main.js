// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import store from './store/index.js'
import Cookies from 'js-cookie'

Vue.use(ElementUI)

// 路由检测
// register global progress.
const whiteList = ['/login','/signUp', '/401', '/404'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  console.log('cookies', Cookies.get())
  if (Cookies.getJSON('user')) {
    if (to.path === '/login') {
      router.replace({
        path: '/'
      })
    } else {
      if (!store.getters.name) {
        store.dispatch('USER_SIGNIN', Cookies.getJSON('user')).then(res => {
          next()
        })
      } else {
        next()
      }
    }
  } else {
    console.log('token 不存在')
    whiteList.indexOf(to.path) === -1 ? router.replace({
      path: '/login'
    }) : next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
