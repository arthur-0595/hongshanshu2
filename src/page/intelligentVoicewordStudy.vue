<template>
  <div class="bodyBox" v-loading="loading">
    <div class="centerBox">
      <div class="nameBox">
        <div class="deviceName">{{scoreTit}}</div>
        <div class="version">辩音</div>
        <div class="rightBtn clearfix">
          <span class="close" @click="fnclosePage()"></span>
        </div>
      </div>
      <!--要学习的主要内容-->
      <div class="mainCon">
        <div class="title">辩音：选择含该字母发音的单词。</div>
        <div class="correctWord">
          <span class="left" @click="fnClearAll()" v-show="isRight==0">清空</span>
          <span style="">{{thisWord.letter}}</span>
          <span class="laba" @click="fnAudioPalyer(thisWord.letter_url)"></span>
        </div>
        <div class="myWordBox "
             :class="{
              correct: isRight==1,
              error: isRight==2
            }">
          <span class="isCorrent"></span>
          <div class="myWordLine">
            <div class="myLetter"
                 @click="fnClickMyItem($event)"
               v-for="vm in 6"></div>
          </div>
        </div>
        <div class="line"></div>
        <div class="letterBox clearfix">
          <span class="orange">请选择</span>
          <div class="randomLetter">
            <!--<span class="isPitchOn">aasfsafasf</span>-->
            <span v-for="vm in thisWord.more"
              @click="fnClickItem(vm, $event)"
              :id="'itemCon'+vm.letter">{{vm.letter}}</span>
          </div>
          <span class="forword" @click="fnVerify()"></span>
          <!--visibility: hidden;-->
        </div>
      </div>
      <!--底部内容-->
      <div class="botInfo">
        <span>有效时长： {{studyTime}}</span>
        <span>学习进度：{{thisWordIndex}}/{{wordList.length}}</span>
      </div>
      <audio src="" id="audio" autoplay></audio>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'intelligent-voice-word-study',
    components: {},
    data() {
      return {
        scoreTit: '我是左上角标题',
        loading: false,
        userMsg: {},
        studyTime: '00:00:00', // 学习时间
        wordList: [],
        thisWord: {},
        thisWordIndex: 0,
        isRight: 0, // 0空 1正确 2错误
        againEnter: 2, // 判断次数
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
      // 获取辩音的单词
      fnGetAllWord() {
        this.loading = true;
        // console.log(this.$route.query);
        this.$ajax({
          method: 'GET',
          url: this.$url.url1,
          params: {
            method: 'voicetest',
            type_id: this.$route.query.typeId,
            voice_id: this.$route.query.id,
            type: '2',
            issound: '1'  // 辩音1  其他0
          }
        }).then(res => {
          this.loading = false;
          let data = res.data;
          this.wordList = data;
          this.thisWord = data[0];
          this.fnAudioPalyer(data[0].letter_url);
        })
      },
      // 载入下一个单词
      fnUpdateNextWord() {
        this.thisWordIndex++;
        if (this.thisWordIndex < this.wordList.length) {
          this.thisWord = this.wordList[this.thisWordIndex];
          this.fnAudioPalyer(this.thisWord.letter_url);
        } else {
          this.$alert('学习完毕，点击返回！', '返回' )
            .then(() => {
              this.fnclosePage();
            })
        }
      },
      // 点击答案选项事件
      fnClickItem(item_, event) {
        let answerItem = document.querySelector('.myWordLine .myLetter');
        if (answerItem === null) {
          console.log('直接调用判断是否正确的事件函数');
          return false
        }
        event.target.className = 'isPitchOn';
        this.fnAudioPalyer(item_.letter_url);
        answerItem.innerHTML = item_.letter;
        answerItem.className = 'isHave';
        answerItem.dataset.state = item_.state;
      },
      // 点击已选选项事件
      fnClickMyItem(event) {
        if (event.target.innerText === '' || this.isRight != 0) {
          return false;
        }
        let itemInnerHtml = event.target.innerText;
        event.target.innerHTML = '';
        event.target.className = 'myLetter';

        let thisId = '#itemCon' + itemInnerHtml;
        let answerThisItem = document.querySelector(thisId);
        answerThisItem.className = '';
      },
      // 点击清除所有答案选项事件
      fnClearAll() {
        if (this.isRight != 0) {
          return false;
        }
        let allUpWord = document.querySelectorAll('.isHave');
        let allHideItem = document.querySelectorAll('.randomLetter>span');

        allUpWord.forEach(item => {
          item.innerHTML = '';
          item.className = 'myLetter';
        });
        allHideItem.forEach(item => {
          item.className = '';
        })
      },
      // 验证当前正确与否
      fnVerify() {
        let allUpWord = document.querySelectorAll('.isHave');
        let num = 0;
        // 一个答案都未选择时，直接弹出提示，不进行后面的验证
        if (allUpWord.length === 0) {
          this.$alert(
            '在多听几次吧，你可以的！',
            '一点都不会吗？'
          ).then(() => {
            return false;
          });
        }
        allUpWord.forEach((item, index) => {
          if (parseInt(item.dataset.state) === 1) {
            num++;
          }
        });
        console.log(num + '正确');
        if (this.againEnter === 2) {
          this.againEnter--;

          if (num === 6) { // 填写正确
            this.isRight = 1;

            this.againEnter--;
          } else { // 填写错误
            this.isRight = 2;

          }
        } else if (this.againEnter === 1) {
          this.isRight = 0;
          this.againEnter = 2;

          this.fnClearAll();
        } else if (this.againEnter === 0) {
          this.isRight = 0;
          this.againEnter = 2;

          this.fnClearAll();
          this.fnUpdateNextWord();
        }
      },
    },
    computed: {

    },
    mounted() {
      this.fnStudyTime();
      this.fnGetAllWord();
    },
    created() {
      this.scoreTit = '智能语音 - 辩音 - ' + this.$route.query.typeName;
      this.userMsg = JSON.parse(sessionStorage.userMsg);
      // 监听ctrl点击事件，播放单词音频
      document.onkeydown = (event) => {
        if (event.keyCode === 17) { // ctrl
          this.fnAudioPalyer(this.thisWord.letter_url);
        }
      }
    }
  }
</script>

<style scoped>
  .bodyBox{
    width:100%;
    height:100%;
    background:url(../../static/img/study/space-bg.jpg) no-repeat 0 0;
    position: relative;
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
  .rightBtn>span.repeat{
    width:80px;
    font-size: 12px;
    position: relative;
    padding-left:14px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .rightBtn>span.repeat input{
    position: absolute;
    top:16px;left:-6px;
  }

  /*学习主要内容*/
  .mainCon{
    width:94%;
    margin:0 auto;
    height:450px;
  }
  .title{
    line-height: 40px;
    font-size: 16px;
    color:#999;
  }
  .correctWord{
    width:100%;
    height:60px;
    text-align: center;
    line-height: 60px;
    font-size: 50px;
    color:#999;
    position: relative;
    letter-spacing: 5px;
    margin-top:5px;
    position: relative;
  }
  .correctWord span.left{
    position: absolute;
    left: 50px;
    top: 0;
    font-size: 14px;
    cursor: pointer;
    color: coral;
  }
  .correctWord .laba{
    position: absolute;
    right:50px;
    top:0;
    width:40px;
    height:60px;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url(../../static/img/study/deep-laba1.png);
  }
  .correctWord .laba.laba1{
    background-image: url(../../static/img/study/deep-laba2.png);
  }
  .myWordBox{
    width:100%;
    /*height:100px;*/
    position: relative;
  }
  .myWordBox .isCorrent{
    position: absolute;
    left:20px;
    top:0;
    width:40px;
    height:60px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 40px 40px;
  }
  .myWordBox .isError{
    position: absolute;
    left:20px;
    top:0;
    width:40px;
    height:60px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 40px 40px;
  }
  .myWordBox .myWordLine{
    margin: 0 auto;
    width: 80%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    text-align: center;
  }
  .myWordBox .myWordLine div{
    width: 33%;
    display: inline-block;
    min-width: 26px;
    height: 42px;
    line-height: 50px;
    border-bottom: 1px solid #999;
    margin-right:4px;
    text-align: center;
    font-size:24px;
  }
  .myWordBox .myWordLine .myLetter,.myWordBox .myWordLine .isHave{
    height: 60px;
    line-height: 60px;
    color:#999;
    margin-right:0;
    border-bottom: 1px solid #333;
    width: 30%;
  }
  .myWordBox .myWordLine .isHave{
    cursor: pointer;
  }

  .myWordBox .myWordLine .oldLetter{
    height: 60px;
    line-height: 60px;
    border:none;
    color:#999;
    margin-right:0;
  }
  /*答对*/
  .myWordBox.correct .isCorrent{
    background-image: url(../../static/img/study/spell_right.png);
  }
  /*.myWordBox.correct .myWordLine span.myLetter{
            color:#06bf9d;
        }*/
  /*答错*/
  .myWordBox.error .isCorrent{
    background-image: url(../../static/img/study/spell_wrong.png);
  }
  .myWordBox.error .myWordLine span.myLetter{
    color:red;
  }
  .line{
    width:95%;
    height:1px;
    background: #999;
    margin:30px auto;
  }
  .letterBox{
    width: 100%;
    margin-top:20px;
    padding:0 30px;
    box-sizing: border-box;
    position: relative;
  }
  .letterBox .orange{
    float:left;
    color:orange;
    font-size: 18px;
    line-height: 60px;
  }
  .letterBox .randomLetter{
    float:left;
    width: 85%;
    border:1px solid #aaa;
    margin-left:15px;
    display: inline-flex;
    flex-flow: row wrap;
  }
  .letterBox .randomLetter>span{
    color:#999;
    font-size: 24px;
    line-height: 40px;
    margin: 0 10px;
    padding:0 20px;
    cursor: pointer;
  }
  .letterBox .randomLetter>span.isPitchOn{
    visibility: hidden;
  }
  .letterBox .randomLetter>span:hover{
    color:#008c72;
  }
  .letterBox .forword{
    position: absolute;
    right: -10px;top: 15px;
    width:80px;
    height:80px;
    background: url(../../static/img/study/forward.png) no-repeat center center;
    cursor: pointer;
  }
  .letterBox .forword:hover{
    opacity: .8;
  }
  /*底部信息*/
  .botInfo{
    color:#666;
    font-size:14px;
    width:40%;
    margin:0 auto;
  }
  .botInfo>span{
    margin-right:50px;
  }
</style>
