import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import api from '../apis'

Vue.use(Router)
const rotuer = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/HelloWorld'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/Login'),
      meta: { requiresAuth: false }
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: () => import('@/components/Signup'),
      meta: { requiresAuth: false }
    },
    {
      path: '',
      name: 'ProjectView',
      component: () => import('@/components/project-view/ProjectViewMenu'),
      meta: { requiresAuth: true, requiresCheckPermission: true },
      children: [{
        path: '/:id/contributors_total',
        name: 'ContributorsTotal',
        component: () => import('@/components/project-view/ContributorsTotal')
      }, {
        path: '/:id/contributors',
        name: 'Contributors',
        component: () => import('@/components/project-view/Contributors')
      }, {
        path: '/:id/contributors_test',
        name: 'ContributorsTest',
        component: () => import('@/components/project-view/ContributorsTest')
      }]
    },
    {
      path: '/projects',
      name: 'Projects',
      component: () => import('@/components/project-view/Projects'),
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
    if (to.matched.some(record => { return record.meta.requiresCheckPermission })) {
    }
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
