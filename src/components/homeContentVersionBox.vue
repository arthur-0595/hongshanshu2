<template>
  <div class="versionBox" id="versionBox" v-show="showVersionBox">
    <div class="versionTop clearfix">
      <div class="vBtn" @click="fnTabSelf()">牛津译林版2012(三年级起点)-三上词组和惯用法<span>▼</span></div>
    </div>
    <div class="versionCon">
      <!--课程选择按钮-->
      <ul class="courseMenu">
        <li :class="{choosed:showTab===0}" @click="fnShowSelf(0)">在学课程</li>
        <li :class="{choosed:showTab===1}" style="border-left:none;border-right:none;" @click="fnShowSelf(1)">我的课程</li>
        <li :class="{choosed:showTab===2}" @click="fnShowSelf(2)">所有课程</li>
      </ul>

      <div class="courseWrapper">
        <!--在学课程-->
        <table class="courseList courseItem" id="courseList" v-show="showTab === 0">
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
        <!--我的课程-->
        <div class="myCourse courseItem clearfix" id="myCourse" v-show="showTab === 1">
          <div class="series">
            <h4>选择系列</h4>
            <ul>
              <li>
                <span class="icon"></span>
                <span class="name">小学英语</span>
                <span class="arrow">▶</span>
              </li>
              <li class="choose">
                <span class="icon"></span>
                <span class="name">初中英语</span>
                <span class="arrow">▶</span>
              </li>
              <li>
                <span class="icon"></span>
                <span class="name">高中英语</span>
                <span class="arrow">▶</span>
              </li>
              <li>
                <span class="icon"></span>
                <span class="name">大学英语</span>
                <span class="arrow">▶</span>
              </li>
              <li>
                <span class="icon"></span>
                <span class="name">出国英语</span>
                <span class="arrow">▶</span>
              </li>
            </ul>
          </div>
          <div class="versions">
            <h4>选择版本</h4>
            <ul>
              <li>
                <span class="icon"></span>
                <span class="name">考研大纲</span>
                <span class="arrow">▶</span>
              </li>
              <li>
                <span class="icon"></span>
                <span class="name">09</span>
                <span class="arrow">▶</span>
              </li>
              <li class="choose">
                <span class="icon"></span>
                <span class="name">高中英语</span>
                <span class="arrow">▶</span>
              </li>
              <li>
                <span class="icon"></span>
                <span class="name">大学英语</span>
                <span class="arrow">▶</span>
              </li>
              <li>
                <span class="icon"></span>
                <span class="name">出国英语</span>
                <span class="arrow">▶</span>
              </li>
            </ul>
          </div>
          <div class="courses">
            <h4>选择课程</h4>
            <ul>
              <li>
                <span class="icon"></span>
                <span class="name">小学英语</span>
              </li>
              <li>
                <span class="icon"></span>
                <span class="name">初中英语</span>
              </li>
              <li>
                <span class="icon"></span>
                <span class="name">高中英语</span>
              </li>
              <li>
                <span class="icon"></span>
                <span class="name">大学英语</span>
              </li>
              <li>
                <span class="icon"></span>
                <span class="name">出国英语</span>
              </li>
            </ul>
          </div>
        </div>
        <!--全部课程-->
        <div class="myCourse courseItem clearfix" id="allCourse" v-show="showTab === 2">
          <div class="series">
            <h4>选择系列</h4>
            <ul>
              <li>
                <span class="icon"></span>
                <span class="name">小学英语</span>
                <span class="arrow">▶</span>
              </li>
              <li class="choose">
                <span class="icon"></span>
                <span class="name">初中英语</span>
                <span class="arrow">▶</span>
              </li>
              <li>
                <span class="icon"></span>
                <span class="name">高中英语</span>
                <span class="arrow">▶</span>
              </li>
              <li>
                <span class="icon"></span>
                <span class="name">大学英语</span>
                <span class="arrow">▶</span>
              </li>
              <li>
                <span class="icon"></span>
                <span class="name">出国英语</span>
                <span class="arrow">▶</span>
              </li>
            </ul>
          </div>
          <div class="versions">
            <h4>选择版本</h4>
            <ul>
              <li>
                <span class="icon"></span>
                <span class="name">考研大纲</span>
                <span class="arrow">▶</span>
              </li>
              <li>
                <span class="icon"></span>
                <span class="name">09</span>
                <span class="arrow">▶</span>
              </li>
              <li class="choose">
                <span class="icon"></span>
                <span class="name">高中英语</span>
                <span class="arrow">▶</span>
              </li>
              <li>
                <span class="icon"></span>
                <span class="name">大学英语</span>
                <span class="arrow">▶</span>
              </li>
              <li>
                <span class="icon"></span>
                <span class="name">出国英语</span>
                <span class="arrow">▶</span>
              </li>
            </ul>
          </div>
          <div class="courses">
            <h4>选择课程</h4>
            <ul>
              <li>
                <span class="icon"></span>
                <span class="name">小学英语</span>
              </li>
              <li>
                <span class="icon"></span>
                <span class="name">初中英语</span>
              </li>
              <li>
                <span class="icon"></span>
                <span class="name">高中英语</span>
              </li>
              <li>
                <span class="icon"></span>
                <span class="name">大学英语</span>
              </li>
              <li>
                <span class="icon"></span>
                <span class="name">出国英语</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home-content-version-box',
    props: {
      showVersionBox: Boolean
    },
    components: {},
    data() {
      return {
        showVersion : this.showVersionBox,
        showTab: 0,
      }
    },
    methods: {
      fnTabSelf(){
        this.showVersion = false;
        this.$emit('closeVersionBox' , 1);
      },
      fnShowSelf(type_){
        this.showTab = type_;
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .versionBox {
    position: absolute;
    left: -2px;
    top: -80px;
    height: 580px;
    width: 100%;
  }

  .versionTop {
    width: 100%;
    height: 80px;
  }

  .versionTop .vBtn {
    height: 80px;
    line-height: 80px;
    float: left;
    background-color: #fff;
    padding: 0 15px;
  }

  .versionTop .vBtn:hover {
    cursor: pointer;
    background-color: #008c72;
    color: #fff;
  }

  .versionCon {
    height: 540px;
    padding-top: 30px;
    box-sizing: border-box;
    background-color: #fff;
  }

  .versionBox .versionCon .courseMenu {
    width: 940px;
    border-bottom: 1px solid #008C72;
    height: 34px;
    padding: 0 30px;
  }

  .versionBox .versionCon .courseMenu > li {
    float: left;
    width: 100px;
    height: 33px;
    font-size: 16px;
    line-height: 33px;
    color: #666;
    text-align: center;
    border: 1px solid #e8e8e8;
    cursor: pointer;
    border-bottom: none;
  }

  .versionBox .versionCon .courseMenu > li:hover {
    background-color: #eee;
  }

  .versionBox .versionCon .courseMenu > li.choosed {
    border-bottom: 3px solid #fff !important;
    border-left: 1px solid #008c72 !important;
    border-right: 1px solid #008c72 !important;
    border-top: 3px solid #008c72 !important;
    color: #008c72 !important;
    height: 30px !important;
    line-height: 30px !important;
    background-color: #fff !important;
  }

  .versionBox .versionCon .courseWrapper {
    padding: 30px;
  }

  /*在学课程*/
  .versionBox .versionCon .courseWrapper .courseList {
    width: 100%;
  }

  .versionBox .versionCon .courseWrapper .courseList tr {
    border-bottom: 1px solid;
  }

  .versionBox .versionCon .courseWrapper .courseList .tHeader > td {
    background-color: #008c72;
    font-size: 16px;
    color: #fff;
  }

  .versionBox .versionCon .courseWrapper .courseList tr td {
    border: 1px solid #eee;
    height: 24px;
    line-height: 24px;
    font-size: 13px;
    padding: 6px 10px;
    text-align: center;
    color: #777;
  }

  .versionBox .versionCon .courseWrapper .courseList tr.line:hover {
    background-color: #eee;
    cursor: pointer;
  }

  .versionBox .versionCon .courseWrapper .courseList tr td.check {
    color: #008c72;
  }

  .versionBox .versionCon .courseWrapper .courseList tr td.check:hover {
    cursor: pointer;
    color: #009966;
  }

  .versionBox .versionCon .courseWrapper .courseList tr td.study > span {
    color: #fff;
    background-color: #008c72;
    padding: 4px 12px;
  }

  .versionBox .versionCon .courseWrapper .courseList tr td.study > span:hover {
    cursor: pointer;
    background-color: #009966;
  }

  /*我的课程*/
  .myCourse {
    width: 100%;
    height: 415px;
    border: 1px solid #008c72;
    overflow: hidden;
  }

  .myCourse li:hover {
    background-color: #e5f3f1;
    cursor: pointer;
  }

  .myCourse .series {
    float: left;
    width: 156px;
    height: 100%;
  }

  .myCourse .series ul {
    width: 100%;
  }

  .myCourse ul > li {
    height: 34px;
    line-height: 34px;
    padding: 0 6px;
    border-bottom: 1px solid #b9d3ce;
    box-sizing: border-box;
    font-size: 14px;
    overflow: hidden;
    position: relative;
  }

  .myCourse ul > li .icon {
    display: inline-block;
    vertical-align: top;
    width: 20px;
    height: 34px;
    background-repeat: no-repeat;
    background-position: center center;

  }

  .myCourse .series ul > li .icon {
    background-image: url(../../static/img/book.png);
  }

  .myCourse .versions ul > li .icon {
    background-image: url(../../static/img/nostudy_series_gray.png);
  }

  .myCourse .courses ul > li .icon {
    background-image: url(../../static/img/nostudy.png);
  }

  .myCourse ul > li .arrow {
    position: absolute;
    right: 8px;
    top: 2px;
    color: #999;
  }

  .myCourse ul > li.choose {
    background-color: #008c72;
    color: #fff;
  }

  .myCourse .series ul > li.choose .icon {
    background-image: url(../../static/img/nostudy_parent_series_white.png);
  }

  .myCourse h4 {
    width: 100%;
    background-color: #008c72;
    height: 34px;
    text-align: center;
    line-height: 34px;
    color: #fff;
    border-bottom: 1px solid #b9d3ce;
  }

  .myCourse .versions {
    float: left;
    width: 316px;
    height: 100%;
    border-left: 1px solid #b9d3ce;
    border-right: 1px solid #b9d3ce;
  }

  .myCourse .courses {
    float: left;
    width: 466px;
    height: 100%;
  }
</style>
