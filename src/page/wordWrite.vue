<template>
    <div id="wordWrite">
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
          <div class="deviceName">智能默写</div>
          <div class="version">牛津译林版2012（三年级起点）-三上- Unit 5</div>
          <div class="rightBtn clearfix">
            <!--<span class="help"></span>-->
            <!--<span class="skin"></span>-->
            <span class="close" @click="fnclosePage()"></span>
          </div>
        </div>
        <!--要学习的主要内容-->
        <div class="mainCon">
          <!--中文词义-->
          <div class="mean">黑色的</div>
          <!--中间输入框-->
          <div class="inputBox wrong">
            <div class="laba">对比</div>
            <input type="text" oncopy="return false;" onpaste="return false;" oncut="return false;"/>
            <div class="isRight"></div>
          </div>
          <!--记忆强度-->
          <div class="totalBar" title="记忆强度 20%">
            <div class="curBar"></div>
          </div>
          <!--单词和音标-->
          <!--错误时显示单词状态-->
          <div class="wordBox"  style="display: block;">
            <span class="word">black</span>
            <span class="soundmark">[blæk]</span>
          </div>
          <!--正确时显示音标状态-->
          <div class="wordBox" style="display: none;">
            <span class="rightWord">[blæk]</span>
          </div>
        </div>
        <!--底部内容-->
        <div class="botInfo">
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
        name: 'word-write',
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
  #wordWrite{
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
    margin: 80px 120px 0 120px;
    height:380px;
  }
  .mainCon .wordBox{
    width: 100%;
    height:60px;
    line-height:60px;
    font-family: "Arial";
    padding: 0 10px;
    box-sizing:border-box;
  }
  .mainCon .wordBox .word{
    font-size:32px;
    color:rgb(153, 153, 153);
  }
  .mainCon .wordBox .soundmark{
    font-size:16px;
    color:#959694;
  }
  .mainCon .wordBox .rightWord{
    color:#333;
    font-size:32px;
  }
  .mainCon .inputBox{
    position: relative;
    width:100%;
    height:60px;
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
    font-size:32px;
    color:#333;
  }
  .mainCon .inputBox .laba{
    position: absolute;
    top:0;
    left:-50px;
    width:60px;
    height:60px;
    line-height: 60px;
    color:#999;
    font-size:18px;
  }
  .mainCon .inputBox .isRight{
    position: absolute;
    top:0;
    right: -60px;
    width:60px;
    height:60px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size:40px 40px;
  }
  .mainCon .inputBox.right .isRight{
    background-image:url(../../static/img/study/spell_right.png);
  }
  .mainCon .inputBox.wrong .isRight{
    background-image:url(../../static/img/study/spell_wrong.png);
  }
  .mainCon .inputBox.wrong  input{
    color:red;
  }
  .mainCon .mean{
    line-height: 40px;
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
    margin:8px 0;
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
    justify-content: space-around;
    flex-wrap: nowrap;
  }
</style>
