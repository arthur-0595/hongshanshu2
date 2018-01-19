<template>
  <div class="functionBox" id="functionBox" v-show="showMoreBtn">
    <ul>
      <li><span></span>我的班级</li>
      <li><span></span>排行榜</li>
      <li><span></span>登录奖励</li>
      <li><span></span>抢红包</li>
      <li><span></span>友乐帮</li>
      <li><span></span>商城</li>
      <li><span></span>师生互动</li>
      <li><span></span>记忆容量测试</li>
      <li><span></span>意见反馈</li>
      <li><span></span>帮助中心</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'homg-more-btn',
    props:{
      showMoreBtn: Boolean
    },
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
  .functionBox{
    position: absolute;
    top:80px;
    right:0;
    border:1px solid #eaeaea;
    border-top:none;
    border-bottom:none;
    background-color: #fff;
    width:140px;
    box-sizing:border-box;
    z-index:4;
  }
  .functionBox>ul{
    width:100%;
  }
  .functionBox>ul>li{
    width:100%;
    height:30px;
    line-height:30px;
    color:#333;
    font-size:13px;
    text-align: left;
    border-bottom:1px solid #eaeaea;
    padding:0 8px;
    box-sizing: border-box;
    vertical-align: top;
    cursor: pointer;
  }
  .functionBox>ul>li:hover{
    background-color: #b9d3ce;
  }
  .functionBox>ul>li>span{
    display: inline-block;
    vertical-align: top;
    width:32px;
    height:30px;
    background-repeat: no-repeat;
    background-position: center 8px;
  }
  .functionBox>ul>li:nth-child(1)>span{
    background-image:url(../../static/img/more-logo9.png);
  }
  .functionBox>ul>li:nth-child(2)>span{
    background-image:url(../../static/img/more-logo1.png);
  }
  .functionBox>ul>li:nth-child(3)>span{
    background-image:url(../../static/img/more-logo3.png);
  }
  .functionBox>ul>li:nth-child(4)>span{
    background-image:url(../../static/img/more-logo2.png);
  }
  .functionBox>ul>li:nth-child(5)>span{
    background-image:url(../../static/img/more-logo4.png);
  }
  .functionBox>ul>li:nth-child(6)>span{
    background-image:url(../../static/img/more-logo6.png);
  }
  .functionBox>ul>li:nth-child(7)>span{
    background-image:url(../../static/img/more-logo10.png);
  }
  .functionBox>ul>li:nth-child(8)>span{
    background-image:url(../../static/img/more-logo11.png);
  }
  .functionBox>ul>li:nth-child(9)>span{
    background-image:url(../../static/img/more-logo7.png);
  }
  .functionBox>ul>li:nth-child(10)>span{
    background-image:url(../../static/img/more-logo8.png);
  }
</style>
