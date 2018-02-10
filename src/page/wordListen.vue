<template>
  <div id="wordListen">
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
        <div class="deviceName">智能听写</div>
        <div class="version">{{thisVersionName}}</div>
        <div class="rightBtn clearfix">
          <!--<span class="help"></span>-->
          <!--<span class="skin"></span>-->
          <span class="close" @click="fnclosePage()"></span>
        </div>
      </div>
      <!--要学习的主要内容-->
      <div class="mainCon">
        <!--单词和音标-->
        <!--错误时显示单词状态-->
        <div class="wordBox" v-show="showWord">
          <span class="word">{{thisWord.word_name.replace(/\•/g, '')}}</span>
          <span class="soundmark">{{thisWord.phonogram}}</span>
        </div>
        <!--中间输入框-->
        <div class="inputBox"
             :class="{wrong:thisWordState === 2 , right:thisWordState === 1}">
          <div class="laba" id="laba" @click="fnAudioPalyer(thisWord.word_url)"></div>
          <input type="text" v-model="inputStr" autofocus id="thisInput"
                 v-focus="isfocus"
                 :disabled="isdisabled"
                 oncopy="return false;"
                 onpaste="return false;"
                 oncut="return false;"/>
          <div class="isRight"></div>
        </div>
        <!--记忆强度-->
        <div class="totalBar" title="记忆强度 20%">
          <div class="curBar"></div>
        </div>
        <!--中文词义-->
        <div class="mean">adj.黑色的</div>
      </div>
      <!--底部内容-->
      <div class="botInfo">
        <!--<span>引擎档位： 6</span>-->
        <span>学习时长： {{studyTime}}</span>
        <span>本次学习 [ 生词： 0个　熟词：2个　复习：0个 ]</span>
        <span>学习进度：{{thisWordIndex+1}}/{{wordList.length}}</span>
      </div>
      <audio src="" id="audio" autoplay="autoplay"></audio>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'word-listen',
    components: {},
    data() {
      return {
        loading: false,
        userMsg: {},
        unitId: 0,
        studyTime: '00:00:00', // 学习时间
        thisWord: {
          'id': 15,
          'word_name': 'ball',
          'word_mean': 'n.球',
          'word_url': '\\UploadeFile\\Video\\ball.wav',
          'phonogram': '[bɔ:l]'
        }, // 当前单词
        wordList: [],
        thisWordIndex: 0,
        thisWordState: 0,
        inputStr: '',
        isfocus: false,
        isdisabled: false,
        newWordNum: 0, // 生词数量
        oldWordNum: 0, // 熟词数量
        reviewWordNum: 0, // 复习数量
        showWord: false, // 是否显示单词释义
      }
    },
    methods: {
      fnclosePage() {
        this.$router.go(-1);
      },
      // 开始计时学习时间
      fnStudyTime() {
        let time = 0;
        setInterval( () => {
          time ++;
          let hour = parseInt(time / 3600) < 10 ? '0' + parseInt(time / 3600) : parseInt(time / 3600);
          let minute = parseInt(time % 3600 / 60) < 10 ? '0' + parseInt(time % 3600 / 60) : parseInt(time % 3600 / 60) ;
          let second = parseInt(time % 60) < 10 ? '0' + parseInt(time % 60) : parseInt(time % 60);
          this.studyTime = hour + ':' + minute + ':' + second;
        }, 1000)
      },
      // 播放器播放
      fnAudioPalyer(url_) {
        let audio = document.querySelector('#audio');
        audio.src = this.$url.url2 + url_;
      },
      // 获取听写单词
      fnGetWord() {
        this.loading = true;
        this.$ajax({
          method: 'GET',
          url: this.$url.url0,
          params: {
            method: 'GetDictation',
            user_id: this.userMsg.ID,
            unit_id: this.unitId,
          }
        }).then(res => {
          this.loading = false;
          let data = res.data;
          this.thisWord = data[0];
        })
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
      },
    },
    mounted() {
      this.fnStudyTime();
      this.fnGetWord();
    },
    created() {
      this.userMsg = JSON.parse(sessionStorage.userMsg);
      this.unitId = sessionStorage.unit_id;
      // 监听ctrl点击事件，播放单词音频
      document.onkeydown = (event) => {
        if (event.keyCode === 17) { // ctrl
          this.fnAudioPalyer(this.thisWord.word_url);
        } else if(event.keyCode === 13) { // enter
          this.fnVerify();
        }
      }
    },
    directives: {
      focus: {
        update: function (el, {value}) {
          if (value) {
            el.focus()
          }
        }
      }
    }
  }
</script>

<style scoped>
  #wordListen {
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
    margin: 80px 120px 0 120px;
    height: 380px;
  }

  .mainCon .wordBox {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-family: "Arial";
    padding: 0 10px;
    box-sizing: border-box;
  }

  .mainCon .wordBox .word {
    font-size: 32px;
    color: rgb(153, 153, 153);
  }

  .mainCon .wordBox .soundmark {
    font-size: 16px;
    color: #959694;
  }

  .mainCon .wordBox .rightWord {
    color: #333;
    font-size: 32px;
  }

  .mainCon .inputBox {
    position: relative;
    width: 100%;
    height: 60px;
  }

  .mainCon .inputBox input {
    border: none;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    background-color: #c8c5b4;
    width: 100%;
    height: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 32px;
    color: #333;
  }

  .mainCon .inputBox .laba {
    position: absolute;
    top: 0;
    left: -50px;
    width: 60px;
    height: 60px;
    background-repeat: no-repeat;
    background-position: center left;
    background-image: url(../../static/img/study/deep-laba1.png);
    cursor: pointer;
  }

  .mainCon .inputBox .laba:hover {
    opacity: .8;
  }

  .mainCon .inputBox .laba.laba1 {
    background-image: url(../../static/img/study/deep-laba2.png);
  }

  .mainCon .inputBox .isRight {
    position: absolute;
    top: 0;
    right: -60px;
    width: 60px;
    height: 60px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 40px 40px;
  }

  .mainCon .inputBox.right .isRight {
    background-image: url(../../static/img/study/spell_right.png);
  }

  .mainCon .inputBox.wrong .isRight {
    background-image: url(../../static/img/study/spell_wrong.png);
  }

  .mainCon .inputBox.wrong input {
    color: red;
  }

  .mainCon .mean {
    height: 120px;
    line-height: 40px;
    font-size: 24px;
    color: #666;
    overflow: hidden;
  }

  /*记忆强度*/
  .totalBar {
    width: 100%;
    height: 6px;
    background-color: #ccc;
    margin: 8px 0;
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

  /*底部信息*/
  .botInfo {
    width: 90%;
    margin: 0 auto;
    color: #666;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
  }
</style>
