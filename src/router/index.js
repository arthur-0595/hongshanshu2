import Vue from 'vue'
import Router from 'vue-router'
import appLogin from '@/page/appLogin'
import appHome from '@/page/appHome'
import wordStudy from '@/page/wordStudy'

import homeContent from '@/components/homeContent'
import homePersonCenter from '@/components/homePersonCenter';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: appLogin
    },
    {
      path: '/home',
      component: appHome,
      children: [
        {
          path: '',
          component: homeContent
        },
        {
          path: 'myInfo',
          component: homePersonCenter
        }
      ]
    },
    {
      path: '/wordStudy',
      name: 'wordStudy',
      component: wordStudy
    }

  ]
})
