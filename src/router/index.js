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
import intelligentVoicewordStudy from '@/page/intelligentVoicewordStudy'
import intelligentVoicewordListen from '@/page/intelligentVoicewordListen'
import intelligentVoicewordTest from '@/page/intelligentVoicewordTest'
import intelligentVoicewordTestScore from '@/page/intelligentVoicewordTestScore'
// 学习和测试中心页面
import centerWordStudy from '@/page/studyOrTestCenter/centerWordStudy'
import centerWordListen from '@/page/studyOrTestCenter/centerWordListen'
import centerWordWrite from '@/page/studyOrTestCenter/centerWordWrite'
import centerSentenceListen from '@/page/studyOrTestCenter/centerSentenceListen'
import centerSentenceTranslate from '@/page/studyOrTestCenter/centerSentenceTranslate'
import centerSentenceWrite from '@/page/studyOrTestCenter/centerSentenceWrite'
import centerWordStudyTest from '@/page/studyOrTestCenter/centerWordStudyTest'

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
    { // 智能语音 - 单词拼读 - 辩音
      path: '/intelligentVoicewordStudy',
      name: 'intelligentVoicewordStudy',
      meta: {
        name: '红杉树 - 智能语音 - 字母拼读 - 听写'
      },
      component: intelligentVoicewordStudy
    },
    { // 智能语音 - 单词拼读 - 听写
      path: '/intelligentVoicewordListen',
      name: 'intelligentVoicewordListen',
      meta: {
        name: '红杉树 - 智能语音 - 字母拼读 - 辩音'
      },
      component: intelligentVoicewordListen
    },
    { // 智能语音 - 单词拼读 - 闯关
      path: '/intelligentVoicewordTest',
      name: 'intelligentVoicewordTest',
      meta: {
        name: '红杉树 - 智能语音 - 字母拼读 - 闯关'
      },
      component: intelligentVoicewordTest
    },
    { // 智能语音 - 单词拼读 - 成绩
      path: '/intelligentVoicewordTestScore',
      name: 'intelligentVoicewordTestScore',
      meta: {
        name: '红杉树 - 智能语音 - 字母拼读 - 成绩'
      },
      component: intelligentVoicewordTestScore
    },
    { // 智能复习 - 智能记忆
      path: '/studyOrTestCenter/centerWordStudy',
      name: 'centerWordStudy',
      meta: {
        name: '智能复习 - 智能记忆'
      },
      component: centerWordStudy
    },
    { // 智能复习 - 智能听写
      path: '/studyOrTestCenter/centerWordListen',
      name: 'centerWordListen',
      meta: {
        name: '智能复习 - 智能听写'
      },
      component: centerWordListen
    },
    { // 智能复习 - 智能默写
      path: '/studyOrTestCenter/centerWordWrite',
      name: 'centerWordWrite',
      meta: {
        name: '智能复习 - 智能默写'
      },
      component: centerWordWrite
    },
    { // 智能复习 - 句子听力
      path: '/studyOrTestCenter/centerSentenceListen',
      name: 'centerSentenceListen',
      meta: {
        name: '智能复习 - 句子听力'
      },
      component: centerSentenceListen
    },
    { // 智能复习 - 句子听写
      path: '/studyOrTestCenter/centerSentenceTranslate',
      name: 'centerSentenceTranslate',
      meta: {
        name: '智能复习 - 句子听写'
      },
      component: centerSentenceTranslate
    },
    { // 智能复习 - 句子默写
      path: '/studyOrTestCenter/centerSentenceWrite',
      name: 'centerSentenceWrite',
      meta: {
        name: '智能复习 - 句子默写'
      },
      component: centerSentenceWrite
    },
    { // 智能复习 - 智能记忆测试
      path: '/studyOrTestCenter/centerWordStudyTest',
      name: 'centerWordStudyTest',
      meta: {
        name: '智能复习 - 智能记忆 - 测试复习'
      },
      component: centerWordStudyTest
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
