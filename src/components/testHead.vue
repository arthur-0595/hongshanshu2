<template>
  <div class="header">
    <div class="headerCenter clearfix">
      <span class="version">{{title}}</span>
      <span class="back" @click="fnclosePage()">返回</span>
      <span class="handPaper" @click="fnSubmitGrade()">交卷</span>
      <span class="countdown">剩余时间：<i>{{onlyminute}}分{{onlysecond}}秒</i></span>
      <!--<span class="countdown">剩余时间：<i>{{timeStr}}</i></span>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'test-head',
    props: ['title'],
    components: {},
    data() {
      return {
        onlyminute: 0,
        onlysecond: 0
      }
    },
    methods: {
      // 返回按钮
      fnclosePage() {
        this.$router.push('/home');
      },
      // 提交成绩
      fnSubmitGrade() {
        this.$bus.emit('submitGrade');
      },
      // 根据单词数量计算答题时间
      fnSetTimeOut(lietLenth_) {
        let time = parseInt(lietLenth_) * 20;
        let timer = setInterval(() => {
          time--;
          this.onlyminute = parseInt(time/60);
          this.onlysecond = time % 60;
          if (time <= 0) {
            clearInterval(timer);
            this.fnSubmitGrade();
            // this.$alert('倒计时结束啦，看看自己的成绩吧！', '测试结束', {
            //   confirmButtonText: '确定',
            //   callback: () => {
            //   }
            // });
          }
        }, 1000);
      },
    },
    computed: {

    },
    mounted() {
    },
    created() {
      this.$bus.on('fnsetTimeOut', (length_) => {
        this.fnSetTimeOut(length_);
      });
    },
    beforeDestroy() {
      this.$bus.off('fnsetTimeOut');
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
