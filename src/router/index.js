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
        path: '/project/:id/profile',
        name: 'Profile',
        component: () => import('@/components/project-view/Profile')
      }, {
        path: '/project/:id/edit_profile',
        name: 'EditProfile',
        component: () => import('@/components/project-view/EditProfile')
      }, {
        path: '/project/:id/contributors_total',
        name: 'ContributorsTotal',
        component: () => import('@/components/project-view/ContributorsTotal')
      }, {
        path: '/project/:id/contributors',
        name: 'Contributors',
        component: () => import('@/components/project-view/Contributors')
      }, {
        path: '/project/:id/contributors_test',
        name: 'ContributorsTest',
        component: () => import('@/components/project-view/ContributorsTest')
      }]
    },
    {
      path: '/project',
      name: 'Project',
      component: () => import('@/components/project-view/Project'),
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
      store.dispatch('setAuth', {
        'accessToken': response.data.accessToken,
        'refreshToken': response.data.refreshToken,
        'isLogin': true,
        'username': store.state.auth.username
      })
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
