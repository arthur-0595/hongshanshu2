<template>
  <div class="wordWrapper">
    <!--版本名称-->
    <div class="version">
      <div class="versionName">牛津译林版2012(三年级起点) - 三上词组和惯用法</div>
      <div class="tipBox">
        <span class="tipBtn" @click="openTip('tipCon')">提示</span>
        <!--提示内容-->
        <div class="tipCon" id="tipCon" style="display: none;">
          <h4>提示</h4>
          <div class="context clearfix">
            <span class="leftImg"></span>
            <span class="txt">记忆追踪是利用“记忆引擎”技术，将你已学单词（句子）中的生词（句）自动挑选出来，颜色越深、字体越大的单词（句）需优先复习。
				　　记忆追踪根据你的记忆规律，结合每个单词（句子）的记忆次数、反应时间、记忆难度、记忆强度等指标，精准运算出黄金记忆序列，并进行记忆优化，确保每个学员都能用最少的时间达到母语式记忆效果。</span>
          </div>
          <div class="closeBtn" @click="closeTip('tipCon')">关闭</div>
        </div>
      </div>
    </div>
    <!--显示当前时间-->
    <div class="timeBox clearfix">
      <span class="curTime">当前时间：2018年1月26日 星期五 14:22</span>
      <span class="wordNum">本课程共有<i class="red">10</i>个生词，前<i class="red">10</i>个需要立即复习。</span>
      <span class="reviewBtn">智能复习</span>
    </div>
    <!--展示单词-->
    <div class="wordList">
      <span class="bold">and</span>
      <span class="bold">agree</span>
      <span class="bold">answer</span>
      <span class="bold">angly</span>
      <span class="bold">advise</span>
      <span class="small">adjective</span>
      <span class="small">arm</span>
      <span class="small">aim</span>
      <span class="small">again</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'home-memory-tracer',
        components: {},
        data() {
            return {}
        },
        methods: {
          // 点击打开提示
          openTip() {
            console.log('点击打开提示');
            return
          },
          // 点击关闭提示
          closeTip() {
            console.log('点击关闭提示');
            return
          }
        },
        mounted() {

        }
    }
</script>

<style scoped>
  .wordWrapper{
    width:1000px;
    min-height: 640px;
    background-color: #fff;
    margin: 20px auto;
    padding:10px;
    box-sizing: border-box;
  }
  /*版本名字*/
  .version{
    width:100%;
    height:40px;
    line-height:40px;
    font-size:16px;
    color:#fff;
    background-color: #008c72;
    padding:0 12px;
    box-sizing: border-box;
  }
  .version>.versionName{
    float:left;
  }
  .version>.tipBox{
    float:right;
    position: relative;
  }
  .version>.tipBox .tipBtn{
    cursor: pointer;
  }
  .version>.tipBox .tipBtn:hover{
    color:darkorange;
  }
  /*显示时间框*/
  .timeBox{
    margin-top:10px;
    width:100%;
    height:26px;
    line-height: 26px;
    padding:6px 0;
    border-bottom:1px solid #ddd;
    font-size:14px;
    color:#666;
  }
  .timeBox .curTime{
    float:left;
  }
  .timeBox .wordNum{
    float:left;
    margin-left: 30px;
  }
  .timeBox .wordNum .red{
    color:red;
  }
  .timeBox .reviewBtn{
    float:right;
    padding:0 10px;
    color:#fff;
    background-color: #ff9900;
  }
  .timeBox .reviewBtn:hover{
    cursor: pointer;
    background-color: orange;
  }
  /*展示单词*/
  .wordList{
    padding: 20px;
    box-sizing: border-box;
  }
  .wordList>span{
    margin-right: 8px;
    cursor: pointer;
  }
  .wordList .bold{
    font-size: 24px;
    font-weight: 600;
  }
  .wordList .small{
    font-size: 13px;
    color:#999;
    vertical-align: text-top;
  }
  .cover{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.7);
    z-index: 20;
  }

  /*提示信息*/
  .tipCon{
    position: absolute;
    top: 38px;
    right: -12px;
    width: 660px;
    height:300px;
    background-color: #fff;
    z-index: 21;
    padding: 10px;
    box-sizing: border-box;
    color:#666;
  }
  .tipCon h4{
    height:30px;
    line-height: 30px;
    color:#fff;
    padding: 0 10px;
    background-color: #008c72;
    box-sizing: border-box;
  }
  .tipCon .context{
    margin-top:10px;
  }
  .tipCon .context .leftImg{
    float:left;
    width: 240px;
    height: 200px;
    background: url(../../static/img/study/test-result-klm.png) no-repeat center center;
  }
  .tipCon .context .txt{
    float: left;
    width: 400px;
    font-size: 15px;
    color: #333;
    line-height: 26px;
    padding-top: 26px;
  }
  .tipCon .closeBtn{
    width: 100px;
    height: 36px;
    background-color: #ce0324;
    color:#fff;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
    line-height: 36px;
    margin-left: 530px;
  }
  .tipCon .closeBtn:hover{
    opacity: .8;
  }
</style>
