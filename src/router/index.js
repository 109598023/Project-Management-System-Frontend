import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Contributors from '@/components/Contributors'
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
      path: '/Signup',
      name: 'Signup',
      component: Signup,
      meta: { requiresAuth: false }
    },
    {
      path: '/contributors',
      name: 'Contributors',
      component: Contributors,
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

rotuer.beforeEach((to, from, next) => {
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
