import Vue from 'vue'
import Router from 'vue-router'
import Login from 'views/Login/Login'
import signUp from 'views/Login/signUp'
import Main from 'views/Main/index'
import Feedback from 'views/Feedback/index'
import Pano from 'views/Pano/index'
import UserSetting from 'views/User/userSetting'
import UserQuery from 'views/User/userQuery'
import UserAuthority from 'views/User/userAuthority'
import Video from 'views/Video/index'

Vue.use(Router)
export  const  defaultRoutesMap=[{
  path: '/',
  navhidden:true
}, {
  path: '/login',
  name: 'Login',
  component: Login,
  navhidden:true
}, {
  path: '/signUp',
  name: 'signUp',
  component: signUp,
  navhidden:true
}]
export const permissionRoutesMap=[{
  path: '/main',
  name: 'main',
  cn:'首页',//中文名称
  component: Main,
  meta: { requireRole: [1,2] },//拥有该路由的角色
  children: [,{
    path:'/main/user',
    name:'user',
    cn:'用户管理',
    icon:'el-icon-message',
    meta:{requireRole:[1,2]},
    component:UserSetting,
    children:[{
      path:'/main/user/query',
      name:'userQuery',
      cn:'用户查询',
      meta:{requireRole:[1]},
      component:UserQuery
    },{
      path:'/main/user/authority',
      name:'userAuthority',
      cn:'授权管理',
      meta:{requireRole:[1]},
      component:UserAuthority
    },{
      path:'/main/user/setting',
      name:'userSetting',
      cn:'个性设置',
      meta:{requireRole:[1,2]},
      component:UserSetting
    }]
  },{
    path: '/main/feedback',
    name: 'feedback',
    cn:'反馈信息',
    icon:'el-icon-setting',//图标显示
    meta: { requireRole: [1,2] },
    component: Feedback
  },
  {
    path: '/main/pano',
    name: 'pano',
    cn:'图片管理',
    icon:'el-icon-menu',
    component: Pano,
    meta: { requireRole: [1,2] }
  },{
    path: '/main/video',
    name: 'video',
    cn:'视频管理',
    icon:'el-icon-menu',
    component: Video,
    meta: { requireRole: [1,2] }
  }
  ]
}]
export default new Router({
  mode: 'history',
  routes: defaultRoutesMap
})
