<template>
    <div id="sentenceListen">
      <!--最顶部信息-->
      <div class="topInfo">
        <span>今日有效：00:20:40</span>
        <span>今日在线：00:34:40</span>
        <span>学习效率：13%</span>
      </div>
      <!--中间-->
      <div class="centerBox">
        <!--学习的单元名字-->
        <div class="nameBox">
          <div class="deviceName">例句听力</div>
          <div class="version">牛津译林版2012（三年级起点）-三上- Unit 5</div>
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
            <div class="correctSentence" style="visibility: hidden;">Would you like a pie?</div>
            <div class="mySentence clearfix" >
              <!--一开始要写单词的格子 upWord表示填写了的单词  red表示填写错误的单词-->
              <ul class="lineBox clearfix" style="display: block;">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li class="punctuation">?</li>
                <!--<li v-for="(wordObj,index) in upWordSentenceArr" :class="[{punctuation:wordObj.isFuhao},{upWord:wordObj.showWord}]">
                                  <span  v-show="wordObj.isFuhao || wordObj.showWord">{{wordObj.name}}</span>
                              </li>-->
              </ul>
              <span class="brush" style="display: block;"></span>
              <span class="laba"></span>
            </div>
          </div>
          <!--记忆强度-->
          <div class="totalBar">
            <span class="curBar"></span>
          </div>
          <!--底部盒子内容-->
          <div class="bottomBox">
            <!--提示盒子-->
            <div class="tipBox" style="display:none"><span></span>请仔细听！</div>
            <div class="wordsBox clearfix" >
              <!--一开始打乱的单词-->
              <ul class="randomWords clearfix" style="display:block">
                <li>Would</li>
                <li>you</li>
                <li>like</li>
                <li>a</li>
                <li>pie</li>
                <!--<li v-for="(rWord,index) in randomSentenceArr" :style="{visibility:rWord.isShow}" @click="clickBot(rWord,index)">{{rWord.name}}</li>-->
              </ul>
              <!--答完显示中文，无论对错-->
              <div class="meaning" style="display:none">你想要来一个馅饼吗?</div>
              <!--开始是哭脸，答对下一题 forword 答错 练习 practice-->
              <div class="face forword"></div>
              <div class="overtime" style="display: none;"><span></span>超时了，再快点儿！</div>
            </div>
          </div>
        </div>
        <!--底部内容-->
        <div class="botInfo">
          <span>倒计时： 20</span>
          <!--<span>引擎档位： 6</span>-->
          <span>学习时长： 00:00:30</span>
          <span>本次学习 [ 生词： 0个　熟词：2个　复习：0个 ]</span>
          <span>学习进度：8/12</span>
        </div>
        <audio src="" id="audio"></audio>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'sentence-listen',
        components: {},
        data() {
            return {}
        },
        methods: {
          fnclosePage() {
            this.$router.go(-1);
          }
        },
        mounted() {

        }
    }
</script>

<style scoped>
  #sentenceListen{
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
    margin: 40px 60px 0 60px;
    height:410px;
  }
  .mainCon .sentenceBox{
    width:100%;

  }
  .mainCon .sentenceBox .correctSentence{
    font-size:20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-height: 35px;
    margin-right:30px;
  }
  .mainCon .sentenceBox .correctSentence.practiceColor{
    color:#00bba2;
  }
  .mainCon .sentenceBox  .mySentence{
    width:100%;
    margin-top:8px;
  }
  .mainCon .sentenceBox  .mySentence .lineBox{
    max-width:540px;
    float:left;
    overflow: hidden;
  }
  .mainCon .sentenceBox  .mySentence .lineBox>li{
    float:left;
    min-width:20px;
    height:34px;
    border-bottom:1px solid #a6a6a6;
    margin-right:4px;
    box-sizing: border-box;
  }
  .mainCon .sentenceBox  .mySentence .lineBox>li.upWord{
    font-size:20px;
    border:none;
    height:48px;
    line-height: 48px;
    color:#000;
  }
  .mainCon .sentenceBox  .mySentence .lineBox>li.upWord.red{
    color:red;
  }
  .mainCon .sentenceBox  .mySentence .lineBox>li.punctuation{
    border:none;
    text-align: center;
    line-height: 44px;
    color: #333;
    font-size: 18px;
    margin:0;
  }
  .mainCon .sentenceBox  .mySentence .brush{
    width:30px;
    height:34px;
    background:url(../../static/img/study/brush.png) no-repeat center bottom;
    float:left;
  }
  .mainCon .sentenceBox  .mySentence .brush:hover{
    opacity: .8;
    cursor: pointer;
  }
  .mainCon .sentenceBox  .mySentence .laba{
    width:30px;
    height:34px;
    background-repeat: no-repeat;
    background-position:center bottom;
    background-image:url(../../static/img/study/deep-laba1.png);
    float:right;
    cursor: pointer;
  }
  .mainCon .sentenceBox  .mySentence .laba:hover{
    opacity: .8;
  }
  .mainCon .sentenceBox  .mySentence .laba.laba1{
    background-image:url(../../static/img/study/deep-laba2.png);
  }
  /*记忆强度*/
  .totalBar{
    width:100%;
    height:6px;
    background-color: #ccc;
    margin:34px 0;
    position: relative;
  }
  .totalBar .curBar{
    position: absolute;
    top:0;left:0;
    width: 10%;
    height:6px;
    background: #0a724a;
  }
  /*中间内容底部*/
  .bottomBox{
    width:100%;
    position: relative;
  }
  .bottomBox .tipBox{
    position: absolute;
    top:50px;
    width:100%;
    text-align:center;
    line-height: 42px;
    color:#8ac22b;
    font-size:18px;
  }
  .bottomBox .tipBox>span{
    display: inline-block;
    vertical-align: top;
    width:40px;
    height:40px;
    background:url(../../static/img/study/mute-light.png) no-repeat center center;
  }
  .bottomBox .wordsBox{
    width:100%;
  }
  .bottomBox .wordsBox .randomWords{
    max-width:664px;
    height: 114px;
    float:left;
    overflow: hidden;
  }
  .bottomBox .wordsBox .face{
    float:right;
    width:80px;
    height:52px;
    background-repeat: no-repeat;
    background-position:center right;
    background-image:url(../../static/img/study/cry.png);
    background-size:52px 52px;
  }
  .bottomBox .wordsBox .face.forword{
    background-image:url(../../static/img/study/arrow.png);
  }
  .bottomBox .wordsBox .face.forword:hover{
    opacity: .8;
    cursor: pointer;
  }
  .bottomBox .wordsBox .face.forword.practice{
    background-image:url(../../static/img/study/practise.png);
  }
  .bottomBox .wordsBox .randomWords>li{
    float:left;
    padding:13px;
    border:1px solid #d2d2d2;
    margin-right:5px;
    margin-bottom:5px;
    font-size:20px;
    color:#000;
  }
  .bottomBox .wordsBox .randomWords>li:hover{
    color: #009966;
    border: 1px solid #008c72;
    cursor: pointer;
  }
  .bottomBox .wordsBox  .meaning{
    max-width:664px;
    height: 80px;
    line-height: 40px;
    font-size:18px;
    float:left;
    overflow: hidden;
  }
  .bottomBox .wordsBox .overtime{
    position: absolute;
    top: 80px;
    width: 100%;
    text-align: center;
    color:#8ac22b;
    font-size: 18px;
    line-height: 40px;
  }
  .bottomBox .wordsBox .overtime>span{
    display: inline-block;
    vertical-align: top;
    width:50px;
    height:40px;
    background:url(../../static/img/study/rain-light.png) no-repeat center center;
  }
  /*底部信息*/
  .botInfo{
    color:#666;
    font-size:14px;
    display: flex;
    justify-content: space-around;
    flex-wrap: nowrap;
  }
</style>
