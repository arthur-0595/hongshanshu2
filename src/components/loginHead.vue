<template>
  <div id="loginHead" class="loginHead">
    <div class="content">
      <div class="logo">
        <img src="../../static/img/logo.png" alt="">
      </div>
      <div class="right">
        <div>产品介绍</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loginHead',
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
  .loginHead {
    width: 100%;
    height: 80px;
    background-color: #008c72;
    color: #fff;
  }

  .content {
    width: 1000px;
    height: 100%;
    position: relative;
    margin: 0 auto;
  }

  .logo {
    position: absolute;
    left: 0;
    top: 0;
    width: 180px;
    height: 80px;
  }

  .logo img {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .right{
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 100px;
  }
  .right>div{
    padding: 0 6px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 80px;
    height: 28px;
    background-color: #30c5a0;
    text-align: center;
    line-height: 28px;
    font-size: 14px;
    border-radius: 12px;
    cursor: pointer;
  }
</style>
