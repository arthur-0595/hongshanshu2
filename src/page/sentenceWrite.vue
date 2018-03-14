<template>
    <div id="sentenceWrite">
      <div class="topInfo">
        <!--<span>今日有效：00:20:40</span>-->
        <!--<span>今日在线：00:34:40</span>-->
        <!--<span>学习效率：13%</span>-->
      </div>
      <!--中间-->
      <div class="centerBox" v-loading="loading">
        <!--学习的单元名字-->
        <div class="nameBox">
          <div class="deviceName">{{thisTitle}}</div>
          <div class="version">{{thisVersionName}}</div>
          <div class="rightBtn clearfix">
            <!--<span class="help"></span>-->
            <!--<span class="skin"></span>-->
            <span class="close" @click="fnclosePage()"></span>
          </div>
        </div>
        <!--要学习的主要内容-->
        <div class="mainCon">
          <!--中文词义-->
          <div class="mean">{{thisSentence.sentence_mean}}</div>
          <!--中间输入框-->
          <div class="inputBox ">
            <div class="laba">默写</div>
            <input type="text" v-model="inputStr" autofocus id="thisInput"
                   v-focus="isfocus"
                   :class="{wrong: thisSentenceState>1}"
                   :disabled="isdisabled"
                   oncopy="return false;"
                   onpaste="return false;"
                   oncut="return false;" />
            <div class="isRight" v-show="thisSentenceState==1"></div>
            <div class="isWrong" v-show="thisSentenceState>1"></div>
          </div>
          <!--记忆强度-->
          <div class="totalBar"
               :style="{visibility: isTest==1?'visible':'hidden'}"
               :title="'记忆强度：' + thisSentence.SenWrite_per">
          <span class="curBar"
                :style="{width: thisSentence.SenWrite_per + '%'}"></span>
          </div>
          <!--正确的句子，答对显示 wordBox 答错显示 wordBox1样式-->
          <div class="wordBox"
               :class="{wordBox1: thisSentenceState>1}"
               v-show="showSentence">
            <!--v-show="showSentence"-->
            {{thisSentence.sentence}}
          </div>
        </div>
        <!--底部内容-->
        <div class="botInfo">
          <span>学习时长： {{studyTime}}</span>
          <span v-if="isTest == 1">本次学习 [ 生词： {{newWordNum}}个　熟词：{{oldWordNum}}个　复习：{{reviewWordNum}}个 ]</span>
          <span v-else>进度：{{thisSentenceIndex+1}}/{{sentenceList.length}}</span>
        </div>
        <audio src="" id="audio" autoplay="autoplay"></audio>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'sentence-write',
        components: {},
        data() {
            return {
              loading: false,
              userMsg: {},
              unitId: 0,
              typeId: 1, // 类别ID
              thisTitle: '例句默写',
              studyTime: '00:00:00', // 学习时间
              newWordNum: 0, // 生词数量
              oldWordNum: 0, // 熟词数量
              reviewWordNum: 0, // 复习数量
              showSentence: false, // 是否显示句子释义
              showMsg: false, // 是否显示提示
              thisSentence: { // 当前句子对象
                id: 102,
                sentence: 'The giraffe has a long neck.',
                sentence_mean: '长颈鹿的脖子很长。',
                sentence_url: '\\UploadeFile\\Video\\The_giraffe_has_a_long_neck.wav'
              },
              sentenceList: [], // 测试句子列表
              thisSentenceIndex: 0, // 当前单词的index
              thisSentenceState: 0, // 当前的状态，0 未判断  1 正确  2 错误
              theSentenceNewOrOld: 0, // 该句子是不是听过 0：默认没听过   大于0：听过
              theSentenceState: 1, // 生词还是熟词 1：默认熟词  大于1：生词
              isTest: 1, // 当前状态 0:学前测试  1:默认，学习  2:闯关测试
              countTest: 1, // 是否是直接进入测试， 1：未学习进入  2：学习过进入测试
              testArr: [], // 测试结果组成的数组
              score: 0, // 测试计算分数
              againEnter: 2, // 两次判断进入下一个单词，默认为2，点击-1
              inputStr: '', // input内输入的内容
              isfocus: true, // 是否自动获得焦点
              isdisabled: false // 是否禁止input输入
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
          // 请求首个句子
          fnGetSentence() {
            this.loading = true;
            this.$ajax({
              method: 'GET',
              url: this.$url.url1,
              params: {
                method: 'Sentence',
                user_id: this.userMsg.ID,
                unit_id: this.unitId,
                type: this.typeId
              }
            }).then(res => {
              this.loading = false;
              let data = res.data;
              // console.log(data);
              if (data[0]) { // 进入例句默写学习
                this.thisSentence = data[0];
                // 单词状态重置为默认熟词
                this.theSentenceState = 1;
                // 记忆强度大于0说明该词是一个学过的词
                if (this.thisSentence.SenWrite_per > 0) {
                  this.theSentenceNewOrOld = 1;
                } else {
                  this.theSentenceNewOrOld = 0;
                }
              } else if (data == 4) { // 学前测试
                this.$alert('先来学前测试一下吧 : )', '进入学前测试！', {
                  confirmButtonText: '确定',
                  callback: () => {
                    console.log('开始学前测试');
                    this.thisTitle = '例句默写 - 学前测试';
                    this.isTest = 0;
                    this.fnGetTestList();

                    return false;
                  }
                })
              } else if (data == 2) { // 闯关测试
                this.$alert('学习完毕，现在去测试一下吧 : )', '进入闯关测试！', {
                  confirmButtonText: '确定',
                  callback: () => {
                    console.log('开始闯关测试');
                    this.thisTitle = '例句默写 - 闯关测试';
                    this.isTest = 2;
                    this.fnGetTestList();

                    return false;
                  }
                })
              } else if (data == 3) { // 没有可学习的内容
                this.$alert('没有可学习的内容，请联系客服人员 : (', '返回学习中心', {
                  confirmButtonText: '返回学习中心',
                  callback: () => {
                    this.$router.push('/home');
                    return false;
                  }
                })
              } else if (data == 0) { // 报错
                this.$alert('服务器报错，请联系客服人员 : (', '返回学习中心', {
                  confirmButtonText: '返回学习中心',
                  callback: () => {
                    this.$router.push('/home');
                    return false;
                  }
                })
              }
            })
          },
          // 请求下一个句子
          fnGetNextSentence() {
            this.fnAllSentenceState();
            this.loading = true;
            this.$ajax({
              method: 'GET',
              url: this.$url.url1,
              params: {
                method: 'getnextSentence',
                id: this.thisSentence.id,
                neworold_word: this.theSentenceState,
                user_id: this.userMsg.ID,
                unit_id: this.unitId,
                type: this.typeId
              }
            }).then(res => {
              this.loading = false;
              let data = res.data;
              // console.log(data);
              if (data[0]) { // 进入例句听力学习
                this.thisSentence = data[0];
                // 单词状态重置为默认熟词
                this.theSentenceState = 1;
                // 记忆强度大于0说明该词是一个学过的词
                if (this.thisSentence.SenWrite_per > 0) {
                  this.theSentenceNewOrOld = 1;
                } else {
                  this.theSentenceNewOrOld = 0;
                }
              } else if (data == 4) { // 学前测试
                this.$alert('先来学前测试一下吧 : )', '进入学前测试！', {
                  confirmButtonText: '确定',
                  callback: () => {
                    console.log('开始学前测试');
                    this.thisTitle = '例句翻译 - 学前测试';
                    this.isTest = 0;
                    this.fnGetTestList();

                    return false;
                  }
                })
              } else if (data == 2) { // 闯关测试
                this.$alert('学习完毕，现在去测试一下吧 : )', '进入闯关测试！', {
                  confirmButtonText: '确定',
                  callback: () => {
                    console.log('开始闯关测试');
                    this.thisTitle = '例句翻译 - 闯关测试';
                    this.isTest = 2;
                    this.fnGetTestList();

                    return false;
                  }
                })
              } else if (data == 3) { // 没有可学习的内容
                this.$alert('没有可学习的内容，请联系客服人员 : (', '返回学习中心', {
                  confirmButtonText: '返回学习中心',
                  callback: () => {
                    this.$router.push('/home');
                    return false;
                  }
                })
              } else if (data == 0) { // 报错
                this.$alert('服务器报错，请联系客服人员 : (', '返回学习中心', {
                  confirmButtonText: '返回学习中心',
                  callback: () => {
                    this.$router.push('/home');
                    return false;
                  }
                })
              }
            })
          },
          // 获取测试内容
          fnGetTestList() {
            this.loading = true;
            this.$ajax({
              method: 'GET',
              url: this.$url.url1,
              params: {
                method: 'getSentence',
                unit_id: this.unitId,
                type: 1
              }
            }).then(res => {
              this.loading = false;
              let data = res.data;
              if (data[0]) {
                this.sentenceList = data;
                this.thisSentence = data[0];
              } else {
                this.$alert('测试内容获取失败，请联系客服人员!', '点击返回学习中心', {
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
            let myVal = this.fndisposeSen(this.inputStr);
            let rightAnswer = this.fndisposeSen(this.thisSentence.sentence);
            // 先判断当前是不是测试
            if (this.isTest !== 1) {
              // 当状态不为学习时
              // 如果input框内字符长度为0，则给出提示但并不载入下一条
              if (this.inputStr.length < 1) {
                this.$message({
                  message: '一点都不会吗？',
                  type: 'warning'
                });
                return false;
              }
              // 判断正确与否，并构建本次答案对象
              let answerType = 1;// 默认为正确
              answerType = (myVal === rightAnswer) ? 1 : 0;

              let thisAnswerObj = {
                this_name: this.thisSentence.sentence,
                this_mean: this.thisSentence.sentence_mean,
                status: answerType,
                myVal: myVal
              };
              this.testArr.push(thisAnswerObj);
              // 加载下一个测试句子
              this.fnOpenNextTestSentence();
            } else { // 当前状态为学习
              if (this.againEnter === 2) {
                this.againEnter--;
                this.showSentence = true;
                if (myVal === rightAnswer) { // 填写正确
                  this.thisSentenceState = 1;
                  this.isdisabled = true;
                  this.againEnter--;
                } else { // 填写错误
                  this.thisSentenceState = 2;
                  this.isdisabled = true;
                  // 错误，单词状态设置为生词
                  this.theSentenceState = 2;
                }
              } else if (this.againEnter === 1) {
                this.againEnter = 2;
                this.showSentence = true;
                this.thisSentenceState = 2;
                this.isdisabled = false;
                this.isfocus = true;
                this.inputStr = '';
              } else if (this.againEnter === 0) {
                this.againEnter = 2;
                this.showSentence = false;
                this.isdisabled = false;
                this.isfocus = true;
                this.inputStr = '';
                this.thisSentenceState = 0;
                this.fnGetNextSentence();
              }
            }
          },
          // 载入下一个“测试”单词
          fnOpenNextTestSentence() {
            this.thisSentenceIndex++;
            if (this.thisSentenceIndex < this.sentenceList.length) {
              this.inputStr = '';
              this.thisSentence = this.sentenceList[this.thisSentenceIndex];
            } else { // 测试完成事件
              this.$alert('测试完成，去看看你的分数吧！',
                '点击查看测试结果！'
              ).then(() => {
                this.fnCountTestScore();
              })
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

            // console.log('user_id:' + userMsg.ID);
            // console.log('textbook_id:' + textbook_id);
            // console.log('test_type:' + test_type);
            // console.log('test_score:' + this.score);
            // console.log('test_number:' + this.dataLength);
            // console.log('study_type:' + study_type);
            // console.log('type:' + this.testType);
            // console.log('unit_id:' + this.unitId);
            // console.log('count:' + this.countTestType);
            this.$ajax({
              method: 'GET',
              url: this.$url.url0,
              params: {
                method: 'SaveTestRecord',
                user_id: this.userMsg.ID,
                textbook_id: textbook_id,
                test_type: this.thisVersionName,
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
                console.log(data);
                this.$router.push({
                  name: 'scorePage',
                  query: {
                    score: this.score,
                    testType: this.isTest
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
          fnAllSentenceState() {
            if (this.theSentenceNewOrOld === 0 && this.theSentenceState === 1) { // 熟词
              this.oldWordNum++;
            } else if (this.theSentenceNewOrOld === 0 && this.theSentenceState > 1) { // 生词
              this.newWordNum++;
            } else if (this.theSentenceNewOrOld > 0) { // 复习
              this.reviewWordNum++;
            }
          },
          // 去除句子标点，适当增加容错
          fndisposeSen(sentence_) {
            if (typeof sentence_ === 'string') {
              return sentence_.replace('.', '');
            } else {
              return sentence_;
            }
          },
          // 保存最后一次学习记录
          fnSaveStudy() {
            this.$ajax({
              method: 'GET',
              url: this.$url.url1,
              params: {
                method: 'Study',
                user_id: this.userMsg.ID,
                unit_id: this.unitId
              }
            }).then(res => {
              let data = res.data;
              console.log('保存最后一次学习记录' + data);
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
        }
      },
      mounted() {
        this.fnGetSentence();
        this.fnStudyTime();
      },
      created() {
        this.userMsg = JSON.parse(sessionStorage.userMsg);
        this.unitId = sessionStorage.unit_id;
        this.typeId = sessionStorage.type_id;
        this.fnSaveStudy();
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
  #sentenceWrite{
    width:100%;
    height:100%;
    background:url(../../static/img/study/space-bg.jpg) no-repeat 0 0;
    position: relative;
  }
  .topInfo{
    width:100%;
    line-height: 40px;
    color:#333;
    font-size:14px;
    text-align: center;
  }
  .centerBox{
    width: 870px;
    height:540px;
    background: url(../../static/img/study/space-bg-small.png) no-repeat 0 0;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
  }
  .nameBox{
    width:94%;
    height:50px;
    line-height: 50px;
    position: relative;
    border-bottom:1px solid #ccc;
    margin:12px auto 0;
  }
  .nameBox .deviceName{
    font-size:16px;
    text-align: center;
    color:#666;
  }
  .version{
    color:#aaa;
    font-size:12px;
    position: absolute;
    top:0;left:2px;
  }
  .rightBtn{
    position: absolute;
    height:50px;
    top:0;right:2px;
  }
  .rightBtn>span{
    float:left;
    width:32px;
    height:100%;
    background-repeat: no-repeat;
    background-position: center center;
    cursor: pointer;
  }
  .rightBtn>span.help{
    background-image:url(../../static/img/study/help-light.png);
  }
  .rightBtn>span.skin{
    background-image:url(../../static/img/study/skin-light.png);
  }
  .rightBtn>span.close{
    background-image:url(../../static/img/study/close-light.png);
  }
  .rightBtn>span.help:hover{
    background-image:url(../../static/img/study/help-light-hover.png);
  }
  .rightBtn>span.skin:hover{
    background-image:url(../../static/img/study/skin-light-hover.png);
  }
  .rightBtn>span.close:hover{
    background-image:url(../../static/img/study/close-light-hover.png);
  }

  /*学习主要内容*/
  .mainCon{
    margin: 60px 120px 0 120px;
    height:400px;
  }
  .mainCon .wordBox{
    width: 100%;
    min-height:50px;
    line-height:50px;
    font-family: "Arial";
    padding: 0 10px;
    box-sizing:border-box;
    font-size: 28px;
    word-wrap: break-word;
  }
  .mainCon .wordBox.wordBox1{
    /*color: #CD5C5C;*/
    color:rgb(217, 198, 161);
  }
  .mainCon .inputBox{
    position: relative;
    width:100%;
    height:50px;
    margin-bottom:8px;
  }
  .mainCon .inputBox input{
    border:none;
    outline: none;
    -webkit-appearance: none; -moz-appearance: none; -o-appearance: none; appearance: none;
    background-color: #c8c5b4;
    width:100%;
    height:100%;
    padding: 0 10px;
    box-sizing:border-box;
    font-size:28px;
    color:#333;
  }
  .mainCon .inputBox input.wrong {
    color: red;
  }
  .mainCon .inputBox .laba{
    position: absolute;
    top:0;
    left:-50px;
    width:50px;
    height:50px;
    line-height: 50px;
    color:#999;
    font-size:18px;
  }
  .mainCon .inputBox .isRight, .mainCon .inputBox .isWrong{
    position: absolute;
    top:0;
    right: -60px;
    width:50px;
    height:50px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size:40px 40px;
  }
  .mainCon .inputBox .isRight{
    background-image:url(../../static/img/study/spell_right.png);
  }
  .mainCon .inputBox .isWrong{
    background-image:url(../../static/img/study/spell_wrong.png);
  }
  .mainCon .inputBox.wrong  input{
    color:red;
  }
  .mainCon .mean{
    line-height: 50px;
    font-size: 24px;
    color:#666;
    overflow: hidden;
    margin:16px 0;
  }
  /*记忆强度*/
  .totalBar{
    width:100%;
    height:6px;
    background-color: #ccc;
    margin:0;
    position: relative;
  }
  .totalBar .curBar{
    position: absolute;
    top:0;left:0;
    width: 10%;
    height:6px;
    background: #0a724a;
  }
  /*底部信息*/
  .botInfo{
    width:90%;
    margin:0 auto;
    color:#666;
    font-size:14px;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
  }
</style>
