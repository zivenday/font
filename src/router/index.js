import Vue from 'vue'
import Router from 'vue-router'
import Login from 'views/Login/Login.vue'
import signUp from 'views/Login/signUp.vue'
import Main from 'views/Main/index.vue'
import Feedback from 'views/Feedback/index.vue'
import Pano from 'views/Pano/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: { name: 'main' }
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/signUp',
    name: 'signUp',
    component: signUp
  },{
    path: '/main',
    name: 'main',
    component: Main,
    children: [{
      path: '/main/feedback',
      name: 'feedback',
      component: Feedback
    },
    {
      path: '/main/pano',
      name: 'pano',
      component: Pano
    }
    ]
  }]
})
