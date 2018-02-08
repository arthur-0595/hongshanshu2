<template>
  <div class="wordStudy" id="wordStudy">
    <!--最顶部信息-->
    <div class="topInfo">
      <!--<span>今日有效：00:20:40</span>-->
      <!--<span>今日在线：00:34:40</span>-->
      <!--<span>学习效率：13%</span>-->
    </div>

    <!--中间-->
    <div class="centerBox" v-loading="loading">
      <!--学习的单元名字-->
      <div class="nameBox">
        <div class="deviceName">智能记忆-词义记忆1</div>
        <div class="version">{{thisVersionName}}</div>
        <div class="rightBtn clearfix">
          <!--<span class="help"></span>-->
          <!--<span class="skin"></span>-->
          <span class="close" @click="fnclosePage()"></span>
        </div>
      </div>
      <!--要学习的主要内容-->
      <div class="mainCon">
        <!--单词区域-->
        <div class="wordName clearfix">
          <ul class="difficultNum" title="难度系数2">
            <li></li>
            <li></li>
            <li class="orange"></li>
            <li class="orange"></li>
            <li class="orange"></li>
          </ul>
          <span class="word">T-shirt</span>
          <span class="soundmark">[ti:ʃə:t]</span>
          <span class="laba" id="laba" @click="fnReadWord(0)"></span>
        </div>
        <!--记忆强度-->
        <div class="totalBar" title="记忆强度 20%">
          <span class="curBar"></span>
        </div>
        <!--底部词义-->
        <div class="wordBot clearfix">
          <!--词义解释-->
          <div class="meanBox" id="meanBox" style="display: none;">
            <div class="wordMean">T恤衫</div>
            <div class="explainBox">
              <div class="enSentence" @click="fnReadWord(1)">A T-shirt, please.</div>
              <div class="chSentence">请（给我）拿一件体恤衫。</div>
            </div>
          </div>
          <!--右边表情框-->
          <div class="faceBox">
            <ul class="beginFace" id="ifKnow" style="display: block">
              <li class="know" @click="fnKnow()"></li>
              <li class="noknow" @click="fnNotknow()"></li>
            </ul>
            <ul class="beginFace" id="ifRight" style="display: none">
              <li class="right" @click="fnRight()"></li>
              <li class="wrong" @click="fnWrong()"></li>
            </ul>
            <div class="num0 num1 num2" id="num" @click="fnReadAgain()" style="display: none"></div>
          </div>
        </div>
      </div>
      <!--底部内容-->
      <div class="botInfo">
        <span id="countdown">倒计时： 5</span>
        <!--<span>引擎档位： 6</span>-->
        <span>学习时长： 00:00:30</span>
        <span>本次学习[生词： 0个　熟词：2个　复习：0个 ]</span>
        <span>学习进度：8/12</span>
      </div>
      <audio src="" id="audio" autoplay="autoplay"></audio>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'word-study',
    components: {},
    data() {
      return {
        loading: false,
        userMsg: {},
        unitId: 1,
      }
    },
    methods: {
      fnclosePage() {
        this.$router.go(-1);
      },
      // 获取第一个单词
      fnGetNewWord() {
        this.loading = true;
        this.$ajax({
          method: 'GET',
          url: this.$url.url1,
          params: {
            method: 'memory',
            user_id: this.userMsg.ID,
            unit_id: this.unitId
          }
        }).then(res => {
          this.loading = false;
          let data = res.data;
          switch (data.result) {
            case 0:
              // 单词获取失败，请检查您的网络或联系管理员
              console.log('单词获取失败，请检查您的网络或联系管理员');
              this.$alert('提示', '单词获取失败，请检查您的网络或联系管理员', {
                confirmButtonText: '确定',
                callback: () => {
                  this.$router.push('/home');
                }
              });
              break;
            case 1:
              // 请求成功
              console.log('请求成功');

              break;
            case 2:
              // 单词记忆结束，下面开始单词强化
              this.$alert('下面是加深记忆时间哦，加油！', '单词记忆结束，下面开始单词强化！', {
                confirmButtonText: '确定',
                callback: () => {
                  this.$router.push('/wordMemory');
                }
              });
              break;
            case 3:
              // 学习完毕，下面开始测试
              this.$alert('到了检验学习成果的时候啦', '学习完毕，下面开始测试！', {
                confirmButtonText: '确定',
                callback: () => {
                  this.$router.push({ path:'/wordStudyTest', query:{ countTestType:0 }});
                }
              });
              break;
            case 4:
              // 先来学前测试一下吧！
              this.$alert('先了解一下自己的真实水平吧', '先来学前测试一下吧！', {
                confirmButtonText: '确定',
                callback: () => {
                  this.$router.push({ path:'/wordStudyTest', query:{ testType:0 }});
                }
              });
              break;
          }
        })
      },
      // 获取下一个单词
      fnGetNextWord() {

      },
      fnReadWord() {

      },
      fnKnow() {

      },
      fnNotknow() {

      },
      fnRight() {

      },
      fnWrong() {

      },
      fnReadAgain() {

      }
    },
    computed: {
      // 拼接左上角学习的教材标题
      thisVersionName() {
        let versionBoxName = sessionStorage.version_name;
        let textbookName = sessionStorage.textbook_name;
        let unitBoxName = sessionStorage.unit_name;
        let leftTitle = versionBoxName + ' - ' + textbookName + ' - ' + unitBoxName;
        return leftTitle;
      }
    },
    mounted() {
      this.fnGetNewWord();
    },
    created() {
      this.userMsg = JSON.parse(sessionStorage.userMsg);
      this.unitId = sessionStorage.unit_id;
    }
  }
</script>

<style scoped>
  .wordStudy {
    width: 100%;
    height: 100%;
    background: url(../../static/img/study/space-bg.jpg) no-repeat 0 0;
    position: relative;
  }

  .topInfo {
    width: 100%;
    line-height: 40px;
    color: #333;
    font-size: 14px;
    text-align: center;
  }

  .centerBox {
    width: 870px;
    height: 540px;
    background: url(../../static/img/study/space-bg-small.png) no-repeat 0 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
  }

  .nameBox {
    width: 94%;
    height: 50px;
    line-height: 50px;
    position: relative;
    border-bottom: 1px solid #ccc;
    margin: 12px auto 0;
  }

  .nameBox .deviceName {
    font-size: 16px;
    text-align: center;
    color: #666;
  }

  .version {
    color: #aaa;
    font-size: 12px;
    position: absolute;
    top: 0;
    left: 2px;
  }

  .rightBtn {
    position: absolute;
    height: 50px;
    top: 0;
    right: 2px;
  }

  .rightBtn > span {
    float: left;
    width: 32px;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    cursor: pointer;
  }

  .rightBtn > span.help {
    background-image: url(../../static/img/study/help-light.png);
  }

  .rightBtn > span.skin {
    background-image: url(../../static/img/study/skin-light.png);
  }

  .rightBtn > span.close {
    background-image: url(../../static/img/study/close-light.png);
  }

  .rightBtn > span.help:hover {
    background-image: url(../../static/img/study/help-light-hover.png);
  }

  .rightBtn > span.skin:hover {
    background-image: url(../../static/img/study/skin-light-hover.png);
  }

  .rightBtn > span.close:hover {
    background-image: url(../../static/img/study/close-light-hover.png);
  }

  /*学习主要内容*/
  .mainCon {
    margin: 80px 60px 0 60px;
    height: 380px;
  }

  .mainCon .wordName {
    height: 60px;
  }

  .mainCon .wordName .difficultNum {
    float: left;
  }

  .mainCon .wordName .difficultNum > li {
    width: 12px;
    height: 7px;
    background: #a8a58d;
    margin-top: 3px;
  }

  .mainCon .wordName .difficultNum > li.orange {
    background: #cc6441 !important;
  }

  .mainCon .wordName .word {
    float: left;
    font-size: 35px;
    color: #333;
    line-height: 72px;
    font-family: "Arial";
    margin: 0 10px;
  }

  .mainCon .wordName .soundmark {
    float: left;
    font-size: 16px;
    color: #959694;
    line-height: 76px;
  }

  .mainCon .wordName .laba {
    float: right;
    width: 60px;
    height: 60px;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url(../../static/img/study/deep-laba1.png);
    cursor: pointer;
  }

  .mainCon .wordName .laba:hover {
    opacity: .8;
  }

  .mainCon .wordName .laba.laba1 {
    background-image: url(../../static/img/study/deep-laba2.png);
  }

  /*记忆强度*/
  .totalBar {
    width: 100%;
    height: 6px;
    background-color: #ccc;
    margin: 22px 0;
    position: relative;
  }

  .totalBar .curBar {
    position: absolute;
    top: 0;
    left: 0;
    width: 10%;
    height: 6px;
    background: #0a724a;
  }

  /*底部解释*/
  .wordBot {
    width: 100%;
  }

  /*词义*/
  .meanBox {
    float: left;
    width: 650px;
  }

  .meanBox .wordMean {
    width: 100%;
    height: 80px;
    line-height: 40px;
    font-size: 24px;
    color: #666;
  }

  .meanBox .explainBox {
    width: 100%;
    line-height: 28px;
    color: #777;
    font-size: 18px;
  }

  .meanBox .explainBox .enSentence,
  .meanBox .explainBox .chSentence {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .meanBox .explainBox .enSentence:hover {
    color: #000;
    cursor: pointer;
  }

  /*表情框*/
  .faceBox {
    float: right;
    width: 67px;
    height: 180px;
  }

  .faceBox .beginFace {
    width: 100%;
    height: 100%;
  }

  .faceBox .beginFace > li,
  .faceBox > div {
    width: 100%;
    height: 50%;
    background-repeat: no-repeat;
    background-position: center center;
    cursor: pointer;
    opacity: 1;
  }

  .faceBox .beginFace > li:hover,
  .faceBox > div:hover {
    opacity: .8;
  }

  .faceBox .beginFace > li.know {
    background-image: url(../../static/img/study/smile.png);
  }

  .faceBox .beginFace > li.noknow {
    background-image: url(../../static/img/study/cry.png);
  }

  .faceBox .beginFace > li.right {
    background-image: url(../../static/img/study/correct.png);
  }

  .faceBox .beginFace > li.wrong {
    background-image: url(../../static/img/study/wrong.png);
  }

  .faceBox > .num0 {
    background-image: url(../../static/img/study/forward.png);
  }

  .faceBox > .num0.num1 {
    background-image: url(../../static/img/study/digital01.png);
  }

  .faceBox > .num0.num1.num2 {
    background-image: url(../../static/img/study/digital02.png);
  }

  /*底部信息*/
  .botInfo {
    color: #666;
    font-size: 14px;
    display: flex;
    justify-content: space-around;
    flex-wrap: nowrap;
  }
</style>
