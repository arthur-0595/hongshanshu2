<template>
  <div class="versionBox" id="versionBox" v-show="showVersionBox">
    <div class="versionTop clearfix">
      <div class="vBtn" @click="fnTabSelf()">{{versionName}} <span> ▼</span></div>
    </div>
    <div class="versionCon">
      <!--课程选择按钮-->
      <ul class="courseMenu">
        <li :class="{choosed:showTab===0}"
            @click="fnShowSelf(0)">
          在学课程
        </li>
        <li :class="{choosed:showTab===1}"
            style="border-left:none;border-right:none;"
            @click="fnShowSelf(1)"
            v-if="false">
          我的课程
        </li>
        <li :class="{choosed:showTab===2}"
            @click="fnShowSelf(2)">
          所有课程
        </li>
      </ul>

      <div class="courseWrapper"
           v-loading="loading">
        <!--在学课程-->
        <table class="courseList courseItem" id="courseList"
               v-show="showTab === 0">
          <tr class="tHeader">
            <td style="width:450px">课程名称</td>
            <td style="width:230px">最后一次学习时间</td>
            <td style="width:131px">学习进度</td>
            <td style="width:107px">学习</td>
          </tr>
          <tr class="line" v-for="(item,index) in currentCourseList">
            <td>{{item.version_name + item.textbook_name}}</td>
            <td>2小时前</td>
            <td class="check">查看</td>
            <td class="study" @click="fnGoStudy(item)"><span>学习</span></td>
          </tr>
        </table>
        <!--我的课程-->
        <div class="myCourse courseItem clearfix" id="myCourse" v-show="showTab === 1">
          <div class="series">
            <h4>选择系列</h4>
            <ul>
              <li v-for="(item,index) in serieList"
                  @click="fnGetVersionList(item.series_id)">
                <span class="icon"></span>
                <span class="name">{{item.series_name}}</span>
                <span class="arrow">▶</span>
              </li>
            </ul>
          </div>
          <div class="versions">
            <h4>选择版本</h4>
            <ul>
              <li v-for="(item,index) in versionsList"
                  @click="fnGetCourseList(item)">
                <span class="icon"></span>
                <span class="name">{{item.version_name}}</span>
                <span class="arrow">▶</span>
              </li>
            </ul>
          </div>
          <div class="courses">
            <h4>选择课程</h4>
            <ul>
              <li v-for="(item,index) in allCoursesList"
                  @click="fnGetThisCourseMsg(item)">
                <span class="icon"></span>
                <span class="name">{{item.textbook_name}}</span>
              </li>
            </ul>
          </div>
        </div>
        <!--全部课程-->
        <div class="myCourse courseItem clearfix" id="allCourse" v-show="showTab === 2">
          <div class="series">
            <h4>选择系列</h4>
            <ul>
              <li v-for="(item,index) in serieList"
                @click="fnGetVersionList(item.series_id)">
                <span class="icon"></span>
                <span class="name">{{item.series_name}}</span>
                <span class="arrow">▶</span>
              </li>
            </ul>
          </div>
          <div class="versions">
            <h4>选择版本</h4>
            <ul>
              <li v-for="(item,index) in versionsList"
                @click="fnGetCourseList(item)">
                <span class="icon"></span>
                <span class="name">{{item.version_name}}</span>
                <span class="arrow">▶</span>
              </li>
            </ul>
          </div>
          <div class="courses">
            <h4>选择课程</h4>
            <ul>
              <li v-for="(item,index) in allCoursesList"
                @click="fnGetThisCourseMsg(item)">
                <span class="icon"></span>
                <span class="name">{{item.textbook_name}}</span>
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
        showVersion: this.showVersionBox,
        showTab: 0,
        loading: false,
        userInfo: {},
        currentCourseList: [], // 在学课程列表
        serieList: [], // 所有的系列
        versionsList: [], // 该系列下的版本
        allCoursesList: [], // 该版本下的课程
      }
    },
    methods: {
      // 关闭组件并发送关闭模态层事件
      fnTabSelf() {
        this.showVersion = false;
        this.$emit('closeVersionBox', 1);
      },
      // 点击在学课程，我的课程，所有课程
      fnShowSelf(type_) {
        this.showTab = type_;
        // 如果点击的是我的课程或者所有课程，则获取所有的教材系列
        if (type_ === 2 || type_ === 3) {
          this.fnGetSerieList();
        }
      },
      // 在学课程窗口点击学习
      fnGoStudy(item_) {
        this.thisVersionName = item_.version_name + item_.textbook_name;
        this.$store.commit('updateVersionBoxTitle' , this.thisVersionName);
        this.fnTabSelf();
        sessionStorage.version_name = item_.version_name;
        sessionStorage.textbook_name = item_.textbook_name;
        sessionStorage.version_id = item_.version_id;
        sessionStorage.textbook_id = item_.textbook_id;
        // 获取课程下单词数
        this.fnGetCourseNum(item_.textbook_id);
        // 获取课程下单元列表
        this.fnGetUnitList(item_.textbook_id);
      },
      // 获取所有在学课程
      fnGetCurrentCourse() {
        this.loading = true;
        this.$ajax({
          method: 'GET',
          url: this.$url.url0,
          params: {
            method: 'GetStudy',
            user_id: this.userId
          }
        }).then(res => {
          this.loading = false;
          let data = res.data;
          if(data.msg === '无数据'){
            return
          }
          this.currentCourseList = data;
        })
      },
      // 获取所有的系列
      fnGetSerieList() {
        this.loading = true;
        this.$ajax({
          method: 'GET',
          url: this.$url.url1,
          params: {
            method: 'GetSeries',
            user_id: this.userInfo.ID
          }
        }).then(res => {
          this.loading = false;
          let data = res.data;
          this.serieList = data;
          // console.log('serieList: ' + JSON.stringify(this.serieList));
        })
      },
      // 获取系列下的版本
      fnGetVersionList(serieId_) {
        this.loading = true;
        this.$ajax({
          method: 'GET',
          url: this.$url.url1,
          params: {
            method: 'GetVersionBySeriesID',
            user_id: this.userId,
            series_id: serieId_
          }
        }).then(res => {
          this.loading = false;
          let data = res.data;
          this.versionsList = data;
          // console.log('versionsList: ' + JSON.stringify(this.versionsList));
        })
      },
      // 获取版本下的课本
      fnGetCourseList(versionObj_) {
        sessionStorage.version_name = versionObj_.version_name;
        sessionStorage.version_id = versionObj_.version_id;
        this.thisVersionName = versionObj_.version_name + ' - ';
        this.loading = true;
        this.$ajax({
          method: 'GET',
          url: this.$url.url1,
          params: {
            method: 'GetTextBookByVersionID',
            user_id: this.userId,
            version_id: versionObj_.version_id
          }
        }).then(res => {
          this.loading = false;
          let data = res.data;
          this.allCoursesList = data;
          // console.log('allCoursesList: ' + JSON.stringify(this.allCoursesList));
        })
      },
      // 选中课本，获取该课本下的信息
      fnGetThisCourseMsg(courseObj_) {
        sessionStorage.textbook_name = courseObj_.textbook_name;
        sessionStorage.textbook_id = courseObj_.textbook_id;
        this.thisVersionName += courseObj_.textbook_name;
        this.$store.commit('updateVersionBoxTitle' , this.thisVersionName);
        this.fnTabSelf();
        // 获取课程下单词数
        this.fnGetCourseNum(courseObj_.textbook_id);
        // 获取课程下单元列表
        this.fnGetUnitList(courseObj_.textbook_id);
      },
      // 请求课程下的单词数量，并更新数据
      fnGetCourseNum(textbookId_) {
        this.$ajax({
          method: 'GET',
          url: this.$url.url0,
          params: {
            method: 'GetWordsByTextBookID',
            textbook_id: textbookId_
          }
        }).then(res => {
          let data = res.data;
          this.$store.commit('updateCourseNum' , data.wordtotal);
        })
      },
      // 请求课程下的单元列表，并更新数据
      fnGetUnitList(textbookId_) {
        this.$ajax({
          method: 'GET',
          url: this.$url.url0,
          params: {
            method: 'GetUnitByTextBookID',
            user_id: this.userId,
            textbook_id: textbookId_,
            type_id: this.$store.state.typeId
          }
        }).then(res => {
          let data = res.data;
          if(data.msg === '无数据'){
            return;
          }
          this.$store.commit('updateUnitList', data);
        })
      }
    },
    computed: {
      versionName() {
        return this.$store.state.versionBoxTitle;
      },
      userId() {
        return this.$store.state.userId;
      }
    },
    mounted() {
      this.fnGetCurrentCourse();
      this.userInfo = JSON.parse(sessionStorage.userMsg);
    },
    created() {
      this.$bus.on('getUnitList', textbook_id => {
        this.fnGetUnitList(textbook_id);
      });
    },
    // 组件销毁时，解除监听
    beforeDestroy() {
      this.$bus.off('getUnitList', textbook_id => {
        console.log('来了来了，加载课程列表时间，bus');
        this.fnGetUnitList(textbook_id);
      });
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
