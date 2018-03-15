<template>
  <div id="scorePage">
    <scoreHead :title="scoreTit"></scoreHead>
    <div class="wraper">
      <div class="scoreBox clearfix">
        <span class="score">得分：<i>{{score}}分</i></span>
        <span class="wrongNum">错误{{errorNum}}题</span>
        <span class="rightNum">正确{{correctNum}}题</span>
      </div>
      <ul class="items">
        <li :class="{correct:item.status==1,error:item.status==0}"
          v-for="(item,index) in testArr">
          <div class="line">
            <span class="num">{{index + 1}}.</span>
            <!--<span class="laba laba1"-->
                  <!--@click="fnVoicePlaying(item.this_url)"></span>-->
            <span class="topic">{{item.this_name}}</span>
            <span class="isCorrect"></span>
          </div>
          <div class="line myLine">{{item.myVal}}</div>
          <div class="line correctLine">{{item.this_mean}}</div>
        </li>
        <!--
        <li class="error">
          <div class="line">
            <span class="num">11.</span>
            <span class="laba"></span>
            <span class="topic">Could you book me a round trip flight to Los Angel</span>
            <span class="isCorrect"></span>
          </div>
          <div class="line myLine">您能给我订一张去洛杉矶的往返机票吗？</div>
          <div class="line correctLine">您能给我订一张去洛杉矶的往返机票吗？</div>
        </li>
        <li class="unsel">
          <div class="line">
            <span class="num">11.</span>
            <span class="laba laba1"></span>
            <span class="topic">Could you book me a round trip flight to Los Angel</span>
            <span class="isCorrect">(未选)</span>
          </div>
          <div class="line correctLine">您能给我订一张去洛杉矶的往返机票吗？</div>
        </li>
        -->
      </ul>
    </div>
    <audio src="" id="audio" autoplay="autoplay"></audio>
    <home-foot></home-foot>
  </div>
</template>

<script>
  import scoreHead from '../components/scoreHead'
  import homeFoot from '../components/homeFoot'

  export default {
    name: 'score-page',
    components: {scoreHead, homeFoot},
    data() {
      return {
        correctNum: 0, // 正确数
        errorNum: 0, // 错误数
        testArr: [],
      }
    },
    methods: {
      // 点击播放语音事件
      fnVoicePlaying(url_) {
        let audio = document.querySelector('#audio');
        audio.src = this.$url.url2 + url_;
      },
    },
    computed: {
      // 分数
      score() {
        return this.$route.query.score;
      },
      // 是否是学前测试，左上角标题用
      scoreType() {
        let scoreType_ = parseInt(this.$route.query.testType) === 0 ? '学前测试' : '闯关测试';
        return scoreType_;
      },
      // 左上角标题
      scoreTit() {
        let title = '';
        if (this.$route.query.scoreTit) {
          title = this.$route.query.scoreTit;
        } else {
          title = sessionStorage.version_name + ' - ' + sessionStorage.textbook_name + ' - (' + sessionStorage.unit_name + ') - ' + this.scoreType;

        }
        return title;
      }
    },
    mounted() {

    },
    created() {
      this.testArr = JSON.parse(sessionStorage.testArr);
      let correctNum = 0;
      this.testArr.forEach(item => {
        if (item.status) {
          correctNum++;
        }
      });
      this.correctNum = correctNum;
      this.errorNum = this.testArr.length - this.correctNum;
    }
  }
</script>

<style scoped>
  .wraper {
    width: 1000px;
    min-height: 960px;
    background-color: #fff;
    margin: 50px auto 0;
    box-sizing: border-box;
    z-index: 2;
  }

  .scoreBox {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 14px;
  }

  .scoreBox .score {
    float: left;
    font-size: 24px;
  }

  .scoreBox .score > i {
    color: red;
    font-size: 28px;
  }

  .scoreBox .wrongNum {
    float: right;
    margin-left: 20px;
    color: red;
  }

  .scoreBox .rightNum {
    float: right;
    color: #008c72;
  }

  .items {
    width: 98%;
    margin: 20px auto;
    border: 1px solid #ddd;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    z-index: 4;
  }

  .items > li {
    width: 50%;
    padding: 30px 0;
    background-color: #eee9e3;
    border-right: 1px dashed #959595;
    border-top: 1px dashed #959595;
    box-sizing: border-box;
    font-size: 14px;
    color: #666;
    position: relative;
    cursor: pointer;
  }

  .items > li:nth-child(2n) {
    border-right: none;
  }

  .items > li:nth-child(1),
  .items > li:nth-child(2) {
    border-top: none;
  }

  .items > li .line {
    width: 100%;
    line-height: 30px;
    padding-left: 76px;
    padding-right: 38px;
    box-sizing: border-box;
  }

  .items > li .line.myLine,
  .items > li .line.correctLine {
    margin-top: 10px;
  }

  .items > li .line .num {
    position: absolute;
    top: 30px;
    left: 12px;
    font-weight: 600;
    color: #333;
    font-family: "SimSun";
    width: 30px;
    text-align: right;
  }

  .items > li .line .laba {
    position: absolute;
    top: 30px;
    left: 40px;
    width: 30px;
    height: 30px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 20px 20px;
    background-image: url(../../static/img/study/deep-laba1.png);
    cursor: pointer;
  }

  .items > li .line .laba:hover {
    opacity: .8;
  }

  .items > li .line .laba.laba1 {
    background-image: url(../../static/img/study/deep-laba2.png);
  }

  .items > li .line .isCorrect {
    position: absolute;
    top: 30px;
    right: 6px;
    width: 40px;
    height: 30px;
    background-repeat: no-repeat;
    background-position: center center;
  }

  /*答对*/
  .items > li.correct .line .isCorrect {
    background-image: url(../../static/img/study/right-img.png);
  }

  .items > li.correct .line.myLine {
    color: #008c72;
  }

  /*答错*/
  .items > li.error .line .isCorrect {
    background-image: url(../../static/img/study/error-img.png);
  }

  .items > li.error .line.myLine {
    color: red;
  }

  /*未选*/
  .items > li.unsel {
    background-color: #fdfbf4;
  }

  .items > li.unsel .line .isCorrect {
    color: red;
  }

  .items > li:hover {
    background-color: #e2e2e2;
  }
</style>
