<template>
  <div id="loginMain" class="loginMain">
    <div class="content">
      <div class="loginBox">
        <h3>
          欢迎使用
          <span>邀请码</span>
        </h3>
        <div class="username">
          <div class="leftImg"></div>
          <input type="text" placeholder="请输入用户名" maxlength="20">
        </div>
        <div class="password">
          <div class="leftImg"></div>
          <input type="password" placeholder="请输入密码" maxlength="20">
        </div>
        <button type="button">登陆</button>
        <div class="msg" v-show="msg">用户名或密码错误，请检查!</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loginMain',
    components: {},
    data() {
      return {
        msg:false,
      }
    },
    methods: {},
    mounted() {

    }
  }
</script>

<style scoped>
  .loginMain{
    width: 100%;
    height: 650px;
    background: url("../assets/img/443d96bd-7661-4ec9-a6d8-6f16f1bc7810.jpg") no-repeat center;
  }
  .content{
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    position: relative;
  }
  .loginBox{
    box-sizing: border-box;
    width: 280px;
    height: 302px;
    background-color: #0a3225;
    position: absolute;
    right: 5px;
    top: 20%;
    padding: 30px;
  }
  .loginBox h3{
    font-size: 20px;
    font-weight: normal;
    width: 100%;
    height: 30px;
    color: #fff;
    line-height: 30px;
    position: relative;
  }
  .loginBox h3 span{
    font-size: 14px;
    position: absolute;
    right: 0;bottom: 0;
    cursor: pointer;
  }
  .loginBox .username,.loginBox .password{
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: relative;
    margin-top: 15px;
  }
  .loginBox .username .leftImg,.loginBox .password .leftImg{
    width: 40px;
    height: 40px;
    background: url("../assets/img/man.jpg") no-repeat center;
    position: absolute;
    left: 0;
    top: 0;
  }
  .loginBox .password .leftImg{
    background: url("../assets/img/lock.jpg") no-repeat center;
  }
  .loginBox .username input,.loginBox .password input{
    position: absolute;
    right: 0;
    top: 0;
    height: 40px;
    width: 180px;
    box-sizing: border-box;
    padding-left: 10px;
  }
  .loginBox button {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    color: #fff;
    background-color: #f59f16;
    margin-top: 15px;
  }
  .msg{
    width: 100%;
    line-height: 40px;
    color: #fff;
    font-size: 14px;
    margin-top: 5px;
  }
</style>
