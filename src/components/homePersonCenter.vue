<template>
  <div class="myInfoWrapper" id="home-person-center">
    <div class="myInfoBox">
      <div class="topTip">亲爱的同学：您好！为了给您提供更好的学习服务，请您先完善个人信息。</div>
      <!--<div class="infoBar">-->
      <!--infoImage 默认填写的信息 infoImage2 选填细信息 infoImage3 领金币-->
      <!--<div class="infoImage infoImage2"></div>-->
      <!--<ul class="markList clearfix">-->
      <!--<li class="left">必填信息</li>-->
      <!--<li class="center">选填信息</li>-->
      <!--<li class="right">金币已领</li>-->
      <!--</ul>-->
      <!--</div>-->
      <!--账号信息列表-->
      <ul class="infoList">
        <li>
          <div class="nameBox clearfix">
            <span class="name">账号信息/Account information</span>
            <!--<span class="showMoreBtn"></span>-->
          </div>
          <ul class="itemList">
            <li><span>账号ID： </span> 97ty45307</li>
            <li><span>账号有效期：</span> 2018-02-03</li>
            <li><span>积分：</span> 4</li>
            <li><span>积分等级：</span> 55</li>
            <li><span>今日积分：</span> 4</li>
          </ul>
        </li>
        <li>
          <div class="nameBox clearfix">
            <span class="name">修改密码/Password management</span>
            <!--<span class="showMoreBtn"></span>-->
          </div>
          <ul class="itemList">
            <li>
              <span>原密码：</span>
              <input type="password"/>
              <span class="red" style="display: none;">原密码有误</span>
            </li>
            <li>
              <span>新密码：</span>
              <input type="password"/>
              <span class="red" style="display: none;">密码至少6位</span>
            </li>
            <li>
              <span>重复新密码：</span>
              <input type="password"/>
              <span class="red" style="display: none;">两次密码不一致</span>
            </li>
          </ul>
        </li>
        <li>
          <div class="nameBox clearfix">
            <span class="name">选填信息/Optional information</span>
            <!--<span class="showMoreBtn"></span>-->
          </div>
          <ul class="itemList">
            <li class="portraitLine">
              <span>头像：</span>
              <img src="../../static/img/portrait-1.png" alt="" onclick="showImgbox('imgList')"/>
              <span class="iconTip">(点击更换头像)</span>
              <div class="imgList" id="imgList" style="display: none;">
                <img src="../../static/img/me/1.png" alt=""/>
                <img src="../../static/img/me/2.png" alt=""/>
                <img src="../../static/img/me/3.png" alt=""/>
                <img src="../../static/img/me/4.png" alt=""/>
                <img src="../../static/img/me/5.png" alt=""/>
                <img src="../../static/img/me/6.png" alt=""/>
                <img src="../../static/img/me/7.png" alt=""/>
                <img src="../../static/img/me/8.png" alt=""/>
                <img src="../../static/img/me/1.png" alt=""/>
                <img src="../../static/img/me/2.png" alt=""/>
                <img src="../../static/img/me/3.png" alt=""/>
                <img src="../../static/img/me/4.png" alt=""/>
                <img src="../../static/img/me/5.png" alt=""/>
                <img src="../../static/img/me/6.png" alt=""/>
                <img src="../../static/img/me/7.png" alt=""/>
              </div>
            </li>
            <li>
              <span>昵称：</span>
              <input type="text"/>
            </li>
            <li>
              <span>性别：</span>
              <select name="" id="">
                <option value="" selected="selected">男</option>
                <option value="">女</option>
              </select>
            </li>
            <li>
              <span>家长手机：</span>
              <input type="tel" maxlength="14"/>
            </li>
            <li>
              <span>QQ：</span>
              <input type="text" maxlength="14"/>
            </li>
            <li>
              <span>邮箱：</span>
              <input type="text"/>
            </li>
            <li>
              <span>地址：</span>
              <input type="text"/>
            </li>
          </ul>
        </li>
      </ul>
      <div class="save">保存</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home-person-center',
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
  body {
    background-color: #efefef;
  }

  .myInfoWrapper {
    width: 1000px;
    background-color: #fff;
    margin: 20px auto;
    padding: 10px;
    box-sizing: border-box;
  }

  .myInfoWrapper .myInfoBox {
    width: 100%;
    min-height: 640px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  /*版本名字*/
  .topTip {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #fff;
    background-color: #008c72;
    padding-left: 16px;
    box-sizing: border-box;
  }

  /**/
  .infoBar {
    width: 547px;
    height: 60px;
    margin: 20px auto 0;
    /*border:1px solid red;*/
  }

  .infoBar .infoImage {
    width: 527px;
    height: 33px;
    margin: 0 auto;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: url(../../static/img/study/information-1.png);
  }

  .infoBar .infoImage.infoImage2 {
    background-image: url(../../static/img/study/information-2.png);
  }

  .infoBar .infoImage.infoImage3 {
    background-image: url(../../static/img/study/information-3.png);
  }

  .infoBar .markList {
    width: 100%;
    line-height: 28px;
  }

  .infoBar .markList > li {
    width: 33.33%;
    float: left;
    font-size: 14px;
    color: #666;
  }

  .infoBar .markList > li.left {
    text-align: left;
  }

  .infoBar .markList > li.center {
    text-align: center;
  }

  .infoBar .markList > li.right {
    text-align: right;
  }

  /*各类信息*/
  .infoList {
    width: 730px;
    margin: 0 auto;
  }

  .infoList > li {
    width: 100%;
    border: 1px solid #ccc;
    box-sizing: border-box;
    margin-top: 20px;
    position: relative;
  }

  .infoList > li > .nameBox {
    line-height: 30px;
    background-color: #008c72;
    color: #fff;
    font-size: 16px;
    padding: 0 16px;
    box-sizing: border-box;
  }

  .infoList > li > .nameBox .name {
    float: left;
  }

  .infoList > li > .nameBox .showMoreBtn {
    float: right;
    width: 30px;
    height: 30px;
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url(../../static/img/study/up.png);
    opacity: .8;
  }

  .infoList > li .showMoreBtn:hover {
    opacity: 1;
  }

  .infoList > li .showMoreBtn.showMoreBtn1 {
    background-image: url(../../static/img/study/down.png);
  }

  .infoList > li .itemList {
    padding: 50px 70px;
    box-sizing: border-box;
  }

  .infoList > li .itemList > li {
    line-height: 32px;
    margin: 10px 0;
    color: #666;
  }

  .infoList > li .itemList > li.portraitLine {
    height: 40px;
    line-height: 40px;
    position: relative;
  }

  .infoList > li .itemList > li > span {
    display: inline-block;
    vertical-align: top;
    width: 100px;
    text-align: right;
  }

  .infoList > li .itemList > li > span.red {
    color: red;
    font-size: 12px;
    text-align: left;
    margin-left: 6px;
  }

  .infoList > li .itemList > li.portraitLine img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }

  .infoList > li .itemList > li.portraitLine img:hover {
    opacity: .8;
  }

  .infoList > li .itemList > li.portraitLine .imgList {
    position: absolute;
    z-index: 2;
    width: 393px;
    height: 251px;
    top: 42px;
    left: 104px;
    border: 1px solid #ccc;
    background: #fff;
    overflow-y: auto;
  }

  .infoList > li .itemList > li.portraitLine .imgList img {
    margin: 6px;
  }

  .infoList > li .itemList > li > .iconTip {
    font-size: 14px;
    color: #999;
    margin-left: 14px;
    text-align: left;
  }

  .infoList > li .itemList > li input {
    -webkit-appearance: none;
    outline: none;
    border: 1px solid #ddd;
    width: 340px;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    font-size: 16px;
  }

  .infoList > li .itemList > li select {
    width: 58px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    padding: 0 6px;
    border: 1px solid #ddd;
  }

  .infoList > li .itemList > li select:focus,
  .infoList > li .itemList > li input:focus {
    border: 1px solid #02cca6;
    background-color: #dcf1e3;
    box-shadow: 0 0 12px #8c8c8c;
  }

  .save {
    width: 100px;
    background-color: darkorange;
    height: 40px;
    line-height: 40px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    margin: 20px auto;
  }

  .save:hover {
    background-color: orange;
  }
</style>
