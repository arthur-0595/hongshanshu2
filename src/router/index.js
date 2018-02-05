import Vue from 'vue'
import Router from 'vue-router'
import appLogin from '@/page/appLogin'
import appHome from '@/page/appHome'
import wordStudy from '@/page/wordStudy'
import wordListen from '@/page/wordListen'
import wordWrite from '@/page/wordWrite'
import sentenceListen from '@/page/sentenceListen'
import sentenceTranslate from '@/page/sentenceTranslate'
import sentenceWrite from '@/page/sentenceWrite'

import homeContent from '@/components/homeContent'
import homePersonCenter from '@/components/homePersonCenter';
import homeWordBook from '@/components/homeWordBook';
import homeMemoryTracer from '@/components/homeMemoryTracer';

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
        },
        {
          path: 'wordBook',
          component: homeWordBook
        },
        {
          path: 'homeMemoryTracer',
          component: homeMemoryTracer
        }
      ]
    },
    {
      path: '/wordStudy',
      name: 'wordStudy',
      component: wordStudy
    },
    {
      path: '/wordListen',
      name: 'wordListen',
      component: wordListen
    },
    {
      path: '/wordWrite',
      name: 'wordWrite',
      component: wordWrite
    },
    {
      path: '/sentenceListen',
      name: 'sentenceListen',
      component: sentenceListen
    },
    {
      path: '/sentenceTranslate',
      name: 'sentenceTranslate',
      component: sentenceTranslate
    },
    {
      path: '/sentenceWrite',
      name: 'sentenceWrite',
      component: sentenceWrite
    }

  ]
})
