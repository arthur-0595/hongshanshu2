<template>
  <div id="home-head" class="home-head">
    <div class="top1 clearfix">
      <div class="header1 clearfix">
        <div class="left clearfix">
          <div class="topLogo"></div>
          <div class="courseBtn" id="courseBtn" @click="fncourseCenter()">课程中心<span>▼</span>
            <!--点击头部课程中心-->
            <home-course-center :showCourse="showCourse"></home-course-center>
          </div>
        </div>
        <div class="right clearfix">
          <div class="person" id="person">
            <!--点击头像-->
            <div class="personCon clearfix" id="personCon" style="display: none;">
              <div class="perLeft">
                <img src="../assets/img/portrait-1.png" alt=""/>
                <h4>等级 <i class="red">2</i></h4>
              </div>
              <div class="personInfo">
                <h4>sheep</h4>
                <div class="gray">sheep</div>
                <div class="line">智能记忆已学生词：<i class="red">15</i></div>
                <div class="line">
                  <span class="goldNum">总金币数：<i class="red">208</i></span>
                  <span>今日金币：<i class="red">5</i></span>
                </div>
                <div class="line">距离下一个等级还差<i class="red">112</i>学分哦！</div>
              </div>
              <div class="exit"><span></span>安全退出</div>
            </div>
          </div>
          <div class="abilityBtn">更多功能<span>▼</span></div>
        </div>
      </div>
    </div>
    <div class="top2">
      <div class="header2">您所在位置：智能单词-学习中心</div>
    </div>
  </div>
</template>

<script>
  import homeCourseCenter from '../components/homeCourseCenter'

  export default {
    name: 'home-head',
    components: {homeCourseCenter},
    data() {
      return {
        showCourse: false ,
      }
    },
    methods: {
      fncourseCenter(){
        this.showCourse = !this.showCourse;
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .top1 {
    width: 100%;
    height: 80px;
    background-color: #008c72;
  }

  .top1 > .header1 {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
  }

  .top1 > .header1 .left {
    float: left;
    height: 100%;
  }

  .top1 > .header1 .left .topLogo {
    float: left;
    height: 100%;
    width: 180px;
    background: url(../assets/img/logo.png) no-repeat center left;
  }

  .top1 > .header1 .left .courseBtn {
    float: left;
    height: 100%;
    width: 120px;
    text-align: center;
    margin-left: 18px;
    line-height: 80px;
    color: #fff;
    font-size: 16px;
    position: relative;
  }

  .top1 > .header1 .right {
    float: right;
    height: 100%;
  }

  .top1 > .header1 .right .person {
    float: right;
    height: 100%;
    width: 80px;
    background: url(../assets/img/portrait-1.png) no-repeat center center;
    background-size: 40px 40px;
    position: relative;
  }

  .top1 > .header1 .right .abilityBtn {
    float: right;
    height: 100%;
    width: 120px;
    text-align: center;
    margin-right: 18px;
    line-height: 80px;
    color: #fff;
    font-size: 16px;
  }

  .top1 > .header1 .right .abilityBtn:hover,
  .top1 > .header1 .right .abilityBtn.active,
  .top1 > .header1 .left .courseBtn:hover,
  .top1 > .header1 .right .courseBtn.active,
  .top1 > .header1 .right .person:hover,
  .top1 > .header1 .right .person.active {
    background-color: #fff;
    cursor: pointer;
    color: #000;
  }

  .top2 {
    width: 100%;
    height: 40px;
    background-color: #015e4d;
  }

  .top2 > .header2 {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    font-size: 16px;
    color: #fff;
    line-height: 40px;
    text-align: left;
  }

</style>
