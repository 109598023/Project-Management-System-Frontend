import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/Login'
import page1 from '@/pages/page1'
import store from '../store'
import api from '../apis'

Vue.use(Router)
const rotuer = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HelloWorld,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '/test/page1',
      name: 'page1',
      component: page1,
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

rotuer.beforeEach((to, from, next) => {
  console.log(api)
  if (to.matched.some(record => { return record.meta.requiresAuth })) {
    api.auth.refresh({
      'refreshToken': store.state.auth.refreshToken
    }).then((response) => {
      next()
    })
  } else {
    if (store.state.auth.isLogin) {
      next('/')
    }
    next()
  }
})

export default rotuer
