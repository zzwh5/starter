import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import layout from '../components/layout.vue'

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
        meta: { title: '测试1' }
      }
    ]
  },
  {
    path: '/tests',
    name: 'Tests',
    component: () => import('../views/tests/tests.vue'),
    meta: { title: '测试s' }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
