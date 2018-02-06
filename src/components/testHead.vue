<template>
  <div class="header">
    <div class="headerCenter clearfix">
      <span class="version">高考词汇-大纲单词（一）- 智能记忆闯关测试</span>
      <span class="back">返回</span>
      <span class="handPaper">交卷</span>
      <span class="countdown">剩余时间：<i>10分00秒</i></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'test-head',
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
  .header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #008c72;
    color: #fff;
    font-size: 16px;
    position: fixed;
    top: 0;
    z-index: 2;
  }

  .header > .headerCenter {
    width: 1000px;
    margin: 0 auto;
  }

  .header > .headerCenter .version {
    float: left;
  }

  .header > .headerCenter .back,
  .header > .headerCenter .handPaper {
    float: right;
    margin: 13px 4px;
    font-size: 14px;
    padding: 0 10px;
    height: 26px;
    line-height: 26px;
    cursor: pointer;
  }

  .header > .headerCenter .back {
    background-color: #fff;
    color: #666;
  }

  .header > .headerCenter .back:hover {
    color: #008c72;
  }

  .header > .headerCenter .handPaper {
    background-color: darkorange;
  }

  .header > .headerCenter .handPaper:hover {
    background-color: orange;
  }

  .header > .headerCenter .countdown {
    float: right;
    margin-right: 24px;
  }

  .header > .headerCenter .countdown > i {
    color: #ccff00;
  }
</style>
