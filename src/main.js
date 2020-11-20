import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { getToken } from './util/token-storage'

// 重置库
import './assets/style/reset.css'

// antd的组件库
import './util/import'

// 引入自定义指令
import './util/directive'

// 路由进度条
// 导入
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 配置滚动条
NProgress.configure({ showSpinner: false, ease: 'ease', speed: 1500 })
const whiteList = ['/user']
// 在路由守卫里去监控路由变化，从而触发进度条
// 路由变化时
router.beforeEach((to, from, next) => {
  // 进度条开始
  NProgress.start()
  const hasToken = getToken()
  // if (hasToken) {
  //   if (to.path === '/user') {
  //     // if is logged in, redirect to the home page
  //     next({ name: 'Home' })
  //     NProgress.done()
  //   } else {
  //     next()
  //   }
  // } else {
  //   /* 没有token的话 */
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // 如果是前往登录页面的话 直接放行
  //     next()
  //   } else {
  //     // 如果不是前往登录页面的话 直接跳转到登录页面
  //     // next(`/user?redirect=${to.path}`)
  //     next(`/user`)
  //     NProgress.done()
  //   }
  // }
  next()
})

router.afterEach(() => {
  // 进度条结束
  NProgress.done()
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
