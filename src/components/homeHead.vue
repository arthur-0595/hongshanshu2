<template>
  <div id="home-head" class="home-head">
    <div class="top1 clearfix">
      <div class="header1 clearfix">
        <div class="left clearfix">
          <div class="topLogo"></div>
          <div class="courseBtn" id="courseBtn"
               :class="{clickthis:showCourse}"
               @click="fncourseCenter(1)">课程中心<span>▼</span>
            <!--点击头部课程中心-->
            <home-course-center :showCourse="showCourse"></home-course-center>
          </div>
        </div>
        <div class="right clearfix">
          <div class="person" id="person"
               :class="{clickPerson:showPerson}"
               @click="fncourseCenter(2)">
            <img :src="personImg" alt=""/>
            <!--点击头像-->
            <home-person-con :showPerson="showPerson" :userInfo="userInfo"></home-person-con>
          </div>
          <div class="abilityBtn">更多功能<span>▼</span></div>
        </div>
      </div>
    </div>
    <div class="top2">
      <div class="header2">
        您所在位置：智能单词-学习中心
        <div class="toStudyCenter">返回学习中心</div>
      </div>
    </div>
  </div>
</template>

<script>
  import homeCourseCenter from '../components/homeCourseCenter'
  import homePersonCon from '../components/homePersonCon'

  export default {
    name: 'home-head',
    components: {homeCourseCenter , homePersonCon},
    data() {
      return {
        showCourse: false ,
        showPerson: false ,
        userInfo: {
          info: [
            {
              S_sex: 0,
              ID: 1,
              S_code: "yy",
              S_name: "尹彦",
              S_picurl: "/images/默认头像.png",
              Remark: "",
              Today_Integral: 0,
              Integral: 0,
              Grade: 1,
              Learn_words: 0,
              New_words: 0,
              CreateTime: "2018-01-17T08:59:41",
              S_phone: "11111111111",
              S_qq: null,
              S_email: null,
              S_address: null,
              S_longtime: "2019-01-12T10:23:15"
            }
          ],
          next_level: 128
        },
      }
    },
    methods: {
      fncourseCenter(type_){
        if(type_ === 1){
          this.showCourse = !this.showCourse;
        }else if(type_ === 2){
          this.fnGetUserInfo();
          this.showPerson = !this.showPerson;
        }
      },
      fnGetUserInfo(){
        //获取用户ID
        let userMsg = JSON.parse(sessionStorage.userMsg);
        if(!userMsg){
          return
        }
        this.$ajax({
          method: 'GET',
          url: this.$url.url1,
          params: {
            method: 'UserInte',
            user_id: userMsg.ID
          }
        }).then(res => {
          // console.log( JSON.stringify(res.data) );
          this.userInfo = res.data;
          sessionStorage.userMsg = JSON.stringify(res.data.info[0]);
        })
      }
    },
    mounted() {
    },
    created(){
      this.fnGetUserInfo();
    },
    computed:{
      personImg(){
        return  this.userInfo.info?(this.$url.url2 + this.userInfo.info[0].S_picurl):'../../static/img/portrait-1.png'
      }
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
    background: url(../../static/img/logo.png) no-repeat center left;
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
    position: relative;
  }
  .top1 > .header1 .right .person img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
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
  .top1 > .header1 .right .person.active,
  .top1 > .header1 .left .courseBtn.clickthis,
  .top1 > .header1 .right .person.clickPerson{
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
    position: relative;
  }

  .top2 .toStudyCenter{
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
  .top2 .toStudyCenter:hover{
    color: #ff7676;
  }

</style>
