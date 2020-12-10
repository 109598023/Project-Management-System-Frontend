import axios from 'axios'
import router from '../router'
import store from '../store'
import { tip, toLogin, to403Page } from './utils'

const errorHandle = (status, msg) => {
  switch (status) {
    case 400:
      tip(msg)
      break
    case 401:
      if (router.currentRoute.name === 'Login') {
      } else {
        store.dispatch('setAuth', {
          'accessToken': '',
          'refreshToken': '',
          'isLogin': ''
        })
        toLogin()
      }
      break
    case 403:
      to403Page()
      break
    case 404:
      tip(msg)
      break
    default:
      console.log('resp沒有攔截到的錯誤: ' + msg)
  }
}

var instance = axios.create({
  baseURL: 'http://localhost:8005/api'
})

instance.interceptors.request.use((config) => {
  const token = store.state.auth.token
  token && (config.headers.Authorization = 'Bearer ' + token)
  return config
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
  return response
}, (error) => {
  const { response } = error

  if (response) {
    errorHandle(response.status, response.data.error)
    return Promise.reject(error)
  } else {
    if (!window.navigator.onLine) {
      tip('網路出了點問題，請小夥伴重新連線後刷新網頁')
    } else {
      return Promise.reject(error)
    }
  }
})

export default function (method, url, data = null, em) {
  method = method.toLowerCase()
  if (method === 'post') {
    return instance.post(url, data).catch((e) => {
      console.log(e.message)
    })
  } else if (method === 'get') {
    return instance.get(url, {params: data})
  } else if (method === 'delete') {
    return instance.delete(url, {params: data})
  } else if (method === 'put') {
    return instance.put(url, data)
  } else {
    console.log('未知的method' + method)
    return false
  }
}
