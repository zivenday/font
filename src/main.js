// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import '../theme/index.css'
import Vue from 'vue'
import Vuex from "vuex"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store/index'
import Cookies from 'js-cookie'

Vue.use(ElementUI)
Vue.use(Vuex)
// 路由检测
// register global progress.
Array.prototype.contain = function (obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
}

const whiteList = ['/login','/signUp', '/401', '/404'] // 不重定向白名单
const blockList=['/','/login']//登录或授权后，cookie获取用户信息，需要屏蔽路由名单
router.beforeEach((to, from, next) => {
  if (Cookies.getJSON('user')) {
    if (blockList.contain(to.path)) {//登录或授权后，需要屏蔽路由名单
			router.replace({path: '/main'})
		} else {                      
			if (!store.getters.permissionRouters) { // 判断当前用户是否已经获得完整的可访问的路由
				  store.dispatch('GetPermissionRouters',Cookies.getJSON('user').role).then(res=>{
          router.addRoutes(store.getters.permissionRouters)
          next(to.path)
        })
			} else {
          next()
			}
		}
  } else {
    console.log('token 不存在')
    whiteList.contain(to.path) ? next():router.replace({ path: '/login'})
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // template: '<App/>',
  // components: {
  //   App
  // }
  render: h => h(App)
})
