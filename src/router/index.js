import Vue from 'vue'
import Router from 'vue-router'
import appLogin from '@/page/appLogin'
import appHome from '@/page/appHome'
import wordMemory from '@/page/wordMemory'
import wordStudyTest from '@/page/wordStudyTest'
import wordStudyScore from '@/page/wordStudyScore'
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
import homeExtendTongue from '@/components/homeExtendTongue';
import homeExtendVoice from '@/components/homeExtendVoice';

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
        { // 学习中心
          path: '',
          component: homeContent
        },
        { // 我的信息
          path: 'myInfo',
          component: homePersonCenter
        },
        { // 单词本
          path: 'wordBook',
          component: homeWordBook
        },
        { // 记忆追踪
          path: 'homeMemoryTracer',
          component: homeMemoryTracer
        },
        { // 智能语音
          path: 'homeExtendVoice',
          component: homeExtendVoice
        },
        { // 智能口语
          path: 'homeExtendTongue',
          component: homeExtendTongue
        }
      ]
    },
    { // 单词记忆
      path: '/wordStudy',
      name: 'wordStudy',
      component: wordStudy
    },
    { // 单词记忆强化
      path: '/wordMemory',
      name: 'wordMemory',
      component: wordMemory
    },
    { // 智能记忆测试
      path: '/wordStudyTest',
      name: 'wordStudyTest',
      component: wordStudyTest
    },
    { // 智能记忆测试分数
      path: '/wordStudyScore',
      name: 'wordStudyScore',
      component: wordStudyScore
    },
    { // 单词听写
      path: '/wordListen',
      name: 'wordListen',
      component: wordListen
    },
    { // 单词默写
      path: '/wordWrite',
      name: 'wordWrite',
      component: wordWrite
    },
    { // 句子听力
      path: '/sentenceListen',
      name: 'sentenceListen',
      component: sentenceListen
    },
    { // 句子听写
      path: '/sentenceTranslate',
      name: 'sentenceTranslate',
      component: sentenceTranslate
    },
    { // 句子默写
      path: '/sentenceWrite',
      name: 'sentenceWrite',
      component: sentenceWrite
    }

  ]
})
