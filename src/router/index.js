import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import Index from '../components/Index/index.vue'
import Login from '../components/User/login.vue'
import Register from '../components/user/register.vue'
import UserCenter from '../components/User/user.vue'
import Buy from '../components/Goods/goods.vue'
import Detail from '../components/Goods/detail.vue'
import Cart from '../components/Cart/cart.vue'
import NewsList from '../components/News/newsList.vue'
import NewsInfo from '../components/News/newsInfo.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    }, {
      path: '/usercenter',
      name: 'UserCenter',
      meta: {
        requireAuth: true
      },
      component: UserCenter
    }, {
      path: '/buy',
      name: 'Buy',
      component: Buy
    }, {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    }, {
      path: '/cart',
      name: 'Cart',
      meta: {
        requireAuth: true // 添加该属性，表示进入这个路由需要登录
      },
      component: Cart
    }, {
      path: '/ArtisticVision',
      name: 'NewsList',
      component: NewsList
    }, {
      path: '/newsinfo/:id',
      name: 'NewsInfo',
      component: NewsInfo
    }]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.getters.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})
export default router
