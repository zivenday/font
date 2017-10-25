import {
    defaultRoutesMap,
  permissionRoutesMap
} from 'src/router'



function hasPermission(role, route) {
  if (route.meta && route.meta.requireRole) {
    return route.meta.requireRole.contain(role)
  } else {
    return false
  }
}
const permission = {
  state: {
    basicRouters: [],
    permissionRouters:undefined
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
        defaultRoutesMap.concat(routers)
        state.permissionRouters= routers;
        state.basicRouters=defaultRoutesMap
        
    }
  },
  actions: {
    GetPermissionRouters({commit}, role) {
      return new Promise((resolve, reject) => {
        var routers = permissionRoutesMap.filter(v => {
          if (hasPermission(role, v)) {
              if(v.children){
                  v.children=v.children.filter(child=>{
                      if(hasPermission(role,child)){
                          if(child.children){
                              child.children=child.children.filter(grandChild=>{
                                  if(hasPermission(role,grandChild)){
                                      return grandChild
                                  }
                              })
                          }
                            return child
                      }
                  })
              }
              return v
          }
        })
        commit('SET_ROUTERS', routers)
        resolve()
      })

    }
  }
}

export default permission
