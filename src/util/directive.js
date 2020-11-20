// 注册一个 全局自定义指令 判断当前的dom元素是是否创建
import Vue from 'vue'

Vue.directive('isshow', {
  // 当指令绑定到元素上时，就会执行该函数，执行一次；此时元素还未插入到 DOM 中去。
  // 一般执行样式相关的操作
  bind: function(el, binding) {},
  //  被绑定元素插入父节点时会调用该函数，执行一次
  // 一般执行 JS 行为相关的操作。
  inserted: function(el, binding, vnode) {
    console.log(el, binding, vnode)
    // 当前的权限
    var nowRole = binding.value
    // 用户登录的权限列表
    var roleList = []
    // 判断登录的用户是否有当前的权限 没有当前的dom元素隐藏或者不显示
    if (roleList.indexOf(nowRole) == -1) {
      el.parentNode
        ? el.parentNode.removeChild(el)
        : (el.style.display = 'none')
    }
  },
  // update 当 vnode 更新时执行该函数，可能执行多次。
  updated(el) {}
})
