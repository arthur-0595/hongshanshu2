import Vue from 'vue'
import Router from 'vue-router'
import appLogin from '@/page/appLogin'
import appHome from '@/page/appHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: appLogin
    },{
      path: '/home',
      name: 'home',
      component: appHome
    }
  ]
})
