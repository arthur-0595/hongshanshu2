<template>
  <div class="header">
    <div class="headerCenter clearfix">
      <span class="version">{{title}}</span>
      <span class="back" @click="fnGoStudyCenter()">返回学习中心</span>
      <span class="handPaper"
            @click="fnGoBack()"
            v-show="scoreType === 2">重新测试</span>
      <span class="handPaper"
            @click="fnGoBack()"
            v-show="showBack">重新测试</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'score-head',
    props: ['title'],
    components: {},
    data() {
      return {}
    },
    methods: {
      // 返回学习中心
      fnGoStudyCenter() {
        this.$router.push('/home');
      },
      // 重新测试
      fnGoBack() {
        this.$router.go(-1);
      }
    },
    computed: {
      scoreType() {
        let scoreType_ = parseInt(this.$route.query.testType);
        return scoreType_;
      },
      showBack() {
        let tit = this.$route.query.scoreTit;
        if (tit && tit.length > 6) {
          return true;
        } else {
          return false;
        }
      }
    },
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
</style>
