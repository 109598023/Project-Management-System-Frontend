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
      name: 'Project',
      alias: ['/project'],
      component: () => import('@/components/project-view/Project'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/Login'),
      meta: { requiresAuth: false }
    },
    {
      path: '/signup',
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
        path: '/project/:id/members',
        name: 'Members',
        component: () => import('@/components/project-view/Members')
      }, {
        path: '/project/:id/github/:rid/contributors_total',
        name: 'ContributorsTotal',
        component: () => import('@/components/project-view/github/ContributorsTotal')
      }, {
        path: '/project/:id/github/:rid/contributors',
        name: 'Contributors',
        component: () => import('@/components/project-view/github/Contributors')
      }, {
        path: '/project/:id/github/:rid/punch_card',
        name: 'PunchCard',
        component: () => import('@/components/project-view/github/PunchCard')
      }, {
        path: '/project/:id/github/:rid/Issue',
        name: 'Issue',
        component: () => import('@/components/project-view/github/Issue')
      }, {
        path: '/project/:id/sonarqube/:rid/measures',
        name: 'Measures',
        component: () => import('@/components/project-view/sonarqube/Measures'),
        meta: { requiresAuth: true }
      }]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

rotuer.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => { return record.meta.requiresAuth })

  if (requiresAuth) {
    api.auth.refresh({
      'refreshToken': store.state.auth.refreshToken
    }).then((response) => {
      store.dispatch('setAuth', {
        'accessToken': response.data.accessToken,
        'refreshToken': response.data.refreshToken,
        'isLogin': true,
        'username': store.state.auth.username
      })
      if (to.matched.some(record => { return record.meta.requiresCheckPermission })) {
        api.view.queryProject({
          'id': to.params.id,
          'username': store.state.auth.username
        }).then(() => {
          next()
        }).catch((error) => {
          console.log(error)
          next('/project')
        })
      } else {
        next()
      }
    })
  } else {
    if (store.state.auth.isLogin) {
      next('/')
    }
    next()
  }
})

export default rotuer
