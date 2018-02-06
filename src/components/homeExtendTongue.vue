<template>
  <div class="wordWrapper">
    <!--点击基本会话-->
    <div class="testType" id="testType" style="display: none;">
      <div class="topBtn clearfix">
        <div class="typeBtn1" onclick="hideTestType('testType')">基本会话<span>▼</span></div>
      </div>
      <div class="testList clearfix">
        <ul class="leftNav">
          <li><span></span>旅游基本用语</li>
        </ul>
        <ul class="rightNav">
          <li><span></span>基本会话</li>
          <li class="tested"><span></span>启程和抵达</li>
          <li><span></span>住宿</li>
          <li><span></span>餐厅</li>
          <li><span></span>逛街</li>
          <li><span></span>观光和娱乐</li>
          <li><span></span>交通</li>
          <li><span></span>遇到麻烦</li>
        </ul>
      </div>
    </div>
    <!--点击某一个图片-->
    <div class="testInfo" id="testInfo" style="display: none;">
      <div class="topName clearfix">
        <span class="name">旅游基础用语 - 基本会话 - 分别</span>
        <span class="close" onclick="hideTestType('testInfo')">×</span>
      </div>
      <div class="conBox">
        <h3>选择训练方式，开始学习：</h3>
        <table class="typeList">
          <tr class="tHead">
            <td style="width:100px">训练方式</td>
            <td style="width:100px">句子数量</td>
            <td >学习进度</td>
            <td style="width:80px">操作</td>
          </tr>
          <tr>
            <td>跟读</td>
            <td>9句</td>
            <td class="barBox">
              <span class="totalPro"><i class="curPro"></i></span>
              <span class="percent">2%</span>
              <span class="tipNum">6个未录音</span>
            </td>
            <td><span class="study">开始</span></td>
          </tr>
          <tr>
            <td>听力理解</td>
            <td>9句</td>
            <td class="barBox">
              <span class="totalPro"><i class="curPro"></i></span>
              <span class="percent">2%</span>
              <span class="tipNum">6个未学习</span>
            </td>
            <td><span class="study">开始</span></td>
          </tr>
          <tr>
            <td>口语表达</td>
            <td>9句</td>
            <td class="barBox">
              <span class="totalPro"><i class="curPro"></i></span>
              <span class="percent">2%</span>
              <span class="tipNum">6个未学习</span>
            </td>
            <td><span class="study">开始</span></td>
          </tr>
          <tr>
            <td>闯关测试</td>
            <td>18句</td>
            <td>
              <span class="untest">未测试</span>
            </td>
            <td><span class="study">开始</span></td>
          </tr>
        </table>
      </div>
    </div>
    <!--内容顶部导航-->
    <ul class="menus clearfix">
      <li class="typeBtn" onclick="showTestType('testType')">基本会话<span>▼</span></li>
      <li class="longBox">
        <div>有效时长：00:20:30</div>
        <div>在线时长：00:20:30</div>
      </li>
      <li class="longBox">
        <div>今日学习效率</div>
        <div class="red">2%</div>
      </li>
      <li class="longBox">
        <img src="../../static/img/study/housekeeper.png" alt="" />
      </li>
    </ul>
    <!--会话列表-->
    <ul class="itemList clearfix">
      <li class="hasStudy" onclick="showTestType('testInfo')">
        <img src="../../static/img/study/unit11.jpg" alt="" />
        <div class="title">问候及初次见面</div>
      </li>
      <li onclick="showTestType('testInfo')">
        <img src="../../static/img/study/unit12.jpg" alt="" />
        <div class="title">分别</div>
      </li>
      <li onclick="showTestType('testInfo')">
        <img src="../../static/img/study/unit13.jpg" alt="" />
        <div class="title">致谢和道歉</div>
      </li>
      <li onclick="showTestType('testInfo')">
        <img src="../../static/img/study/unit14.jpg" alt="" />
        <div class="title">疑问、肯定和否定</div>
      </li>
      <li onclick="showTestType('testInfo')">
        <img src="../../static/img/study/unit15.jpg" alt="" />
        <div class="title">天气</div>
      </li>
      <li onclick="showTestType('testInfo')">
        <img src="../../static/img/study/unit16.jpg" alt="" />
        <div class="title">时间</div>
      </li>
      <li onclick="showTestType('testInfo')">
        <img src="../../static/img/study/unit17.jpg" alt="" />
        <div class="title">约会</div>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: 'homt-extend-tongue',
        components: {},
        data() {
            return {}
        },
        methods: {},
        mounted() {

        }
    }
</script>

<style scoped>
  .wordWrapper{
    width:1000px;
    min-height: 660px;
    background-color: #fff;
    margin: 20px auto;
    position:relative;
  }
  .menus{
    width: 100%;
    padding-right:30px;
    height: 80px;
    background-color: #f0f7f6;
    box-sizing: border-box;
  }
  .menus>li.typeBtn{
    float:left;
    text-align: center;
    line-height: 80px;
    font-size: 17px;
    width:180px;
    background-color: #008c72;
    color:#fff;
    cursor: pointer;
  }
  .menus>li.longBox{
    float:right;
    font-size: 14px;
    color:#999;
    margin: 10px;
  }
  .menus>li.longBox>div{
    line-height: 30px;
  }
  .menus>li.longBox>.red{
    color:#ff9797;
    text-align: center;
    font-size: 24px;
  }
  /*会话列表*/
  .itemList{
    width: 784px;
    margin: 20px auto;
  }
  .itemList>li{
    float:left;
    width: 156px;
    margin:20px;
    cursor: pointer;
  }
  .itemList>li>img{
    width: 156px;
    height:120px;
    border:6px solid #ccc;
  }
  .itemList>li.hasStudy>img{
    border:6px solid #008c72;
  }
  .itemList>li>.title{
    text-align: center;
    color:#000;
    font-size: 14px;
    margin-top:10px;
  }
  .itemList>li:hover img{
    opacity: .8;
  }
  .itemList>li:hover .title{
    color:#008c72;
  }
  /*最外层蒙版*/
  .coverBox{
    width: 100%;
    height: 100%;
    opacity: 0.7;
    z-index: 100;
    position: fixed;
    top: 0px;
    left: 0px;
    background: rgb(51, 51, 51);
  }
  /*点击基本会话*/
  .testType{
    position: absolute;
    top:0;
    left:0;
    z-index: 101;
    overflow: hidden;
  }
  .testType .topBtn{
    width:100%;
    height:80px;
    background-color: transparent;
  }
  .testType .topBtn .typeBtn1{
    float:left;
    line-height: 80px;
    background-color: #fff;
    width:180px;
    text-align: center;
    font-size: 17px;
    cursor: pointer;
  }
  .testType .topBtn .typeBtn1:hover{
    background-color: #008c72;
    color:#fff;
  }
  .testType .testList{
    width:100%;
    /*height:400px;*/
    background-color: #fff;
  }
  .testType .testList .leftNav{
    float:left;
    width: 180px;
    height: 100%;
  }
  .testType .testList .leftNav>li{
    width:100%;
    background-color: #e5edeb;
    height:40px;
    line-height: 40px;
    font-size:16px;
    text-align: center;
  }
  .testType .testList .leftNav>li:nth-child(2){
    margin: 120px 0 80px 0;
  }
  .testType .testList li>span{
    display: inline-block;
    vertical-align: middle;
    width:26px;
    height:26px;
    background-repeat: no-repeat;
    background-position: center 5px;
  }
  .testType .testList .leftNav>li>span{
    background-image: url(../../static/img/study/icon-1.png);
  }
  .testType .testList .rightNav{
    float:left;
    font-size:16px;
    border-left:1px solid #eee;
  }
  .testType .testList .rightNav>li{
    width:180px;
    height:40px;
    line-height: 40px;
    padding: 0 10px;
    border-bottom:1px solid #eee;
    box-sizing: border-box;
    cursor: pointer;
  }
  .testType .testList .rightNav>li>span{
    background-image: url(../../static/img/study/icon-4.png);
  }
  .testType .testList .rightNav>li:hover{
    background-color: #e5edeb;
  }
  .testType .testList .rightNav>li.tested>span{
    background-image: url(../../static/img/study/icon-3.png);
  }
  /*点击某涨图片*/
  .testInfo{
    position: absolute;
    width: 660px;
    height: 300px;
    top:120px;left:170px;
    background-color: #fff;
    z-index:102;
  }
  .topName{
    width:100%;
    height: 40px;
    line-height: 40px;
    background-color: #008c72;
    color:#fff;
    font-size: 16px;
    padding: 0 14px;
    box-sizing: border-box;
  }
  .topName>.name{
    float:left;
  }
  .topName>.close{
    float:right;
    padding: 0 4px;
    opacity: .3;
    cursor: pointer;
    font-size: 21px;
    font-weight: bold;
    color:#000;
    text-shadow: 0 1px 0 #FFF;
    font-family: "Helvetica, arial, sans-serif";
  }
  .topName>.close:hover{
    opacity: .7;
  }
  .conBox{
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .conBox h3{
    line-height: 60px;
    font-size: 17px;
  }
  .conBox .typeList{
    width: 100%;
    border:1px solid #ddd;
    font-size: 14px;
  }
  .conBox .typeList tr{
    width:100%;
    height: 34px;
    color:#666;
    line-height: 34px;
    border-bottom:1px solid #ddd;
  }
  .conBox .typeList tr:nth-child(2n-1){
    background-color: #eee;
  }
  .conBox .typeList tr.tHead{
    background-color: #008c72;
    color:#fff;
    height:40px;
    line-height: 40px;
    font-size: 16px;
  }
  .conBox .typeList tr td{
    border-right: 1px solid #ddd;
    text-align: center;
    box-sizing: border-box;
  }
  .conBox .typeList tr td .study{
    display: inline-block;
    width:50px;
    height:24px;
    background-color: #008c72;
    line-height: 24px;
    color:#fff;
    font-size: 12px;
    cursor: pointer;
  }
  .conBox .typeList tr td .study:hover{
    opacity: .9;
  }
  .conBox .typeList tr td.barBox{
    padding:0 6px;
    text-align: left;
    box-sizing: border-box;
  }
  .conBox .typeList tr td.barBox>.totalPro{
    display: inline-block;
    width: 160px;
    height:8px;
    background-color: #fff;
    border:1px solid #ddd;
    overflow: hidden;
    position: relative;
  }
  .conBox .typeList tr td.barBox>.totalPro>.curPro{
    position: absolute;
    top:0;
    left:0;
    width:30%;
    height: 100%;
    background-color: orange;
  }
  .conBox .typeList tr td.barBox>.tipNum{
    margin-left:64px;
  }
</style>
