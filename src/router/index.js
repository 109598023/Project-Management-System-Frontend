import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/Login'
import to403 from '@/pages/403'
import page1 from '@/pages/page1'
import store from '../store'
import api from '../apis'

Vue.use(Router)
const rotuer = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '/403',
      name: '403',
      component: to403,
      meta: { requiresAuth: false }
    },
    {
      path: '/test/page1',
      name: 'page1',
      component: page1,
      meta: { requiresAuth: true }
    }
  ]
})

rotuer.beforeEach((to, from, next) => {
  console.log(api)
  api.auth.validateToken()
  if (to.matched.some(record => {
    return record.meta.requiresAuth
  })) {
    console.log(store.state.auth)
    if (!store.state.auth.isLogin || store.state.auth.token === '') {
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default rotuer
