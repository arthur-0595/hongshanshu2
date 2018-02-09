<template>
  <div id="studyScore">
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
      <!--<div class="tabBtns clearfix">
        <span class="all">全部试题</span>
        <span class="errItems">只看错题</span>
        <span class="errNum">答错68题</span>
        <span class="rightNum">答对33题</span>
      </div>-->
      <!--题目列表-->
      <div class="itemBox">
        <h4>英译汉</h4>
        <ul class="itemList">
          <li :class="{correct:false}" v-for="(item,index) in e_cList">
            <div class="wordLine">
              <span class="num">{{index + 1}}.</span>
              <span class="word">{{item.word_name}}</span>
              <span class="isCorrect"></span>
            </div>
            <ul class="selectorBox">
              <li v-for="vo in item.chinese" :class="{correctLi:vo.type === 1}">
                <span></span>{{vo.content}}
              </li>
              <!--<li><span></span>adj. 每一，每一个</li>-->
              <!--<li><span></span>n. 长者，前辈</li>-->
              <!--<li class="correctLi myLi"><span></span>adj. 忧虑的，焦虑的</li>-->
            </ul>
          </li>
          <!--<li class="error">
            <div class="wordLine">
              <span class="num">1.</span>
              <span class="word">anxious</span>
              <span class="isCorrect"></span>
            </div>
            <ul class="selectorBox">
              <li><span></span>n. 8月</li>
              <li><span></span>adj. 每一，每一个</li>
              <li class="myLi"><span></span>n. 长者，前辈</li>
              <li class="correctLi"><span></span>adj. 忧虑的，焦虑的</li>
            </ul>
          </li>
          <li class="unsel">
            <div class="wordLine">
              <span class="num">1.</span>
              <span class="word">anxious</span>
              <span class="isCorrect">(未选)</span>
            </div>
            <ul class="selectorBox">
              <li><span></span>n. 8月</li>
              <li><span></span>adj. 每一，每一个</li>
              <li><span></span>n. 长者，前辈</li>
              <li class="correctLi"><span></span>adj. 忧虑的，焦虑的</li>
            </ul>
          </li>-->
        </ul>
      </div>
      <div class="itemBox">
        <h4>汉译英</h4>
        <ul class="itemList">
          <li :class="{correct:false}" v-for="(item,index) in c_eList">
            <div class="wordLine">
              <span class="num">{{index+1}}.</span>
              <span class="word">{{item.word_mean}}</span>
              <span class="isCorrect"></span>
            </div>
            <ul class="selectorBox">
              <li v-for="vo in item.english"
                :class="{correctLi:vo.type === 1}"><span></span>{{vo.content}}</li>
              <!--<li><span></span>attend</li>-->
              <!--<li class="myLi"><span></span>arrive</li>-->
              <!--<li class="correctLi"><span></span>active</li>-->
            </ul>
          </li>
          <!--<li class="error">
            <div class="wordLine">
              <span class="num">1.</span>
              <span class="word">adj. 忧虑的，焦虑的</span>
              <span class="isCorrect"></span>
            </div>
            <ul class="selectorBox">
              <li><span></span>atract</li>
              <li><span></span>attend</li>
              <li class="myLi"><span></span>arrive</li>
              <li class="correctLi"><span></span>active</li>
            </ul>
          </li>
          <li class="unsel">
            <div class="wordLine">
              <span class="num">1.</span>
              <span class="word">adj. 忧虑的，焦虑的</span>
              <span class="isCorrect">(未选)</span>
            </div>
            <ul class="selectorBox">
              <li><span></span>atract</li>
              <li><span></span>attend</li>
              <li><span></span>arrive</li>
              <li class="correctLi"><span></span>active</li>
            </ul>
          </li>-->
        </ul>
      </div>
      <div class="itemBox">
        <h4>听力理解</h4>
        <ul class="itemList">
          <li :class="{error:false}" v-for="(item, index) in listenList">
            <div class="wordLine">
              <span class="num">{{index+1}}.</span>
              <span class="readBtn"></span>
              <span class="word"></span>
              <span class="isCorrect"></span>
            </div>
            <ul class="selectorBox">
              <li v-for="vo in item.chinese"
                  :class="{correctLi:vo.type === 1}"
                ><span></span>{{vo.content}}
              </li>
              <!--<li><span></span>adj. 每一，每一个</li>-->
              <!--<li class="myLi"><span></span>n. 长者，前辈</li>-->
              <!--<li class="correctLi"><span></span>adj. 忧虑的，焦虑的</li>-->
            </ul>
          </li>
          <!--<li class="correct">
            <div class="wordLine">
              <span class="num">1.</span>
              <span class="readBtn"></span>
              <span class="word">atract</span>
              <span class="isCorrect"></span>
            </div>
            <ul class="selectorBox">
              <li><span></span>n. 8月</li>
              <li><span></span>adj. 每一，每一个</li>
              <li class=""><span></span>n. 长者，前辈</li>
              <li class="correctLi myLi"><span></span>adj. 忧虑的，焦虑的</li>
            </ul>
          </li>
          <li class="unsel">
            <div class="wordLine">
              <span class="num">1.</span>
              <span class="readBtn"></span>
              <span class="word">atract</span>
              <span class="isCorrect">(未选)</span>
            </div>
            <ul class="selectorBox">
              <li><span></span>n. 8月</li>
              <li><span></span>adj. 每一，每一个</li>
              <li class=""><span></span>n. 长者，前辈</li>
              <li class="correctLi"><span></span>adj. 忧虑的，焦虑的</li>
            </ul>
          </li>-->
        </ul>
      </div>
      <!--内容底部按钮组-->
      <!--看错题和全部试题按钮-->
      <div class="tabBtns clearfix">
        <!--<span class="all">全部试题</span>-->
        <!--<span class="errItems">只看错题</span>-->
        <span class="studyCenter" @click="fnGoStudyCenter()">学习中心</span>
        <span class="testAgain" @click="fnGoBack()" v-show="testType !== 0">重新测试</span>
      </div>
    </div>
    <home-foot></home-foot>
  </div>
</template>

<script>
  import scoreHead from '../components/scoreHead'
  import homeFoot from '../components/homeFoot'

  export default {
    name: 'word-study-score',
    components: {scoreHead, homeFoot},
    data() {
      return {
        opinionArr: [
          '不及格，你真的应该好好学习了！',
          '勉强及格，还需要加油哦，继续学习！',
          '成绩还可以，不过还需要继续努力啊',
          '你已经很棒了，不过你还可以做的更好，不是吗？',
          '很完美，你很棒棒哦'
        ]
      }
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
      // 分数
      score() {
        return this.$route.query.score;
      },
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
      // 是否是学前测试，左上角标题用
      scoreType() {
        let scoreType_ = parseInt(this.$route.query.testType) === 0 ? '学前测试' : '闯关测试';
        return scoreType_;
      },
      // 左上角标题
      scoreTit() {
        let title = sessionStorage.version_name + ' - ' + sessionStorage.textbook_name + ' - (' + sessionStorage.unit_name + ') - ' + this.scoreType ;
        // console.log(title);
        return title;
      },
      // 测试类型
      testType() {
        return parseInt(this.$route.query.testType);
      },
      e_cList() {
        return JSON.parse(sessionStorage.e_cList);
      },
      c_eList() {
        return JSON.parse(sessionStorage.c_eList);
      },
      listenList() {
        return JSON.parse(sessionStorage.listenList);
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
  /*中间测试内容*/
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
    padding:20px;
    background-color: #eee9e3;
    border-right:1px dashed #959595;
    border-top:1px dashed #959595;
    box-sizing: border-box;
  }
  .content>.itemBox>ul>li:nth-child(2n){
    border-right:none;
  }
  .content>.itemBox>ul>li:nth-child(1){
    border-top:none;
  }
  .content>.itemBox>ul>li:nth-child(2){
    border-top:none;
  }
  .content>.itemBox>ul>li .wordLine{
    color:#333;
    font-weight:600;
    line-height: 30px;
    font-size:18px;
    font-family: "SimSun";
  }
  .content>.itemBox>ul>li .wordLine>.isCorrect{
    display: inline-block;
    vertical-align: top;
    width: 30px;
    height: 30px;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .content>.itemBox>ul>li .wordLine .readBtn{
    display: inline-block;
    vertical-align: top;
    width:80px;
    height:30px;
    background: url(../../static/img/study/hearing-1.png) no-repeat left  center;
    cursor: pointer;
  }
  .content>.itemBox>ul>li .wordLine .readBtn:hover{
    opacity: .7;
  }
  .content>.itemBox>ul>li>ul{
    margin-left:20px;margin-top:10px;
  }
  .content>.itemBox>ul>li>ul>li{
    color:#666;
    line-height: 26px;
    font-size:16px;
  }
  .content>.itemBox>ul>li>ul>li>span{
    display: inline-block;
    vertical-align: top;
    width:26px;
    height:26px;
    background-repeat: no-repeat;
    background-position: left center;
    background-image: url(../../static/img/study/gray-0.png);
  }
  .content>.itemBox>ul>li>ul>li.correctLi{
    color:#008c72;
  }
  .content>.itemBox>ul>li>ul>li.correctLi>span{
    background-image: url(../../static/img/study/green-1.png);
  }
  /*答对*/
  .content>.itemBox>ul>li.correct .wordLine>.isCorrect{
    background-image: url(../../static/img/study/right-img.png);
  }
  .content>.itemBox>ul>li.correct>ul>li.myLi>span{
    background-image: url(../../static/img/study/green-0.png);
  }
  /*答错*/
  .content>.itemBox>ul>li.error .wordLine>.isCorrect{
    background-image: url(../../static/img/study/error-img.png);
  }
  .content>.itemBox>ul>li.error>ul>li.myLi{
    color:red;
  }
  .content>.itemBox>ul>li.error>ul>li.myLi>span{
    background-image: url(../../static/img/study/red-0.png);
  }
  /*未选*/
  .content>.itemBox>ul>li.unsel{
    background-color: #fdfbf4;
  }
  .content>.itemBox>ul>li.unsel .wordLine>.isCorrect{
    width:80px;
    color:red;
  }
</style>
