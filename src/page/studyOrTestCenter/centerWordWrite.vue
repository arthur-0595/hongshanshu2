<template>
  <div id="wordWrite">
    <div class="topInfo">
    </div>
    <!--中间-->
    <div class="centerBox" v-loading="loading">
      <!--学习的单元名字-->
      <div class="nameBox">
        <div class="deviceName">智能默写</div>
        <div class="version">{{tit}}</div>
        <div class="rightBtn clearfix">
          <!--<span class="help"></span>-->
          <!--<span class="skin"></span>-->
          <span class="close" @click="fnclosePage()"></span>
        </div>
      </div>
      <!--要学习的主要内容-->
      <div class="mainCon">
        <!--中文词义-->
        <div class="mean">{{thisWord.word_mean}}</div>
        <!--中间输入框-->
        <div class="inputBox" :class="{wrong:thisWordState === 2 , right:thisWordState === 1}">
          <div class="laba">对比</div>
          <input type="text" v-model="inputStr" autofocus id="thisInput"
                 v-focus="isfocus"
                 :disabled="isdisabled"
                 oncopy="return false;"
                 onpaste="return false;"
                 oncut="return false;"/>
          <div class="isRight"></div>
        </div>
        <!--记忆强度-->
        <div class="totalBar" v-show="isTest===1" :title="'记忆强度 '+ thisWord.dictation_percent +'%'">
          <div class="curBar" :style="{width: thisWord.dictation_percent + '%'}"></div>
        </div>
        <!--单词和音标-->
        <div class="wordBox">
          <div v-show="showWord">
            <span class="word">{{thisWord.word_name.replace(/\•/g, '')}}</span>
            <span class="soundmark">{{thisWord.phonogram}}</span>
          </div>
        </div>
      </div>
      <!--底部内容-->
      <div class="botInfo">
        <!--<span>引擎档位： 6</span>-->
        <span>学习时长： {{studyTime}}</span>
        <span v-if="isTest === 1">本次学习 [ 生词： {{newWordNum}}个　熟词：{{oldWordNum}}个　复习：{{reviewWordNum}}个 ]</span>
        <span v-else>学习进度：{{thisWordIndex+1}}/{{wordList.length}}</span>
      </div>
      <audio src="" id="audio" autoplay="autoplay"></audio>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'word-write',
    components: {},
    data() {
      return {
        loading: false,
        userMsg: {},
        typeId: 0,
        textbookTd: 0,
        studyTime: '00:00:00', // 学习时间
        thisWord: {
          'id': 15,
          'word_name': 'ball',
          'word_mean': '预设n.球',
          'word_url': '\\UploadeFile\\Video\\ball.wav',
          'phonogram': '[bɔ:l]'
        }, // 当前单词
        wordList: [],
        thisWordIndex: 0, // 当前单词的index
        thisWordState: 0, // 当前的状态，0 未判断  1 正确  2 错误
        theWordNewOrOld: 0, // 该单词是不是听过 0：默认没听过   大于0：听过
        theWordState: 1, // 生词还是熟词 1：默认熟词  大于1：生词
        inputStr: '', // input内输入的内容
        isfocus: true, // 是否自动获得焦点
        isdisabled: false, // 是否禁止input输入
        newWordNum: 0, // 生词数量
        oldWordNum: 0, // 熟词数量
        reviewWordNum: 0, // 复习数量
        showWord: false, // 是否显示单词释义
        isTest: 1, // 当前状态 0:学前测试  1:默认，学习  2:闯关测试
        countTest: 1, // 是否是直接进入测试， 1：未学习进入  2：学习过进入测试
        testArr: [], // 测试结果组成的数组
        score: 0, // 测试计算分数
        againEnter: 2, // 两次enter进入下一个单词，默认为2，点击-1
        tit: '记忆追踪 - 智能复习'
      }
    },
    methods: {
      fnclosePage() {
        this.$router.go(-1);
      },
      // 开始计时学习时间
      fnStudyTime() {
        let time = 0;
        setInterval(() => {
          time++;
          let hour = parseInt(time / 3600) < 10 ? '0' + parseInt(time / 3600) : parseInt(time / 3600);
          let minute = parseInt(time % 3600 / 60) < 10 ? '0' + parseInt(time % 3600 / 60) : parseInt(time % 3600 / 60);
          let second = parseInt(time % 60) < 10 ? '0' + parseInt(time % 60) : parseInt(time % 60);
          this.studyTime = hour + ':' + minute + ':' + second;
        }, 1000)
      },
      // 播放器播放
      fnAudioPalyer(url_) {
        let audio = document.querySelector('#audio');
        audio.src = this.$url.url2 + url_;
      },
      // 获取默写单词
      fnGetWord() {
        this.loading = true;
        this.$ajax({
          method: 'GET',
          url: this.$url.url1,
          params: {
            method: 'Review',
            user_id: this.userMsg.ID,
            textbookid: this.textbookTd,
            type: this.typeId
          }
        }).then(res => {
          this.loading = false;
          let data = res.data;
          console.log(data);
          if (data[0]) {
            this.thisWord = data[0];
            // 单词状态重置为默认，熟词
            this.theWordState = 1;
            // 根据当前单词的记忆强度值来判断该词是否是一个已经学过的单词
            if (this.thisWord.percent > 1) {
              this.theWordNewOrOld = 1;
            } else {
              this.theWordNewOrOld = 0;
            }
          } else {
            this.$alert('复习完毕咯，点击返回', '返回')
              .then(() => {
                this.$router.go(-1);
              })
          }
        })
      },
      // 获取所有测试单词
      fnGetDictationTest(beforeTest_) {
        this.$ajax({
          method: 'GET',
          url: this.$url.url1,
          params: {
            method: 'TestReview',
            user_id: this.userMsg.ID,
            textbookid: this.textbookTd,
            type: this.typeId
          }
        }).then(res => {
          let data = res.data;
          console.log(data);
          if (data[0]) {
            this.wordList = data;
            this.thisWord = data[0];
          } else {
            this.$alert('单词获取失败，请联系客服人员!', '点击返回学习中心', {
              confirmButtonText: '返回学习中心',
              callback: () => {
                this.$router.push('/home');
              }
            })
          }
        })
      },
      // 验证当前正确与否
      fnVerify() {
        // 先判断是不是测试
        if (this.isTest !== 1) {
          // 如果input框内字符长度为0，则给出提示但并不载入下一条
          if (this.inputStr.length < 1) {
            this.$message({
              message: '一点都不会吗？',
              type: 'warning'
            });
            return false;
          }
          let thisWordName = this.thisWord.word_name.replace(/\•/g, '');
          let thisStatus = 0; // 当前测试单词的状态
          if (this.inputStr === thisWordName) {
            thisStatus = 1;// 正确
          } else {
            thisStatus = 0;// 错误
          }
          let thisWordObj = {
            id: this.thisWord.id,
            this_name: this.thisWord.word_name.replace(/\•/g, ''),
            this_mean: this.thisWord.word_mean,
            this_url: this.thisWord.word_url,
            myVal: this.inputStr,
            status: thisStatus
          };
          this.testArr.push(thisWordObj);
          // 加载下一个测试单词
          this.fnOpenNextTestWord();
        } else { // 不是测试，当前状态为学习
          if (this.againEnter === 2) {
            this.againEnter--;
            let wordName = this.thisWord.word_name.replace(/\•/g, '');
            if (wordName === this.inputStr) { // 填写正确
              this.thisWordState = 1;
              this.isdisabled = true;
              this.showWord = true;
              this.againEnter--;
              this.fnAudioPalyer(this.thisWord.word_url);
            } else { // 填写错误
              this.thisWordState = 2;
              this.isdisabled = true;
              this.showWord = true;
              // 错误，单词状态设置为生词
              this.theWordState++;
            }
          } else if (this.againEnter === 1) {
            this.againEnter = 2;
            this.thisWordState = 0;
            this.isdisabled = false;
            this.isfocus = true;
            this.showWord = false;
            this.inputStr = '';
          } else if (this.againEnter === 0) {
            this.inputStr = '';
            this.thisWordState = 0;
            this.isdisabled = false;
            this.isfocus = true;
            this.againEnter = 2;
            this.showWord = false;
            this.fnUpdataWordState();
          }
        }
      },
      // 修改单词的学习状态
      fnUpdataWordState() {
        this.$ajax({
          method: 'GET',
          url: this.$url.url1,
          params: {
            method: 'Upper',
            id: this.thisWord.id,
            userid: this.userMsg.ID,
            word_state: this.theWordState,
            type: this.typeId
          }
        }).then(res => {
          let data = res.data;
          if (data == 1) {
            this.fnAllWordState();
            this.fnGetWord();
          } else {
            this.$alert('修改状态失败，将返回前一页', '点击返回' )
              .then(() => {
                this.$router.go(-1);
              })
          }
        })
      },
      // 载入下一个“测试”单词
      fnOpenNextTestWord() {
        this.thisWordIndex++;
        if (this.thisWordIndex < this.wordList.length) {
          this.inputStr = '';
          this.thisWord = this.wordList[this.thisWordIndex];
        } else {
          // 测试完成事件
          this.$alert('测试完成，看看分数吧！', '点击查看测试结果', {
            confirmButtonText: '确定',
            callback: () => {
              this.fnCountTestScore();
            }
          });
        }
      },
      // 计算测试分数
      fnCountTestScore() {
        let num = 0;
        this.testArr.forEach(item => {
          if (item.status === 1) {
            num++;
          }
        });
        this.score = Math.round((num / this.testArr.length) * 100);
        this.fnSubmitScore();
        sessionStorage.testArr = JSON.stringify(this.testArr);
      },
      // 发送测试成绩
      fnSubmitScore() {
        let textbook_id = sessionStorage.textbook_id;
        let study_type = sessionStorage.type_id;
        let type_ = this.isTest == 0 ? 0 : 1;
        this.$ajax({
          method: 'GET',
          url: this.$url.url0,
          params: {
            method: 'SaveTestRecord',
            user_id: this.userMsg.ID,
            textbook_id: textbook_id,
            test_type: this.tit + ' - 智能默写',
            test_score: this.score,
            test_number: this.testArr.length,
            study_type: study_type,
            type: type_, // 0学前测试 1学后测试
            unit_id: this.unitId,
            count: this.countTest
          }
        }).then(res => {
          let data = res.data;
          if (data.msg === '保存成功') {
            this.$router.push({
              name: 'scorePage',
              query: {
                score: this.score,
                testType: this.isTest,
                scoreTit: this.tit + ' - 智能默写'
              }
            });
          } else {
            this.$alert('提交成绩失败，请重试！', '请尝试重新提交或联系管理员', {
              confirmButtonText: '确定',
              callback: () => {
                return
              }
            });
          }
        })
      },
      // 更新生词熟词以及复习单词的数量
      fnAllWordState() {
        if (this.theWordNewOrOld === 0 && this.theWordState === 1) { // 熟词
          this.oldWordNum++;
        } else if (this.theWordNewOrOld === 0 && this.theWordState > 1) { // 生词
          this.newWordNum++;
        } else if (this.theWordNewOrOld === 1) { // 复习
          this.reviewWordNum++;
        }
      }
    },
    computed: {
    },
    mounted() {
      this.fnStudyTime();
      if (this.$route.query.type == 'reviewTest') {
        console.log('现在是复习测试哦');
        this.fnGetDictationTest();
        this.isTest = 3;
        this.tit = '记忆追踪 - 测试复习';
      } else {
        this.fnGetWord();
      }
    },
    created() {
      this.userMsg = JSON.parse(sessionStorage.userMsg);
      this.textbookTd = sessionStorage.textbook_id;
      this.typeId = sessionStorage.type_id;
      // 监听ctrl点击事件，播放单词音频
      document.onkeydown = (event) => {
        if (event.keyCode === 13) {
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
  #wordWrite {
    width: 100%;
    height: 100%;
    background: url(../../../static/img/study/space-bg.jpg) no-repeat 0 0;
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
    background: url(../../../static/img/study/space-bg-small.png) no-repeat 0 0;
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
    background-image: url(../../../static/img/study/help-light.png);
  }

  .rightBtn > span.skin {
    background-image: url(../../../static/img/study/skin-light.png);
  }

  .rightBtn > span.close {
    background-image: url(../../../static/img/study/close-light.png);
  }

  .rightBtn > span.help:hover {
    background-image: url(../../../static/img/study/help-light-hover.png);
  }

  .rightBtn > span.skin:hover {
    background-image: url(../../../static/img/study/skin-light-hover.png);
  }

  .rightBtn > span.close:hover {
    background-image: url(../../../static/img/study/close-light-hover.png);
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
    line-height: 60px;
    color: #999;
    font-size: 18px;
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
    background-image: url(../../../static/img/study/spell_right.png);
  }

  .mainCon .inputBox.wrong .isRight {
    background-image: url(../../../static/img/study/spell_wrong.png);
  }

  .mainCon .inputBox.wrong input {
    color: red;
  }

  .mainCon .mean {
    line-height: 40px;
    font-size: 24px;
    color: #666;
    overflow: hidden;
    margin: 16px 0;
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
