<template>
  <div class="personCon clearfix" id="personCon" v-show="showPerson">
    <div class="perLeft">
      <img :src="userHeadImg" alt=""/>
      <h4>等级 <i class="red">{{userInfo.info[0].Grade}}</i></h4>
    </div>
    <div class="personInfo">
      <h4>{{userInfo.info[0].S_name}}</h4>
      <div class="gray">{{userInfo.info[0].S_code}}</div>
      <div class="line">智能记忆已学生词：<i class="red">{{userInfo.info[0].New_words}}</i></div>
      <div class="line">
        <span class="goldNum">总学分：<i class="red">{{userInfo.info[0].Integral}}</i></span>
        <span>今日学分：<i class="red">{{userInfo.info[0].Today_Integral}}</i></span>
      </div>
      <div class="line">距离下一个等级还差<i class="red">{{userInfo.next_level}}</i>学分哦！</div>
    </div>
    <div class="exit" @click="fnExit()"><span></span>安全退出</div>
  </div>
</template>

<script>
  export default {
    name: 'home-person-con',
    props: {
      showPerson: {
        type: Boolean
      },
      userInfo: {
        type: Object
      }
    },
    components: {},
    data() {
      return {}
    },
    methods: {
      fnExit() {
        sessionStorage.userMsg = null;
        this.$router.go(-1);
      }
    },
    mounted() {

    },
    computed: {
      userHeadImg() {
        return this.userInfo.info ? (this.$url.url2 + this.userInfo.info[0].S_picurl) : '../../static/img/portrait-1.png'
      }
    }
  }
</script>

<style scoped>
  .personCon {
    position: absolute;
    top: 80px;
    right: 0;
    width: 300px;
    border: 1px #ccc solid;
    border-top: none;
    border-right: none;
    background-color: #fff;
    z-index: 3;
    padding: 20px;
    padding-bottom: 50px;
  }

  .exit {
    position: absolute;
    right: 20px;
    bottom: 10px;
    line-height: 30px;
    font-size: 15px;
  }

  .exit:hover span {
    opacity: 1;
  }

  .exit > span {
    display: inline-block;
    vertical-align: top;
    width: 30px;
    height: 30px;
    background: url(../../static/img/exit.png) no-repeat center center;
    background-size: cover;
    margin-right: 6px;
    opacity: .8;
  }

  .personCon > .perLeft {
    float: left;
    width: 88px;
    height: 120px;
    position: relative;
  }

  .personCon > .perLeft img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
    top: 35px;
    left: 20px;
  }

  .personCon > .perLeft h4 {
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
    font-size: 12px;
  }

  .personCon > .personInfo {
    float: left;
    font-size: 12px;
    line-height: 24px;
    COLOR: #999;
  }

  .personCon .red {
    color: #e92344;
  }

  .personCon > .personInfo h4 {
    color: #666;
    font-size: 16px;
  }

  .personCon > .personInfo .goldNum {
    margin-right: 16px;
  }
</style>
