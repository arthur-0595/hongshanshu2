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
import scorePage from '@/page/scorePage'
import intelligentVoiceLetterStudy from '@/page/intelligentVoiceLetterStudy'
import intelligentVoiceLetterTest from '@/page/intelligentVoiceLetterTest'
import intelligentVoiceLetterTestScore from '@/page/intelligentVoiceLetterTestScore'

import homeContent from '@/components/homeContent'
import homePersonCenter from '@/components/homePersonCenter';
import homeWordBook from '@/components/homeWordBook';
import homeMemoryTracer from '@/components/homeMemoryTracer';
import homeExtendTongue from '@/components/homeExtendTongue';
import homeExtendVoice from '@/components/homeExtendVoice';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      meta: {
        name: '红杉树'
      },
      component: appLogin
    },
    {
      path: '/home',
      component: appHome,
      children: [
        { // 学习中心
          path: '',
          meta: {
            name: '红杉树 - 学习中心'
          },
          component: homeContent
        },
        { // 我的信息
          path: 'myInfo',
          meta: {
            name: '红杉树 - 个人中心'
          },
          component: homePersonCenter
        },
        { // 单词本
          path: 'wordBook',
          meta: {
            name: '红杉树 - 单词本'
          },
          component: homeWordBook
        },
        { // 记忆追踪
          path: 'homeMemoryTracer',
          meta: {
            name: '红杉树 - 记忆追踪'
          },
          component: homeMemoryTracer
        },
        { // 智能语音
          path: 'homeExtendVoice',
          meta: {
            name: '红杉树 - 智能语音'
          },
          component: homeExtendVoice
        },
        { // 智能口语
          path: 'homeExtendTongue',
          meta: {
            name: '红杉树 - 智能口语'
          },
          component: homeExtendTongue
        }
      ]
    },
    { // 单词记忆
      path: '/wordStudy',
      name: 'wordStudy',
      meta: {
        name: '红杉树 - 单词记忆'
      },
      component: wordStudy
    },
    { // 单词记忆强化
      path: '/wordMemory',
      name: 'wordMemory',
      meta: {
        name: '红杉树 - 单词强化'
      },
      component: wordMemory
    },
    { // 智能记忆测试
      path: '/wordStudyTest',
      name: 'wordStudyTest',
      meta: {
        name: '红杉树 - 单词记忆测试'
      },
      component: wordStudyTest
    },
    { // 智能记忆测试分数
      path: '/wordStudyScore',
      name: 'wordStudyScore',
      meta: {
        name: '红杉树 - 单词记忆测试分数'
      },
      component: wordStudyScore
    },
    { // 单词听写
      path: '/wordListen',
      name: 'wordListen',
      meta: {
        name: '红杉树 - 单词听写'
      },
      component: wordListen
    },
    { // 单词默写
      path: '/wordWrite',
      name: 'wordWrite',
      meta: {
        name: '红杉树 - 单词默写'
      },
      component: wordWrite
    },
    { // 句子听力
      path: '/sentenceListen',
      name: 'sentenceListen',
      meta: {
        name: '红杉树 - 句子听力'
      },
      component: sentenceListen
    },
    { // 句子听写
      path: '/sentenceTranslate',
      name: 'sentenceTranslate',
      meta: {
        name: '红杉树 - 句子听写'
      },
      component: sentenceTranslate
    },
    { // 句子默写
      path: '/sentenceWrite',
      name: 'sentenceWrite',
      meta: {
        name: '红杉树 - 句子默写'
      },
      component: sentenceWrite
    },
    { // 听写默写 - 测试结果页面
      path: '/scorePage',
      name: 'scorePage',
      meta: {
        name: '红杉树 - 测试结果'
      },
      component: scorePage
    },
    { // 智能语音 - 字母拼读学习页面
      path: '/intelligentVoiceLetterStudy',
      name: 'intelligentVoiceLetterStudy',
      meta: {
        name: '红杉树 - 智能语音 - 字母拼读学习'
      },
      component: intelligentVoiceLetterStudy
    },
    { // 智能语音 - 字母拼读测试页面
      path: '/intelligentVoiceLetterTest',
      name: 'intelligentVoiceLetterTest',
      meta: {
        name: '红杉树 - 智能语音 - 字母拼读测试'
      },
      component: intelligentVoiceLetterTest
    },
    { // 智能语音 - 字母拼读测试结果页面
      path: '/intelligentVoiceLetterTestScore',
      name: 'intelligentVoiceLetterTestScore',
      meta: {
        name: '红杉树 - 智能语音 - 字母拼读测试结果'
      },
      component: intelligentVoiceLetterTestScore
    }

  ]
});

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.name;
  next();
});
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

export default router
