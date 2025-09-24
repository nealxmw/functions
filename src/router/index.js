import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'  // 导入登录页

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '个人收藏' },
    beforeEnter: (to, from, next) => {
      const isLoggedIn = localStorage.getItem('loggedIn');
      if (!isLoggedIn) {
        next({ name: 'Login' });
      } else {
        next();
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登录' },
    beforeEnter: (to, from, next) => {
      const isLoggedIn = localStorage.getItem('loggedIn');
      // 如果已经登录，跳转到首页
      if (isLoggedIn) {
        next({ name: 'Home' });
      } else {
        next();
      }
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 路由导航守卫，改变网页 title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || ''
  next()
})

export default router
