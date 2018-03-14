<template>
  <div>
    <scoreHead :title="scoreTit"></scoreHead>
    <div class="content">
      <!--展示分数框-->
      <div class="scoreBox">
        <h4>测试成绩</h4>
        <div class="resultBox">
          <div class="left">
            <span class="imgShow"></span>
            <span class="score">{{score}} 分</span>
          </div>
          <div class="right">{{opinion}}</div>
        </div>
      </div>
      <!--看错题和全部试题按钮-->
      <div class="itemBox">
        <h4>字母拼读 - 听写</h4>
        <ul>
          <li :class="{correct: item.status==1,
            error:item.status==0}" v-for="(item, index) in testArr">
            <div class="wordLine clearfix">
              <span class="num">{{index + 1}}. </span>
              <template v-for="vm in item.myletter">
                <span class="myWord" v-if="vm.state==1">{{vm.model}}</span>
                <span class="oldWord" v-else>{{vm.model}}</span>
              </template>
              <span class="isCorrect"></span>
            </div>
            <div class="correctWord">{{item.word}}</div>
          </li>

          <!--
          <li class="error">
            <div class="wordLine clearfix">
              <span class="num">231. </span>
              <span class="oldWord">w</span>
              <span class="myWord">ai</span>
              <span class="oldWord">ght</span>
              <span class="isCorrect"></span>
            </div>
            <div class="correctWord">weight</div>
          </li>
          <li class="unsel">
            <div class="wordLine clearfix">
              <span class="num">45. </span>
              <span class="oldWord">w</span>
              <span class="myWord"></span>
              <span class="oldWord">ght</span>
              <span class="isCorrect">(未填)</span>
            </div>
            <div class="correctWord">weight</div>
          </li>
          -->
        </ul>
      </div>
    </div>

    <audio src="" id="audio" autoplay="autoplay"></audio>
    <home-foot></home-foot>
  </div>
</template>

<script>
  import scoreHead from '../components/scoreHead'
  import homeFoot from '../components/homeFoot'
  export default {
    name: 'intelligent-voiceword-test-score',
    components: {scoreHead, homeFoot},
    data() {
      return {
        scoreTit: '我是左上角标题',
        score: 0,
        opinionArr: [
          '不及格，你真的应该好好学习了！',
          '勉强及格，还需要加油哦，继续学习！',
          '成绩还可以，不过还需要继续努力啊',
          '你已经很棒了，不过你还可以做的更好，不是吗？',
          '很完美，你很棒棒哦'
        ],
        testArr: [],
      }
    },
    methods: {

    },
    computed: {
      // 反馈意见
      opinion() {
        let opinion_ = '';
        if (this.score <= 60) {
          opinion_ = this.opinionArr[0];
        } else if (this.score > 60 && this.score <= 70) {
          opinion_ = this.opinionArr[1];
        } else if (this.score > 70 && this.score <= 80) {
          opinion_ = this.opinionArr[2];
        } else if (this.score > 80 && this.score <= 90) {
          opinion_ = this.opinionArr[3];
        } else if (this.score > 90 && this.score <= 100) {
          opinion_ = this.opinionArr[4];
        } else{
          opinion_ = '成绩有问题！'
        }
        return opinion_;
      },
    },
    mounted() {

    },
    created() {
      this.scoreTit = this.$route.query.scoreTit;
      this.score = this.$route.query.score;
      this.testArr = JSON.parse(sessionStorage.testArr);
    }
  }
</script>

<style scoped>
  .content{
    width:1000px;
    min-height:800px;
    margin:70px auto 20px;
    background-color: #fff;
    padding: 10px;
    box-sizing: border-box;
  }
  /*分数展示*/
  .content>.scoreBox{
    width:100%;
    border:1px solid #ccc;
  }
  .content>.scoreBox .resultBox{
    padding:20px;
    height: 160px;
  }
  .content>.scoreBox .resultBox .left{
    float:left;
    height:100%;
    width:50%;
    border-right:1px solid #ccc;
  }
  .content>.scoreBox .resultBox .left>span{
    display: inline-block;
    vertical-align: top;
    width:49%;
    height:160px;
    line-height: 160px;
    font-size:64px;
    color:#ff0000;
    text-align: center;
  }
  .content>.scoreBox .resultBox .left>span.imgShow{
    background-repeat: no-repeat;
    background-position: center center;
    background-image:url(../../static/img/study/test-result-klm.png);
  }
  .content>.scoreBox .resultBox .right{
    float:right;
    width:49%;
    line-height: 160px;
    font-size: 20px;
    text-align: center;
  }
  /*中间按钮组*/
  .content>.tabBtns{
    margin: 10px 0;
    height:36px;
    line-height: 36px;
  }
  .content>.tabBtns .all,
  .content>.tabBtns .testAgain{
    padding:0 10px;
    background-color: #008c72;
    color:#fff;
    margin-right:20px;
    cursor: pointer;
  }
  .content>.tabBtns .all{
    float:left;
  }
  .content>.tabBtns .testAgain{
    float:right;
  }
  .content>.tabBtns .all:hover,
  .content>.tabBtns .testAgain:hover{
    background-color: #04a586;
  }
  .content>.tabBtns .errItems,
  .content>.tabBtns .studyCenter{
    padding:0 14px;
    height:36px;
    line-height: 36px;
    border:1px solid #999;
    box-sizing: border-box;
    cursor: pointer;
  }
  .content>.tabBtns .errItems{
    float:left;
  }
  .content>.tabBtns .studyCenter{
    float:right;
  }
  .content>.tabBtns .errItems:hover,
  .content>.tabBtns .studyCenter:hover{
    color:#008c72;
    border:1px solid #008c72;
  }
  .content>.tabBtns .errNum{
    float:right;
    color:red;
    font-size:14px;
  }
  .content>.tabBtns .rightNum{
    float:right;
    color:#008c72;
    margin-right:20px;
    font-size:14px;
  }
  /*题目列表*/
  .content>.itemBox{
    margin-top:10px;
    width:100%;
  }
  .content h4{
    height:36px;
    line-height: 36px;
    color:#fff;
    background-color: #008c72;
    font-size:16px;
    padding:0 10px;
    box-sizing: border-box;
  }
  .content>.itemBox>ul{
    width:100%;
    border:1px solid #ccc;
    border-top:none;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    box-sizing: border-box;
  }
  .content>.itemBox>ul>li{
    width:50%;
    padding:20px 0 14px 20px;
    background-color: #eee9e3;
    border-right:1px dashed #959595;
    border-top:1px dashed #959595;
    box-sizing: border-box;
  }
  .content>.itemBox>ul>li:nth-child(2n){
    border-right:none;
  }
  .content>.itemBox>ul>li:nth-child(1),
  .content>.itemBox>ul>li:nth-child(2){
    border-top:none;
  }
  .content>.itemBox>ul>li .wordLine>span{
    float:left;
    height: 30px;
    line-height: 30px;
    font-size:18px;
  }
  .content>.itemBox>ul>li .wordLine>.num{
    width:36px;
    text-align: center;
    color:#333;
    font-weight:600;
    font-family: "SimSun";
  }
  .content>.itemBox>ul>li .wordLine>.myWord{
    width:50px;
    padding-left:6px;
    border:1px solid #ddd;
    background-color: #fff;
    box-sizing: border-box;
  }
  .content>.itemBox>ul>li .wordLine>.isCorrect{
    width: 30px;
    height: 30px;
    margin-left: 10px;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .content>.itemBox>ul>li .correctWord{
    margin-left: 38px;
    font-size: 18px;
    color:#333;
    margin-top:10px;
  }

  /*答对*/
  .content>.itemBox>ul>li.correct .wordLine>.isCorrect{
    background-image: url(../../static/img/study/right-img.png);
  }
  .content>.itemBox>ul>li.correct .wordLine>.myWord{
    color:#008c72;
  }
  /*答错*/
  .content>.itemBox>ul>li.error .wordLine>.isCorrect{
    background-image: url(../../static/img/study/error-img.png);
  }
  .content>.itemBox>ul>li.error .wordLine>.myWord{
    color:red;
  }
  /*未选*/
  .content>.itemBox>ul>li.unsel{
    background-color: #fdfbf4;
  }
  .content>.itemBox>ul>li.unsel .wordLine>.isCorrect{
    width:80px;
    color:red;
    font-size:15px;
  }
</style>
