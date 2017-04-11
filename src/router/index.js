import Vue from 'vue'
import Router from 'vue-router'
import Login from 'views/Login/Login.vue'
import Main from 'views/Main/index.vue'
import Feedback from 'views/Feedback/index.vue'

Vue.use(Router)

export default new Router({
	 mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
    	path:'/main' , 
    	name:'main',
    	component: Main,
      children:[
        {path:'/main/feedback',name:'feedback',component:Feedback}
      ]
    }
  ]
})
