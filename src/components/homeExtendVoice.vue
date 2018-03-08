<template>
  <div class="wordWrapper">
    <!--点击认字母-->
    <div class="testType" id="testType" v-show="showTestType">
      <div class="topBtn clearfix">
        <div class="typeBtn1" @click="fnShowTestType()">
          {{thisTypeName}}<span>▼</span>
        </div>
      </div>
      <div class="testList clearfix" v-loading="loading">
        <ul class="leftNav">
          <li><span></span>字母拼读</li>
        </ul>
        <ul class="rightNav">
          <li class="tested" v-for="item in leftNav"
            @click="fnUpdateThisType(item)">
            <span></span>{{item.name}}
          </li>
          <!--<li class="tested"><span></span>单个字母</li>-->
        </ul>
      </div>
    </div>
    <!--内容顶部导航-->
    <ul class="menus clearfix" >
      <li class="typeBtn" @click="fnShowTestType()">
        {{thisTypeName}}<span>▼</span>
      </li>
      <!--
      <li class="typeBtn">字母/单词本</li>
      <li class="typeBtn">拼读龙虎榜</li>
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
      -->
    </ul>
    <!--闯关列表-->
    <ul class="passPoint clearfix" >
      <!--<li class="beforeStudy">-->
        <!--<h3>学前测试</h3>-->
        <!--<div class="testBtn" style="display:block">开始测试</div>-->
        <!--&lt;!&ndash;<div class="score" style="display:block">90分</div>&ndash;&gt;-->
      <!--</li>-->
      <!--已经测试了的 -->
      <li class="unlocked "
          v-for="item in studyList"
          :class="{
            beforeStudy: item.type==1,
            afterStudy: item.type==3
            }">
        <!--hasTest-->
        <h3 v-if="item.type==1">学前测试</h3>
        <div  v-if="item.type==1"
              class="testBtn"
              v-show="true">开始测试</div>
        <div v-if="item.type==1" class="score" v-show="false">90分</div>

        <h4 v-if="item.type==2">{{item.v_name}}</h4>
        <div v-if="item.type==2" class="locked"></div>
        <div v-if="item.type==2" class="botLine clearfix">
          <span>配对</span>
          <span>听写</span>
          <span>闯关</span>
        </div>
        <h3 v-if="item.type==3">学后测试</h3>
        <div v-if="item.type==3" class="locked"></div>
      </li>
      <!--没锁,可以点击学习-->
      <!--<li class="">-->
        <!--<h4>第二关</h4>-->
        <!--<div class="locked"></div>-->
        <!--<div class="botLine clearfix">-->
          <!--<span>配对</span>-->
          <!--<span>听写</span>-->
          <!--<span>闯关</span>-->
        <!--</div>-->
      <!--</li>-->
      <li class="afterStudy">
        <h3>学后测试111</h3>
        <div class="locked"></div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'home-extend-voice',
    components: {},
    data() {
      return {
        showTestType: false, // 是否显示左侧导航列表
        userMsg: {},
        unitId: 0,
        thisTypeName: '认字母', // 当前类别名称
        loading: false, // loading组件控制开关
        leftNav: [], // 左侧导航列表
        studyList: [], // 右侧学习列表
      }
    },
    methods: {
      // 切换显示左侧导航列表
      fnShowTestType() {
        this.showTestType = this.showTestType ? false : true
        if (this.showTestType) {
          this.fnGetLeftNav();
        }
      },
      // 更新左侧导航显示列表
      fnGetLeftNav() {
        this.loading = true;
        this.$ajax({
          method: 'GET',
          url: this.$url.url1,
          params: {
            method: 'getvoicetype'
          }
        }).then(res => {
          this.loading = false;
          let data = res.data;
          // console.log(data);
          this.leftNav = data[0].type;
        })
      },
      // 更新当前类别
      fnUpdateThisType(obj_) {
        this.thisTypeName = obj_.name;
        // 加载对应类别的学习列表
        this.fnGetStudyList(obj_);
        this.fnShowTestType();
      },
      // 加载对应类别的学习列表
      fnGetStudyList(obj_) {
        this.loading = true;
        this.$ajax({
          method: 'GET',
          url: this.$url.url1,
          params: {
            method: 'getvoice',
            user_id: this.userMsg.ID,
            type_id: obj_.id
          }
        }).then(res => {
          let data = res.data;
          console.log(data);
          this.studyList = data;
        })
      },
    },
    computed: {

    },
    mounted() {

    },
    created() {
      this.userMsg = JSON.parse(sessionStorage.userMsg);
      this.unitId = sessionStorage.unit_id;
    }
  }
</script>

<style scoped>
  .wordWrapper {
    width: 1000px;
    min-height: 640px;
    background-color: #fff;
    margin: 20px auto;
    position: relative;
  }

  .menus {
    width: 100%;
    padding-right: 30px;
    height: 80px;
    background-color: #f0f7f6;
    box-sizing: border-box;
  }

  .menus > li.typeBtn {
    float: left;
    color: #008c72;
    width: 140px;
    text-align: center;
    line-height: 80px;
    font-size: 17px;
    cursor: pointer;
  }

  .menus > li.typeBtn:first-child {
    width: 180px;
    background-color: #008c72;
    color: #fff;
  }

  .menus > li.longBox {
    float: right;
    font-size: 14px;
    color: #999;
    margin: 10px;
  }

  .menus > li.longBox > div {
    line-height: 30px;
  }

  .menus > li.longBox > .red {
    color: #ff9797;
    text-align: center;
    font-size: 24px;
  }

  /*闯关列表*/
  .passPoint {
    padding: 10px;
    box-sizing: border-box;
  }

  .passPoint > li {
    float: left;
    width: 220px;
    height: 120px;
    margin-left: 20px;
    margin-top: 20px;
    background-color: #eee;
    border: 1px solid #d9eeea;
    box-sizing: border-box;
    position: relative;
  }

  .passPoint > li.beforeStudy {
    background-color: #fff;
    box-sizing: border-box;
  }

  .passPoint > li.beforeStudy .score {
    color: #666;
    font-size: 24px;
    text-align: center;
    line-height: 38px;
  }

  .passPoint > li h3,
  .passPoint > li h4 {
    text-align: center;
    font-size: 15px;
    line-height: 40px;
    color: #666;
  }

  .passPoint > li h3 {
    line-height: 50px;
    font-size: 16px;
  }

  .passPoint > li .locked {
    width: 100%;
    height: 38px;
    color: #008c72;
    font-size: 24px;
    line-height: 38px;
    text-align: center;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url(../../static/img/study/locked.png);
  }

  .passPoint > li.afterStudy .locked {
    height: 50px;
  }

  .passPoint > li .botLine {
    width: 83%;
    margin: 8px auto;
  }

  .passPoint > li .botLine > span {
    float: left;
    width: 52px;
    background-color: #a2d0c8;
    line-height: 26px;
    color: #fff;
    text-align: center;
    font-size: 14px;
  }

  .passPoint > li .botLine > span:nth-child(2) {
    margin: 0 12px;
  }

  .passPoint > li.beforeStudy .testBtn {
    width: 100px;
    height: 36px;
    margin: 20px auto 0;
    background-color: #f39800;
    color: #fff;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
  }

  .passPoint > li.beforeStudy .testBtn:hover {
    background-color: #fba517;
  }

  /*可以单击学习，没锁*/
  .passPoint > li.unlocked {
    background-color: #fff;
  }

  .passPoint > li.unlocked .locked {
    background-image: url(../../static/img/study/quan.png);
  }

  .passPoint > li.unlocked .botLine > span {
    background-color: #008c72;
    cursor: pointer;
  }

  .passPoint > li.unlocked .botLine > span:hover {
    background-color: #017862;
  }

  /*已经学习了，有测试分数*/
  .passPoint > li.hasTest .locked {
    background-image: none;
  }

  .passPoint > li.hasTest::before {
    content: '';
    display: block;
    position: absolute;
    top: 10px;
    left: 10px;
    width: 24px;
    height: 20px;
    background: url(../../static/img/study/dui.png) no-repeat 0 0;
  }

  /*最外层蒙版*/
  .coverBox {
    width: 100%;
    height: 100%;
    opacity: 0.7;
    z-index: 100;
    position: fixed;
    top: 0px;
    left: 0px;
    background: rgb(51, 51, 51);
  }

  /*点击认字母*/
  .testType {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    overflow: hidden;
  }

  .testType .topBtn {
    width: 100%;
    height: 80px;
    background-color: transparent;
  }

  .testType .topBtn .typeBtn1 {
    float: left;
    line-height: 80px;
    background-color: #fff;
    width: 180px;
    text-align: center;
    font-size: 17px;
    cursor: pointer;
  }

  .testType .topBtn .typeBtn1:hover {
    background-color: #008c72;
    color: #fff;
  }

  .testType .testList {
    width: 100%;
    /*height:400px;*/
    background-color: #fff;
  }

  .testType .testList .leftNav {
    float: left;
    width: 180px;
    height: 100%;
  }

  .testType .testList .leftNav > li {
    width: 100%;
    background-color: #e5edeb;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
  }

  .testType .testList .leftNav > li:nth-child(2) {
    margin: 120px 0 80px 0;
  }

  .testType .testList li > span {
    display: inline-block;
    vertical-align: middle;
    width: 26px;
    height: 26px;
    background-repeat: no-repeat;
    background-position: center 5px;
  }

  .testType .testList .leftNav > li > span {
    background-image: url(../../static/img/study/icon-1.png);
  }

  .testType .testList .rightNav {
    float: left;
    font-size: 16px;
    border-left: 1px solid #eee;
  }

  .testType .testList .rightNav > li {
    width: 180px;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    cursor: pointer;
  }

  .testType .testList .rightNav > li > span {
    background-image: url(../../static/img/study/icon-4.png);
  }

  .testType .testList .rightNav > li:hover {
    background-color: #e5edeb;
  }

  .testType .testList .rightNav > li.tested > span {
    background-image: url(../../static/img/study/icon-3.png);
  }
</style>
