export function getCookie (cookie) {
  let arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')  // 正则匹配
  if (arr = cookie.match(reg)) {
    return unescape(arr[2])
  } else {
    return null
  }
}
