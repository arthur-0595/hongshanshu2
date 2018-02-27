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
        <div class="deviceName">智能记忆-词义记忆</div>
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
          <ul class="difficultNum" :title="'难度系数'+degreeOfDifficulty">
            <li :class="{orange:degreeOfDifficulty>=5}"></li>
            <li :class="{orange:degreeOfDifficulty>=4}"></li>
            <li :class="{orange:degreeOfDifficulty>=3}"></li>
            <li :class="{orange:degreeOfDifficulty>=2}"></li>
            <li :class="{orange:degreeOfDifficulty>=1}"></li>
          </ul>
          <span class="word">{{thisWord.word_name.replace(/\•/g, '')}}</span>
          <span class="soundmark">{{thisWord.phonogram}}</span>
          <span class="laba" id="laba" @click="fnAudioPalyer(thisWord.word_url)"></span>
        </div>
        <!--记忆强度-->
        <div class="totalBar" :title="'记忆强度 '+ thisWord.memory_percent +'%'">
          <span class="curBar" :style="{width: thisWord.memory_percent + '%'}"></span>
        </div>
        <!--底部词义-->
        <div class="wordBot clearfix">
          <!--词义解释-->
          <div class="meanBox" id="meanBox" v-show="thisWordShow">
            <div class="wordMean">{{thisWord.word_mean}}</div>
            <div class="explainBox">
              <div class="enSentence" >{{thisWord.sentence}}</div>
              <div class="chSentence" >{{thisWord.sentence_mean}}</div>
            </div>
          </div>
          <!--右边表情框-->
          <div class="faceBox">
            <ul class="beginFace" id="ifKnow" v-show="isKnow">
              <li class="know" @click="fnKnow(1)"></li>
              <li class="noknow" @click="fnKnow(0)"></li>
            </ul>
            <ul class="beginFace" id="ifRight" v-show="isYes">
              <li class="right" @click="fnRight(1)"></li>
              <li class="wrong" @click="fnRight(0)"></li>
            </ul>
            <div :class="{num0:nextAgain===0, num1:nextAgain===1, num2:nextAgain===2}"
                 id = "num"
                 @click = "fnReadAgain()"
                 v-show = "isReadAgain"></div>
          </div>
        </div>
      </div>
      <!--底部内容-->
      <div class="botInfo">
        <span id="countdown" v-show="showTimer">倒计时： {{setTimeNum}}</span>
        <!--<span>引擎档位： 6</span>-->
        <span>学习时长： {{studyTime}}</span>
        <span>本次学习[生词：{{newWordNum}}个　熟词：{{oldWordNum}}个　复习：{{reviewWordNum}}个 ]</span>
        <!--<span>学习进度：8/12</span>-->
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
        userMsg: {},  // 用户信息
        unitId: 1,  // 单元ID
        thisWord: {
          'id': 162,
          'user_id': 1,
          'unit_id': 1,
          'word_name': 'at',
          'word_mean': 'prep.在',
          'phonogram': '[æt]',
          'word_url': '\UploadeFile\Video\at.wav',
          'sentence': 'Get off at the last stop.',
          'sentence_mean': '在最后一站下车。',
          'memory_state': 0,
          'neworold_word': null,
          'memory_percent': 0,
          'random': '2b6fc665-1bcc-4b50-b40a-3380b643a183'
        },  // 存储当前单词的所有信息
        thisNewOrOld: 0, // 该单词是不是听过 0：默认没听过   大于0：听过
        wordState: 1, // 生词还是熟词 1：默认熟词  大于1：生词
        showTimer: false, // 是否显示倒计时
        setTimeNum: 5,
        thisWordShow: false, // 显示或隐藏句子及翻译
        isKnow: true,
        isYes: false,
        isReadAgain: false,
        nextAgain: 2,
        timer: {},
        newWordNum: 0, // 生词数量
        oldWordNum: 0, // 熟词数量
        reviewWordNum: 0, // 复习数量
        studyTime: '00:00:00' // 学习时间
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
          this.fnSaveCourse();
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
              // 请求成功1
              console.log('请求成功: ' + JSON.stringify(data));
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
                  this.$router.push({path: '/wordStudyTest', query: {countTestType: 0}});
                }
              });
              break;
            case 4:
              // 先来学前测试一下吧
              this.$alert('先了解一下自己的真实水平吧', '先来学前测试一下吧！', {
                confirmButtonText: '确定',
                callback: () => {
                  this.$router.push({path: '/wordStudyTest', query: {testType: 0}});
                }
              });
              break;
            default:
              this.fnsetTimeOut();
              // console.log(JSON.stringify(data));
              this.thisWord = data.result[0];
              // 是不是一个新词
              if (this.thisWord.memory_percent > 0) {
                this.thisNewOrOld = 1;
              } else {
                this.thisNewOrOld = 0;
              }
              this.fnAudioPalyer(this.thisWord.word_url);
              break;
          }
        })
      },
      // 设置生词、熟词、复习词
      fnSetWordState() {
        if (this.thisNewOrOld === 0 && this.wordState === 1) { // 熟词
          this.oldWordNum ++;
        } else if (this.thisNewOrOld === 0 && this.wordState > 1) { // 生词
          this.newWordNum ++;
        } else if (this.thisNewOrOld === 1) { // 复习词
          this.reviewWordNum ++;
        }
      },
      // 获取下一个单词
      fnGetNextWord(thisstate_) {
        this.fnSetWordState();
        this.loading = true;
        this.$ajax({
          method: 'GET',
          url: this.$url.url1,
          params: {
            method: 'getnext',
            id: this.thisWord.id,
            neworold_word: thisstate_,
            user_id: this.userMsg.ID,
            unit_id: this.unitId
          }
        }).then(res => {
          this.fnSaveCourse();
          this.loading = false;
          // 重置到新词状态
          this.fnreset();
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
              // 请求成功1
              console.log('请求成功: ' + JSON.stringify(data));
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
                  this.$router.push({path: '/wordStudyTest', query: {countTestType: 0}});
                }
              });
              break;
            case 4:
              // 先来学前测试一下吧
              this.$alert('先了解一下自己的真实水平吧', '先来学前测试一下吧！', {
                confirmButtonText: '确定',
                callback: () => {
                  this.$router.push({path: '/wordStudyTest', query: {testType: 0}});
                }
              });
              break;
            default:
              this.fnsetTimeOut();
              // console.log(JSON.stringify(data));
              this.thisWord = data.result[0];
              // 是不是一个新词
              if (this.thisWord.memory_percent > 0) {
                this.thisNewOrOld = 1;
              } else {
                this.thisNewOrOld = 0;
              }
              this.fnAudioPalyer(this.thisWord.word_url);
              break;
          }
        })
      },
      // 重置到新词状态
      fnreset() {
        this.isKnow = true;
        this.isYes = false;
        this.isReadAgain = false;
        this.thisWordShow = false;
        this.nextAgain = 2;
      },
      // 播放器播放
      fnAudioPalyer(url_) {
        let audio = document.querySelector('#audio');
        audio.src = this.$url.url2 + url_;
      },
      // 认识还是不认识
      fnKnow(type_) {
        this.showTimer = false;
        this.setTimeNum = 5;
        if (type_ === 1) { // 认识
          clearInterval(this.timer);
          this.fnAudioPalyer(this.thisWord.word_url);
          this.isKnow = false;
          this.isYes = true;
          this.thisWordShow = true;
        } else { // 不认识
          clearInterval(this.timer);
          this.isKnow = false;
          this.isReadAgain = true;
          this.thisWordShow = true;
          this.nextAgain = 2;
          // 该词作为生词，状态+1
          this.wordState++;
        }
      },
      // 对的还是错的
      fnRight(type_) {
        if (type_ === 1) { // 对的
          this.isYes = false;
          this.fnGetNextWord(1);
        } else { // 错的
          this.isYes = false;
          this.isReadAgain = true;
          // 该词作为生词，状态+1
          this.wordState++;
        }
      },
      // 再读两次
      fnReadAgain() {
        if (this.nextAgain === 2) {
          this.fnAudioPalyer(this.thisWord.word_url);
          this.nextAgain--;
        } else if (this.nextAgain === 1) {
          this.fnAudioPalyer(this.thisWord.word_url);
          this.nextAgain--;
        } else if (this.nextAgain === 0) {
          this.fnGetNextWord(2);
        }
      },
      // 倒计时五秒，倒计时结束后自动选择
      fnsetTimeOut() {
        this.showTimer = true;
        this.timer = setInterval( () => {
          this.setTimeNum--;
          if(this.setTimeNum <= 0) {
            clearInterval(this.timer);
            this.fnKnow(0);
          }
        }, 1000)
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
      // 保存学习记录
      fnSaveCourse() {
        this.$ajax({
          method: 'GET',
          url: this.$url.url0,
          params: {
            method: 'SaveStudy',
            user_id: this.userMsg.ID,
            version_id: sessionStorage.version_id,
            textbook_id: sessionStorage.textbook_id,
          }
        }).then(res => {
          let data = res.data;
          // console.log(data);
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
      // 困难度
      degreeOfDifficulty() {
        let difficulty = 0;
        let length = this.thisWord.word_name.length;
        if (length <= 3) {
          difficulty = 1;
        } else if (length > 3 && length <= 7) {
          difficulty = 2;
        } else if (length > 7 && length <= 11) {
          difficulty = 3;
        } else if (length > 11 && length <= 15) {
          difficulty = 4;
        } else if (length > 15) {
          difficulty = 5;
        }
        return difficulty;
      }
    },
    mounted() {
      this.fnStudyTime();
      this.fnGetNewWord();
      this.fnreset();
    },
    created() {
      this.userMsg = JSON.parse(sessionStorage.userMsg);
      this.unitId = sessionStorage.unit_id;
      // 监听ctrl点击事件，播放单词音频
      document.onkeydown = (event) => {
        if (event.keyCode === 17) { // ctrl
          this.fnAudioPalyer(this.thisWord.word_url);
        }
      }
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

  .faceBox > .num1 {
    background-image: url(../../static/img/study/digital01.png);
  }

  .faceBox > .num2 {
    background-image: url(../../static/img/study/digital02.png);
  }

  /*底部信息*/
  .botInfo {
    color: #666;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
  }
</style>
