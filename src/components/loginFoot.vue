<template>
  <div id="loginFoot" class="loginFoot">
    <div class="footer1"></div>
    <div class="footer2">
      <div class="footer-con clearfix">
        <div class="footerLogo"></div>
        <div class="footer-txt">
          <p>推荐使用IE9及以上浏览器 <span>字体音标</span> <span>下载 Flash学习插件下载</span></p>
          <p>红杉树智能英语教育机构 北京国音红杉树教育科技有限公司 版权所有</p>
          <p>本网站常年法律顾问：北京市百瑞律师事务所 康文瑛律师 | <span>律师声明</span> | 京ICP备16025391号-1</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login-foot',
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
  .loginFoot {
    width: 100%;
    height: 120px;
  }

  .loginFoot > .footer1 {
    width: 100%;
    height: 20px;
    background-color: #008c72;
  }

  .loginFoot > .footer2 {
    width: 100%;
    height: 100px;
    background-color: #333;
  }

  .loginFoot > .footer2 > .footer-con {
    width: 800px;
    margin: 0 auto;
    height: 100%;
  }

  .loginFoot > .footer2 > .footer-con > .footerLogo {
    float: left;
    width: 268px;
    height: 100%;
    background: url("../../static/img/foot-logo.png") no-repeat center left;
  }

  .loginFoot > .footer2 > .footer-con > .footer-txt {
    float: right;
    color: #999;
    font-size: 12px;
    line-height: 20px;
    margin-top: 20px;
  }

  .loginFoot > .footer2 > .footer-con > .footer-txt span:hover {
    cursor: pointer;
    color: #ff9900;
  }

</style>
