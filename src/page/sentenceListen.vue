<template>
  <div id="sentenceListen">
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
        <div class="deviceName">{{thisTitle}}</div>
        <div class="version">{{thisVersionName}}</div>
        <div class="rightBtn clearfix">
          <!--<span  class="repeat">-->
          <!--<label for="repeat"><input type="checkbox" id="repeat"/>重复1播放</label>-->
          <!--</span>-->
          <!--<span class="help"></span>-->
          <!--<span class="skin"></span>-->
          <span class="close" @click="fnclosePage()"></span>
        </div>
      </div>
      <!--要学习的主要内容-->
      <div class="mainCon">
        <div class="sentenceBox">
          <!--正确的句子，答错 显示，答对不显示-->
          <div class="correctSentence "
               :class="{
                practiceColor: thisSentenceState==1,
                errorColor: thisSentenceState>1
              }"
               :style="{visibility: showSentence?'visible':'hidden'}">
            {{thisSentence.sentence}}
          </div>
          <div class="mySentence clearfix">
            <!--一开始要写单词的格子 upWord表示填写了的单词  red表示填写错误的单词-->
            <ul class="lineBox clearfix">
              <li v-for="item in sentenceArr1"
                  :class="{
                    punctuation: fnjudge(item),
                    answerItem: !fnjudge(item)
                  }"
                  :data-main="item"
                  @click="fnClearItem($event)">
                {{fnjudge(item) ? item : ''}}
              </li>
              <!--<li class="punctuation" >?</li>-->
              <!--<li class="upWord" >qqq</li>-->
              <!--<li class="upWord red" >wwww</li>-->
            </ul>
            <span class="brush"
                  v-show="showClearBtn"
                  @click="fnClearAll()"></span>
            <span class="laba" @click="fnAudioPalyer(thisSentence.sentence_url)"></span>
          </div>
        </div>
        <!--记忆强度-->
        <div class="totalBar"
             :style="{visibility: isTest==1?'visible':'hidden'}"
             :title="'记忆强度：' + thisSentence.SenHearing_per">
          <span class="curBar"
                :style="{width: thisSentence.SenHearing_per + '%'}"></span>
        </div>
        <!--底部盒子内容-->
        <div class="bottomBox">
          <!--提示盒子-->
          <div class="tipBox" v-show="showMsg"><span></span>请仔细听！</div>
          <div class="wordsBox clearfix">
            <!--一开始打乱的单词-->
            <ul class="randomWords clearfix" v-show="!showSentence">
              <li v-for="item in sentenceArr2"
                  @click="fnClickItem(item, $event)"
                  :id="item + 'LiHtml'">{{item}}
              </li>
              <!--<li class="hideThisItem">you</li>-->
            </ul>
            <!--答完显示中文，无论对错-->
            <div class="meaning" v-show="showSentence">
              {{thisSentence.sentence_mean}}
            </div>
            <!--开始是哭脸，答对下一题 forword 答错 练习 practice-->
            <div class="face forword "
                 @click="fnVerify()"
                 v-show="!showPractice"></div>
            <div class="face forword practice"
                 v-show="showPractice"
                 @click="fnClickPracticeBtn()"></div>
            <div class="overtime" style="display: none;">
              <span></span>超时了，再快点儿！
            </div>
          </div>
        </div>
      </div>
      <!--底部内容-->
      <div class="botInfo">
        <!--<span>倒计时： {{setTimeNum}}</span>-->
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
    name: 'sentence-listen',
    components: {},
    data() {
      return {
        loading: false,
        userMsg: {},
        unitId: 0,
        typeId: 1, // 类别ID
        thisTitle: '例句听力',
        studyTime: '00:00:00', // 学习时间
        showTimer: false, // 是否显示倒计时
        setTimeNum: 20, // 倒计时
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
        showClearBtn: true, // 是否显示清除按钮
        showPractice: false, // 是否显示练习按钮
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
      // 倒计时五秒，倒计时结束后自动选择
      fnsetTimeOut() {
        this.showTimer = true;
        this.timer = setInterval(() => {
          this.setTimeNum--;
          if (this.setTimeNum <= 0) {
            clearInterval(this.timer);
            console.log('倒计时结束！');
          }
        }, 1000)
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
          if (data[0]) { // 进入例句听力学习
            this.thisSentence = data[0];
            this.fnAudioPalyer(this.thisSentence.sentence_url);
            // 单词状态重置为默认熟词
            this.theSentenceState = 1;
            // 记忆强度大于0说明该词是一个学过的词
            if (this.thisSentence.SenHearing_per > 0) {
              this.theSentenceNewOrOld = 1;
            } else {
              this.theSentenceNewOrOld = 0;
            }
          } else if (data == 4) { // 学前测试
            this.$alert('先来学前测试一下吧 : )', '进入学前测试！', {
              confirmButtonText: '确定',
              callback: () => {
                console.log('开始学前测试');
                this.thisTitle = '例句听力 - 学前测试';
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
                this.thisTitle = '例句听力 - 闯关测试';
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
            this.fnAudioPalyer(this.thisSentence.sentence_url);
            // 单词状态重置为默认熟词
            this.theSentenceState = 1;
            // 记忆强度大于0说明该词是一个学过的词
            if (this.thisSentence.SenHearing_per > 0) {
              this.theSentenceNewOrOld = 1;
            } else {
              this.theSentenceNewOrOld = 0;
            }
          } else if (data == 4) { // 学前测试
            this.$alert('先来学前测试一下吧 : )', '进入学前测试！', {
              confirmButtonText: '确定',
              callback: () => {
                console.log('开始学前测试');
                this.thisTitle = '例句听力 - 学前测试';
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
                this.thisTitle = '例句听力 - 闯关测试';
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
            this.fnAudioPalyer(this.thisSentence.sentence_url);
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
      // 点选答案的单词选项事件
      fnClickItem(item_, event) {
        let answerItem = document.querySelector('li.answerItem');

        answerItem.innerHTML = item_;
        answerItem.className = 'upWord';
        event.target.className = 'hideThisItem';
      },
      // 点击清除所有答案选项事件
      fnClearAll() {
        let allUpWord = document.querySelectorAll('li.upWord');
        let allHideItem = document.querySelectorAll('.randomWords>li.hideThisItem');

        allUpWord.forEach(item => {
          item.innerHTML = '';
          item.className = 'answerItem';
        });
        allHideItem.forEach(item => {
          item.className = '';
        })
      },
      // 点击已选答案选项，清除当前选项内容
      fnClearItem(event) {
        if (event.target.innerText === '') {
          return false;
        }
        let itemInnerHtml = event.target.innerText;
        event.target.innerHTML = '';
        event.target.className = 'answerItem';

        let thisId = '#' + itemInnerHtml + 'LiHtml';
        let answerThisItem = document.querySelector(thisId);
        answerThisItem.className = '';
      },
      // 验证当前正确与否
      fnVerify() {
        let allUpWord = document.querySelectorAll('li.upWord');
        // 一个答案都未选择时，直接弹出提示，不进行后面的验证
        if (allUpWord.length === 0) {
          this.$alert(
            '在多听几次吧，你可以的！',
            '一点都不会吗？'
          ).then(() => {
            return false;
          });
        }
        let topAnswer = '';
        allUpWord.forEach(item => {
          topAnswer += item.innerHTML;
        });
        // console.log('自己的答案：' + topAnswer);
        let rightAnswer = '';
        let thisSentence = this.fnSentenceProcessor(this.thisSentence.sentence);
        rightAnswer = this.fnProcessorRightSentence(thisSentence);
        // console.log('正确答案：' + rightAnswer);
        // 先判断当前是不是测试
        if (this.isTest !== 1) {
          // 当状态不为学习时
          // 判断正确与否，并构建本次答案对象
          let answerType = 1;// 默认为正确
          answerType = (topAnswer === rightAnswer) ? 1 : 0;
          let thisanswerSentence = '';
          let allAnswerLi = document.querySelectorAll('ul.lineBox>li');
          allAnswerLi.forEach(item => {
            thisanswerSentence += item.innerText + ' ';
          });
          let thisAnswerObj = {
            this_name: this.thisSentence.sentence,
            this_mean: this.thisSentence.sentence_mean,
            status: answerType,
            myVal: thisanswerSentence
          };
          this.testArr.push(thisAnswerObj);
          // 加载下一个测试句子
          this.fnOpenNextTestSentence();
        } else { // 当前状态为学习
          if (this.againEnter === 2) {
            this.againEnter--;
            this.showSentence = true;
            this.showClearBtn = false;
            if (topAnswer === rightAnswer) { // 填写正确
              this.thisSentenceState = 1;
              this.showPractice = false;

              this.againEnter--;
            } else { // 填写错误
              this.thisSentenceState = 2;
              this.showPractice = true;

              // 错误，单词状态设置为生词
              this.theSentenceState = 2;
            }
          } else if (this.againEnter === 1) {
            this.againEnter = 2;
            this.showSentence = false;
            this.showClearBtn = true;
            this.fnClearAll();
          } else if (this.againEnter === 0) {
            this.againEnter = 2;
            this.showSentence = false;
            this.showClearBtn = true;
            this.fnClearAll();
            this.fnGetNextSentence();
          }
        }
      },
      // 载入下一个“测试”单词
      fnOpenNextTestSentence() {
        this.thisSentenceIndex++;
        if (this.thisSentenceIndex < this.sentenceList.length) {
          this.thisSentence = this.sentenceList[this.thisSentenceIndex];
          this.fnAudioPalyer(this.thisSentence.sentence_url);
          this.fnClearAll();
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
      // 点击练习按钮事件
      fnClickPracticeBtn() {
        // 当前状态为错误时，则直接调用清除所有选项事件，即为练习功能
        if (this.thisSentenceState > 1) {
          this.fnClearAll();
          this.fnAudioPalyer(this.thisSentence.sentence_url);
          this.againEnter = 2;
          this.showPractice = false;
          this.showSentence = false;
          return false;
        }
      },
      // 处理句子的拼接格式
      fnSentenceProcessor(sentence_) {
        sentence_ = sentence_.replace(/^\s+|\s+$/gm, '');
        sentence_ = sentence_.replace(/(\,|\?|\!)([a-zA-z]+)/g, '$1 $2');
        sentence_ = sentence_.replace(/(\w+)(\,|\?|\!)([^0-9]+)/g, '$1 $2$3');
        sentence_ = sentence_.replace(/(\w)(\.|\?|\!{1})$/g, '$1 $2');
        sentence_ = sentence_.replace(/(\w+)([\s]{1})([\.]{1})(\w+)/g, '$1$3$4');
        sentence_ = sentence_.replace(/(\w+)(\,|\.|\?|\!{1})(\s{1})/g, '$1 $2$3');
        return sentence_;
      },
      // 测试时处理正确句子的格式之后进行对比
      fnProcessorRightSentence(sentence_) {
        sentence_ = sentence_.replace(/\s/g, '');
        sentence_ = sentence_.replace(/[\.\?\!\,]/g, '');
        return sentence_;
      },
      // 判断是否是标点符号的函数
      fnjudge(item_) {
        let reg = /\,|\.|\!|\?/g;
        return reg.test(item_)
      },
      // 删除class
      removeClass(elements, cName) {
        elements.className = elements.className.replace(new RegExp('(\\s|^)' + cName + '(\\s|$)'), ' ');
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
      // 顺序未打乱的句子数组
      sentenceArr1() {
        let sen_ = this.fnSentenceProcessor(this.thisSentence.sentence);
        sen_ = sen_.split(' ');
        return sen_;
      },
      // 顺序已打乱的句子数组
      sentenceArr2() {
        let sen_ = this.fnSentenceProcessor(this.thisSentence.sentence);
        sen_ = sen_.split(' ');
        sen_.sort(function () {
          return (0.5 - Math.random());
        });
        let reg = /\,|\.|\!|\?/g;
        sen_.forEach((item, index) => {
          if (reg.test(item)) {
            sen_.splice(index, 1);
          }
        });
        return sen_;
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
      // 监听ctrl点击事件，播放单词音频
      document.onkeydown = (event) => {
        if (event.keyCode === 17) { // ctrl
          this.fnAudioPalyer(this.thisSentence.sentence_url);
        }
      }
    }
  }
</script>

<style scoped>
  #sentenceListen {
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

  .rightBtn > span.repeat {
    width: 80px;
    font-size: 12px;
    position: relative;
    padding-left: 14px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .rightBtn > span.repeat input {
    position: absolute;
    top: 16px;
    left: -6px;
  }

  /*学习主要内容*/
  .mainCon {
    margin: 40px 60px 0 60px;
    height: 410px;
  }

  .mainCon .sentenceBox {
    width: 100%;

  }

  .mainCon .sentenceBox .correctSentence {
    font-size: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-height: 35px;
    margin-right: 30px;
  }

  .mainCon .sentenceBox .correctSentence.practiceColor {
    color: #00bba2;
  }

  .mainCon .sentenceBox .correctSentence.errorColor {
    color: #ff4d51;
  }

  .mainCon .sentenceBox .mySentence {
    width: 100%;
    margin-top: 8px;
  }

  .mainCon .sentenceBox .mySentence .lineBox {
    max-width: 540px;
    float: left;
    overflow: hidden;
  }

  .mainCon .sentenceBox .mySentence .lineBox > li {
    float: left;
    min-width: 20px;
    height: 34px;
    line-height: 34px;
    margin-right: 4px;
    box-sizing: border-box;
  }

  .mainCon .sentenceBox .mySentence .lineBox > li.answerItem {
    border-bottom: 1px solid #a6a6a6;
  }

  .mainCon .sentenceBox .mySentence .lineBox > li.upWord {
    font-size: 20px;
    border: none;
    height: 48px;
    line-height: 48px;
    color: #000;
  }

  .mainCon .sentenceBox .mySentence .lineBox > li.upWord.red {
    color: red;
  }

  .mainCon .sentenceBox .mySentence .lineBox > li.punctuation {
    border: none;
    text-align: center;
    line-height: 44px;
    color: #333;
    font-size: 18px;
    margin: 0;
  }

  .mainCon .sentenceBox .mySentence .brush {
    width: 30px;
    height: 34px;
    background: url(../../static/img/study/brush.png) no-repeat center bottom;
    float: left;
  }

  .mainCon .sentenceBox .mySentence .brush:hover {
    opacity: .8;
    cursor: pointer;
  }

  .mainCon .sentenceBox .mySentence .laba {
    width: 30px;
    height: 34px;
    background-repeat: no-repeat;
    background-position: center bottom;
    background-image: url(../../static/img/study/deep-laba1.png);
    float: right;
    cursor: pointer;
  }

  .mainCon .sentenceBox .mySentence .laba:hover {
    opacity: .8;
  }

  .mainCon .sentenceBox .mySentence .laba.laba1 {
    background-image: url(../../static/img/study/deep-laba2.png);
  }

  /*记忆强度*/
  .totalBar {
    width: 100%;
    height: 6px;
    background-color: #ccc;
    margin: 34px 0;
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

  /*中间内容底部*/
  .bottomBox {
    width: 100%;
    position: relative;
  }

  .bottomBox .tipBox {
    position: absolute;
    top: 50px;
    width: 100%;
    text-align: center;
    line-height: 42px;
    color: #8ac22b;
    font-size: 18px;
  }

  .bottomBox .tipBox > span {
    display: inline-block;
    vertical-align: top;
    width: 40px;
    height: 40px;
    background: url(../../static/img/study/mute-light.png) no-repeat center center;
  }

  .bottomBox .wordsBox {
    width: 100%;
  }

  .bottomBox .wordsBox .randomWords {
    max-width: 664px;
    height: 114px;
    float: left;
    overflow: auto;
  }

  .bottomBox .wordsBox .randomWords li.hideThisItem {
    visibility: hidden;
  }

  .bottomBox .wordsBox .face {
    float: right;
    width: 80px;
    height: 52px;
    background-repeat: no-repeat;
    background-position: center right;
    background-image: url(../../static/img/study/cry.png);
    background-size: 52px 52px;
  }

  .bottomBox .wordsBox .face.forword {
    background-image: url(../../static/img/study/arrow.png);
  }

  .bottomBox .wordsBox .face.forword:hover {
    opacity: .8;
    cursor: pointer;
  }

  .bottomBox .wordsBox .face.forword.practice {
    background-image: url(../../static/img/study/practise.png);
  }

  .bottomBox .wordsBox .randomWords > li {
    float: left;
    padding: 13px;
    border: 1px solid #d2d2d2;
    margin-right: 5px;
    margin-bottom: 5px;
    font-size: 20px;
    color: #000;
  }

  .bottomBox .wordsBox .randomWords > li:hover {
    color: #009966;
    border: 1px solid #008c72;
    cursor: pointer;
  }

  .bottomBox .wordsBox .meaning {
    max-width: 664px;
    height: 80px;
    line-height: 40px;
    font-size: 18px;
    float: left;
    overflow: hidden;
  }

  .bottomBox .wordsBox .overtime {
    position: absolute;
    top: 80px;
    width: 100%;
    text-align: center;
    color: #8ac22b;
    font-size: 18px;
    line-height: 40px;
  }

  .bottomBox .wordsBox .overtime > span {
    display: inline-block;
    vertical-align: top;
    width: 50px;
    height: 40px;
    background: url(../../static/img/study/rain-light.png) no-repeat center center;
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
