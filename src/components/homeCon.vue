<template>
  <section class="content" id="home-con">
    <!--中间顶部按钮-->
    <div class="categoryBtn clearfix">
      <div class="leftBtn curProgramName" onclick="fnShowVersion()">牛津译林版2012(三年级起点)-三上词组和惯用法<span>▼</span></div>
      <div class="leftBtn curUnitName" onclick="fnShowUnit()">Unit1-8<span>▼</span></div>
      <div class="leftBtn curDeviceType" onclick="fnShowDevice()">智能记忆<span>▼</span></div>
      <div class="link">测试中心<span>▼</span></div>
      <div class="link">记忆追踪</div>
      <div class="link">单词本</div>
      <div class="link">操作指南</div>
    </div>
    <!--蒙版中间内容-->
    <div class="centerCon">
      <div class="versionBox" id="versionBox" style="display: none;">
        <div class="versionTop clearfix">
          <div class="vBtn">牛津译林版2012(三年级起点)-三上词组和惯用法<span>▼</span></div>
        </div>
        <div class="versionCon">
          <ul class="courseMenu">
            <li class="choosed">在学课程</li>
            <li style="border-left:none;border-right:none;">我的课程</li>
            <li>所有课程</li>
          </ul>
          <div class="courseWrapper">
            <table class="courseList" style="display: block;">
              <tr class="tHeader">
                <td style="width:450px">课程名称</td>
                <td style="width:230px">最后一次学习时间</td>
                <td style="width:131px">学习进度</td>
                <td style="width:107px">学习</td>
              </tr>
              <tr class="line">
                <td>牛津译林版2012(三年级起点)-三上词组和惯用法</td>
                <td>3天前</td>
                <td class="check">查看</td>
                <td class="study"><span>学习</span></td>
              </tr>
              <tr class="line">
                <td>牛津译林版2012(三年级起点)-三上词组和惯用法</td>
                <td>3天前</td>
                <td class="check">查看</td>
                <td class="study"><span>学习</span></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="unitBox" id="unitBox" style="display: none;">单元选择</div>
      <div class="deviceBox" id="deviceBox" style="display: none;">板块选择</div>
    </div>
    <!--学习进度-->
    <div class="progressBox clearfix">
      <div class="unitPro clearfix">
        <div class="speed mRight">速度：20个/小时</div>
        <div>
          <span class="mRight">单元进度：</span>
          <span class="totalProgress mRight">
	    				<span class="curProgress"></span>
    				</span>
          <span class="percent">20%</span>
        </div>
      </div>
      <div class="coursePro clearfix">
        <div class="mRight">
          <span class="mRight">课程进度：</span>
          <span class="totalProgress mRight">
	    				<span class="curProgress"></span>
    				</span>
          <span class="percent">20%</span>
        </div>
        <div class="studyAgain">再学一遍</div>
      </div>
    </div>
    <!--底部复习-->
    <div class="conBot">
      <div class="botLeft">
        <div class="review">课程总复习量</div>
        <h3 class="reviewNum">200个</h3>
        <div class="reviewBtn">
          <span>智能复习</span>
          <span>测试复习</span>
        </div>
      </div>
      <div class="botCenter">
        <span class="tit">智能记忆</span>
      </div>
      <div class="botRight">
        <div class="review">今日学习效率</div>
        <div class="proPer">20%</div>
        <div class="time">在线时长：01:40:00</div>
        <div class="time">有效时长：01:20:00</div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'home-con',
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
  .content {
    width: 1000px;
    height: 540px;
    background-color: #fff;
    margin: 40px auto;
  }

  /* 科目 单元选择*/
  .content > .categoryBtn {
    width: 100%;
    height: 80px;
    line-height: 80px;
    color: #333;
    font-size: 16px;
    box-sizing: border-box;
  }

  .content > .categoryBtn > div.leftBtn {
    float: left;
    padding: 0 15px;
  }

  .content > .categoryBtn > div.leftBtn:hover {
    background-color: #008c72;
    color: #fff;
    cursor: pointer;
  }

  .content > .categoryBtn > div > span {
    color: #ccc;
  }

  .content > .categoryBtn .link {
    float: right;
    color: #008c72;
    font-size: 14px;
    padding: 0;
    margin-right: 20px;
  }

  .content > .categoryBtn .link:hover {
    color: #333;
    background-color: transparent;
    cursor: pointer;
  }

  /* 学习进度*/
  .progressBox {
    width: 100%;
    height: 80px;
    line-height: 80px;
    background-color: #efefef;
    border-left: 2px solid #fff;
    border-right: 2px solid #fff;
    box-sizing: border-box;
    color: #8f8f8f;
    font-size: 14px;
  }

  .progressBox > .unitPro {
    float: left;
    padding-left: 50px;
  }

  .progressBox > .unitPro > div {
    float: left;
  }

  .progressBox > .coursePro {
    float: right;
    padding-right: 50px;
  }

  .progressBox > .coursePro > div {
    float: left;
  }

  .progressBox .totalProgress {
    display: inline-block;
    width: 150px;
    height: 8px;
    background-color: #ccc;
    overflow: hidden;
    position: relative;
  }

  .progressBox .totalProgress .curProgress {
    display: inline-block;
    width: 30px;
    height: 8px;
    background-color: #008c72;
    position: absolute;
    left: 0;
    top: 0;
  }

  .progressBox .studyAgain {
    cursor: pointer;
  }

  .progressBox .speed {
    padding-right: 20px;
  }

  .progressBox .mRight {
    margin-right: 15px;
  }

  /* 内容底部*/
  .conBot {
    padding: 40px 120px;
    height: 300px;
  }

  .conBot > .botLeft {
    float: left;
    height: 100%;
    width: 250px;
    padding: 50px 0;
    text-align: center;
    line-height: 30px;
    box-sizing: border-box;
  }

  .conBot .review {
    font-size: 18px;
    color: #666;
    text-align: center;
    margin-top: 30px;
  }

  .conBot > .botLeft .reviewNum {
    width: 100%;
    height: 90px;
    line-height: 90px;
    text-align: center;
    color: #009966;
    font-size: 32px;
  }

  .reviewBtn {
    text-align: center
  }

  .reviewBtn span {
    font-size: 14px;
    color: #008c72;
    cursor: pointer;
  }

  .reviewBtn span:last-child {
    margin-left: 15px;
  }

  .conBot > .botCenter {
    float: left;
    width: 254px;
    height: 100%;
    background: url(../assets/img/remember.png) no-repeat center center;
    opacity: .9;
    position: relative;
  }

  .conBot > .botCenter:hover {
    opacity: 1;
    cursor: pointer;
  }

  .conBot > .botCenter .tit {
    font-size: 20px;
    color: #fff;
    position: absolute;
    bottom: 54px;
    left: 86px;
  }

  .conBot .botRight {
    float: left;
    height: 100%;
    padding: 50px 0;
    box-sizing: border-box;
    /*border:1px solid red;*/
  }

  .conBot .proPer {
    width: 250px;
    height: 90px;
    font-size: 32px;
    text-align: center;
    color: rgb(255, 151, 151);
    line-height: 90px;
  }

  .conBot .time {
    text-align: center;
    font-size: 14px;
    color: #666;
    line-height: 26px;;
  }
</style>
