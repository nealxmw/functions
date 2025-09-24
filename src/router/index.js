import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Setting from '../views/Setting.vue'

Vue.use(VueRouter)

const routes = [
  {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { title: '个人收藏' }
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: { title: '关于' }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Setting,
      meta: { title: '设置' }
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由导航守卫，改变网页 title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || ''
  next()
})

export default router
