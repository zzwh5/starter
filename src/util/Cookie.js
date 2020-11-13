import cookies from 'js-cookie'
export function getCookie(name) {
  // console.log( cookies.get(name))
  var value = cookies.get(name)
  return value
}

// 设置cookie,增加到vue实例方便全局调用
export function setCookie(c_name, value, expiredays) {
  var d = new Date().getTime()
  // console.log(d)
  var date = new Date(d + expiredays)
  // console.log(date)
  cookies.set(c_name, value, {
    expires: date
  })
}

// 删除cookie
export function delCookie(name) {
  cookies.remove(name)
}
