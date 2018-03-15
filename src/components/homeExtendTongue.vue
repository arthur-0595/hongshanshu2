<template>
  <div class="wordWrapper">
    <!--点击基本会话-->
    <div class="testType" id="testType" >
      <div class="topBtn clearfix" >
        <div class="typeBtn1" @click='showSpokeType' >{{selectedSpokeType.spoke_name}}<span v-if="!showType">▼</span><span v-else>▲</span></div>
      </div>
      <div class="testList clearfix" v-if="showType">
        <ul class="leftNav">
          <li><span></span>旅游基本用语</li>
        </ul>
        <ul class="rightNav">
          <li class="tested" v-for="item in spokeType" @click="selectSpokeTypeItem(item)"><span></span>{{item.spoke_name}}</li>
        </ul>
      </div>
    </div>
    <!--点击某一个图片-->
    <div class="testInfo" id="testInfo" v-if="showTestType">
      <div class="topName clearfix">
        <span class="name">旅游基础用语 - {{selectedSpokeType.spoke_name}} - {{selectedSpokeTypeItem.spoke_name}}</span>
        <span class="close" @click="showTestType = !showTestType">×</span>
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
            <td>{{testType.total}}句</td>
            <td class="barBox">
              <span class="totalPro"><i class="curPro" :style="{width: testType.repeatnumber / testType.total + "%"}"></i></span>
              <span class="percent">{{testType.repeatnumber / testType.total}} %</span>
              <span class="tipNum">{{testType.total - testType.repeatnumber}} 个未录音</span>
            </td>
            <td><span class="study" @click="toSpokeRepeat">开始</span></td>
          </tr>
          <tr>
            <td>听力理解</td>
            <td>{{testType.total}}句</td>
            <td class="barBox">
              <span class="totalPro"><i class="curPro" :style="{width: (testType.listennumber / testType.total)*100 + '%'}"></i></span>
              <span class="percent">{{Math.ceil((testType.listennumber / testType.total)*100)}} %</span>
              <span class="tipNum">{{testType.total - testType.listennumber}} 个未学习</span>
            </td>
            <td><span class="study" @click="toSpokeListen">开始</span></td>
          </tr>
          <tr>
            <td>口语表达</td>
            <td>{{testType.total}}句</td>
            <td class="barBox">
              <span class="totalPro"><i class="curPro" :style="{width: (testType.oralnumber / testType.total)*100 + '%'}"></i></span>
              <span class="percent">{{Math.ceil((testType.oralnumber / testType.total)*100)}} %</span>
              <span class="tipNum">{{testType.total - testType.oralnumber}} 个未学习</span>
            </td>
            <td><span class="study" @click="toSpokeExpress">开始</span></td>
          </tr>
          <tr>
            <td>闯关测试</td>
            <td>{{testData.length}}句</td>
            <td>
              <span class="untest">未测试</span>
            </td>
            <td><span class="study" @click="toSpokeTest">开始</span></td>
          </tr>
        </table>
      </div>
    </div>
    <!--内容顶部导航-->
    <ul class="menus clearfix">
      <li class="typeBtn" >基本会话<span>▼</span></li>
     <!--  <li class="longBox">
        <div>有效时长：00:20:30</div>
        <div>在线时长：00:20:30</div>
      </li>
      <li class="longBox">
        <div>今日学习效率</div>
        <div class="red">2%</div>
      </li>
      <li class="longBox">
        <img src="../../static/img/study/housekeeper.png" alt="" />
      </li> -->
    </ul>
    <!--会话列表-->
    <ul class="itemList clearfix">
      <li class="hasStudy" v-for="item in spokeTypeItem" @click="selectTestType(item)">
        <!-- <img src="../../static/img/study/unit11.jpg" alt="" /> -->
        <img :src="imgUrl + item.spoke_pic" alt="" />
        <div class="title">{{item.spoke_name}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
    import axios from 'axios'
    import url from '@/api/url'
    export default {
        name: 'homt-extend-tongue',
        components: {},
        data() {
            return {
              userId: 1,
              showType: false,
              spokeType: [],
              spokeTypeItem: [],
              selectedSpokeType: {
                spoke_name: '基本会话'
              },
              selectedSpokeTypeItem: {},
              testType: {
                "user_id": 1, 
                "type_id": 10, 
                "total": 100, 
                "repeatnumber": 0, 
                "listennumber": 0, 
                "oralnumber": 0, 
                "score": "未测试"
              },
              showTestType: false,
              testData: [],
              imgUrl: this.$url.url2 //会话列表类别图片地址
            }
        },
        methods: {

          //获取口语类别
          _getSpokeType(fId) {
            // var newUrl = 'http://192.168.2.127:8091/Areas/Api/Index.ashx'
            var newUrl = this.$url.url2 + '/Areas/Api/Index.ashx'
            axios.get(newUrl, {
              params: {
                method: 'GetSpokeType',
                f_id: fId
              }
            }).then((res) => {
              // console.log(res.data)
              this.spokeType = res.data
            })
          },

          //获取口语小类别
          _getSpokeTypeItem(fId) {
            // var newUrl = 'http://192.168.2.127:8091/Areas/Api/Index.ashx'
             var newUrl =  this.$url.url2 + '/Areas/Api/Index.ashx'
            axios.get(newUrl, {
              params: {
                method: 'GetSpokeType',
                f_id: fId
              }
            }).then((res) => {
              this.spokeTypeItem = res.data
            })
          },
          //选择训练方式
           _getTestType(typeId) {
            // var newUrl = 'http://192.168.2.127:8091/Areas/Api/Index.ashx';
            var newUrl =  this.$url.url2 + '/Areas/Api/Index.ashx'
            var userId = this.userId;
            axios.get(newUrl, {
              params: {
                method: 'GetSpokenUser',
                user_id: userId,
                type_id: typeId
              }
            }).then((res) => {
              this.testType = res.data[0]
            })
          },
          //获取闯关数据
          _getTestData(typeId) {
            // var newUrl = 'http://192.168.2.127:8091/Areas/Api/Index.ashx'
             var newUrl =  this.$url.url2 + '/Areas/Api/Index.ashx'
            axios.get(newUrl, {
              params: {
                method: 'GetSpokenTest',
                type_id: typeId
              }
            }).then((res) => {
              // console.log(res.data)
              this.testData = res.data
            })
          },
          //本地存储选择的口语大，小类别
          _storageType() {
            //选择的口语大类别
            var selectedSpokeType = JSON.stringify(this.selectedSpokeType);
            sessionStorage.setItem('selectedSpokeType', selectedSpokeType);
            //选择的口语小类别
            var selectedSpokeTypeItem = JSON.stringify(this.selectedSpokeTypeItem);
            sessionStorage.setItem('selectedSpokeTypeItem', selectedSpokeTypeItem);
          },

          //显示隐藏左侧类别选项
          showSpokeType() {
            this.showType = !this.showType
          },
          selectSpokeTypeItem(item) {
            var id = item.id;
            this.selectedSpokeType = item;
            // console.log(id)
            this.showType = !this.showType
            this._getSpokeTypeItem(id)
          },
          selectTestType(item) {
            var typeId = item.id;
            // console.log(typeId)
            this.selectedSpokeTypeItem = item;
            this._getTestType(typeId)
            this._getTestData(typeId)
            this.showTestType = !this.showTestType
          },
          toSpokeRepeat() {
            this.$router.replace('/spokeRepeat');
            var strData = JSON.stringify(this.testData);
            sessionStorage.setItem('testSpokeData', strData);
            this._storageType()
            
          },
          toSpokeListen() {
            this.$router.replace('/spokeListen');
           this._storageType()
          },
          toSpokeExpress() {
            this.$router.replace('/spokeExpress');
           this._storageType()
          },
          toSpokeTest() {
            this.$router.replace('/spokeTest');
            this._storageType()
          }
        },
        created() {
          // this.spokeTypeItem = this._getSpokeType(2)
          // this.spokeType = this._getSpokeType(1)
          // this.userId = JSON.parse(sessionStorage.getItem('userMsg')).ID
          // console.log(this.userId)
          this._getSpokeType(1)
          this._getSpokeTypeItem(2)
        },
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
    color: #fff;
    background-color: #008c72;
    width:180px;
    text-align: center;
    font-size: 17px;
    cursor: pointer;
  }
  .testType .topBtn .typeBtn1.active{
   /* background-color: #008c72;
    color:#fff;*/
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
    line-height: 45px;
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
    margin-left: 30px;
  }
</style>
