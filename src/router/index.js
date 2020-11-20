import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import layout from '../components/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: layout,
    redirect: '/home',
    meta: { hasChildren: false, title: '首页' },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/user/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/test',
    name: 'Test',
    component: layout,
    redirect: '/test/test1',
    meta: { hasChildren: true, title: '测试' },
    children: [
      {
        path: '/test/test1',
        name: 'Test1',
        component: () => import('../views/test/test1.vue'),
        meta: { title: '测试1', hasChildren: false }
      }
    ]
  },
  {
    path: '/system',
    name: 'System',
    component: layout,
    redirect: '/system/SystemUser',
    meta: { hasChildren: true, title: '系统设置' },
    children: [
      {
        path: '/system/SystemUser',
        name: 'SystemUser',
        component: () => import('../views/system/SystemUser.vue'),
        meta: { title: '系统用户管理', hasChildren: false }
      },
      {
        path: '/system/SystemRole',
        name: 'SystemRole',
        component: () => import('../views/system/SystemRole.vue'),
        meta: { title: '系统角色管理', hasChildren: false }
      },
      {
        path: '/system/SystemLimit',
        name: 'SystemLimit',
        component: () => import('../views/system/SystemLimit.vue'),
        meta: { title: '系统权限管理', hasChildren: false }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
