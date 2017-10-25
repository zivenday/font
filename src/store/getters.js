const getters = {
  id: state => state.user.id,
  name: state => state.user.name,
  token: state => state.user.token,
  routers:state=>state.permission.routers,
  permissionRouters: state => state.permission.permissionRouters
}
export default getters
