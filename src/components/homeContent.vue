<template>
  <section class="content" id="home-con" v-loading="loading">
    <!--中间顶部按钮-->
    <div class="categoryBtn clearfix">
      <div class="leftBtn curProgramName" @click="fnShowSelfBox(1)">
        {{this.$store.state.versionBoxTitle}}
        <span>▼</span>
      </div>
      <div class="leftBtn curUnitName" @click="fnShowSelfBox(2)">
        {{this.$store.state.unitBoxTitle}}
        <span>▼</span>
      </div>
      <div class="leftBtn curDeviceType" @click="fnShowSelfBox(3)">
        {{this.$store.state.deviceBoxTitle}}
        <span>▼</span>
      </div>
      <div class="link" @click.stop.prevent="fnshowTestContent()">
        测试中心<span>▼</span>
        <ul class="testContent" v-show="showTestContent"
            v-loading="loading1">
          <li>已学测试<span>({{totalnumber}})</span></li>
          <li>生词测试<span>({{newwordnumber}})</span></li>
          <li>熟词测试<span>({{oldwordnumber}})</span></li>
          <li>五维测试</li>
          <li>测试记录</li>
        </ul>
      </div>
      <div class="link" @click="fnGoHomeMemoryTracer()">
        记忆追踪<span v-show="memorytracking_count">({{memorytracking_count}})</span>
      </div>
      <div class="link" @click="fnGoWordBook()">单词本</div>
      <div class="link" v-if="false">操作指南</div>
    </div>
    <!--中间内容-->
    <div class="centerCon">
      <home-content-version-box
        @closeVersionBox="fncloseCenterBox"
        :showVersionBox="showVersionBox">
      </home-content-version-box>
      <home-content-unit-box
        @closeUnitBox="fncloseCenterBox"
        :showUnitBox="showUnitBox">
      </home-content-unit-box>
      <home-content-device-box
        @closeDeviceBox="fncloseCenterBox"
        :showDeviceBox="showDeviceBox">
      </home-content-device-box>
    </div>
    <!--学习进度-->
    <div class="progressBox clearfix">
      <div class="unitPro clearfix">
        <div class="speed mRight">速度：{{todaySpeed}}个/小时</div>
        <div>
          <span class="mRight">单元进度：</span>
          <span class="totalProgress mRight" :title="'单元进度：' + unitProgress">
	    				<span class="curProgress" :style="{width: unitProgress}"></span>
          </span>
          <span class="percent">{{unitProgress}}</span>
        </div>
      </div>
      <div class="coursePro clearfix">
        <div class="mRight">
          <span class="mRight">课程进度：</span>
          <span class="totalProgress mRight" :title="'课程进度：' + courseProgress">
	    				<span class="curProgress" :style="{width: courseProgress}"></span>
          </span>
          <span class="percent">{{courseProgress}}</span>
        </div>
        <div class="studyAgain" @click="fnClearStudyRecord()">再学一遍</div>
      </div>
    </div>
    <!--底部复习-->
    <div class="conBot">
      <div class="botLeft">
        <div class="review">课程总单词量</div>
        <h3 class="reviewNum">{{textbook_total}}个</h3>
        <div class="reviewBtn">
          <span>智能复习<i>({{review_count}})</i></span>
          <span>测试复习<i>({{review_count}})</i></span>
        </div>
      </div>
      <div class="botCenter"
           @click="fnGoToStudy()"
           :class="{ type1: typeNum === 1,type2: typeNum === 2,
                  type3: typeNum === 3,type4: typeNum === 4,
                  type5: typeNum === 5,type6: typeNum === 6}">
        <span class="tit">{{typeName}}</span>
      </div>
      <div class="botRight">
        <div class="review">今日学习效率</div>
        <div class="proPer">{{todayPercentage}}%</div>
        <div class="time">在线时长：{{Login_all}}</div>
        <div class="time">今日在线：{{Login_today}}</div>
      </div>
    </div>
  </section>
</template>

<script>
  import homeContentUnitBox from './homeContentUnitBox';
  import homeContentVersionBox from './homeContentVersionBox';
  import homeContentDeviceBox from './homeContentDeviceBox';

  export default {
    name: 'home-content',
    components: {homeContentDeviceBox, homeContentUnitBox, homeContentVersionBox},
    data() {
      return {
        showDeviceBox: false,
        showVersionBox: false,
        showUnitBox: false,
        userMsg: {}, // 个人信息
        versionBoxTitle: '选择版本',
        unitBoxTitle: '选择单元',
        deviceBoxTitle: '智能记忆',
        unit_total: 0, // 该单元单词总数
        study_unit: 0, // 该单元学习单词数
        textbook_total: 0, // 该课本单词总数
        study_textbook: 0, // 该课本学习单词数
        memorytracking_count: 0, // 记忆追踪个数
        review_count: 0, // 智能复习个数
        showTestContent: false, // 显示测试中心列表
        loading: false, // 显示当前组件loading
        loading1: false, // 测试中心显示loading
        oldwordnumber: 0, // 熟词数量
        newwordnumber: 0, // 生词数量
        totalnumber: 0, // 已学数量
        todaySpeed: 0, // 今日学习速度
        Login_all: '00:00:00', // 在线时长
        Login_today: '00:00:00', // 今日在线
        todayPercentage: 0, // 今日学习效率
      }
    },
    methods: {
      // 点击选择教材、 单元 、 模块三个事件，分别唤起不同的组件
      fnShowSelfBox(type_) {
        if (type_ === 1) {
          this.showVersionBox = true;
          this.$emit('showCoverBox', true);
        } else if (type_ === 2) {
          let textbook_id = sessionStorage.textbook_id;
          if (textbook_id) { // 有缓存的课程ID
            this.$bus.emit('getUnitList', textbook_id);
            this.showUnitBox = true;
            this.$emit('showCoverBox', true);
          } else { // 没有缓存的课程ID，弹出提示，点击确认自动弹出选择课程窗口
            this.$alert('需要先选择教材哦: )', '提示', {
              confirmButtonText: '确定',
              callback: () => {
                // 此处回调唤起选择教材事件
                this.fnShowSelfBox(1);
              }
            });
          }
        } else if (type_ === 3) {
          this.showDeviceBox = true;
          this.$emit("showCoverBox", true);
        }
      },
      fncloseCenterBox(eventType) {
        if (eventType === 1) {
          this.showVersionBox = false;
          this.$emit('showCoverBox', false);
        } else if (eventType === 2) {
          this.showUnitBox = false;
          this.$emit('showCoverBox', false);
        } else if (eventType === 3) {
          this.showDeviceBox = false;
          this.$emit('showCoverBox', false);
        }
      },
      // 获取缓存中的选中的教材和课程信息，更新到vuex
      fnUpdateCourseMsg() {
        let version_id = sessionStorage.version_id;
        let version_name = sessionStorage.version_name;
        let textbook_id = sessionStorage.textbook_id;
        let textbook_name = sessionStorage.textbook_name;
        let unit_id = sessionStorage.unit_id;
        let unit_name = sessionStorage.unit_name;
        if (version_id && version_name && textbook_id && textbook_name && unit_id && unit_name) {
          this.$store.commit('updateVersionBoxTitle', version_name + ' - ' + textbook_name);
          this.$store.commit('updateVersionId', version_id);
          this.$store.commit('updateTextbookId', textbook_id);
          this.$store.commit('updateUnitBoxTitle', unit_name);
          this.$store.commit('updateUnitId', unit_id);
        } else {
          this.fnGetStudyRecord();
        }
      },
      // 点击获取最后一次学习记录
      fnGetStudyRecord() {
        let user_id = JSON.parse(sessionStorage.userMsg).ID;
        this.$ajax({
          method: 'GET',
          url: this.$url.url1,
          params: {
            method: 'SelectStudy',
            user_id: user_id
          }
        }).then(res => {
          let data = res.data;
          sessionStorage.version_id = data[0].version_id;
          sessionStorage.version_name = data[0].version_name;
          sessionStorage.textbook_id = data[0].textbook_id;
          sessionStorage.textbook_name = data[0].textbook_name;
          sessionStorage.unit_id = data[0].unit_id;
          sessionStorage.unit_name = data[0].unit_name;
          this.$store.commit('updateVersionBoxTitle', data[0].version_name + ' - ' + data[0].textbook_name);
          this.$store.commit('updateVersionId', data[0].version_id);
          this.$store.commit('updateTextbookId', data[0].textbook_id);
          this.$store.commit('updateUnitBoxTitle', data[0].unit_name);
          this.$store.commit('updateUnitId', data[0].unit_id);
        })
      },
      // 获取缓存中的课程id,以更新单元列表内容
      fnUpdateUnitList() {
        let textbook_id = sessionStorage.textbook_id;
        this.$bus.emit('getUnitList', textbook_id);
      },
      // 去学习了
      fnGoToStudy() {
        console.log('去学习了,学习类型：' + this.$store.state.typeId);
        switch (parseInt(this.$store.state.typeId)) {
          case 1:
            console.log('单词记忆教材:' + this.$store.state.textbookId + '单元：' + this.$store.state.unitId);
            this.$router.push('./wordStudy');
            break;
          case 2:
            console.log('单词听写教材:' + this.$store.state.textbookId + '单元：' + this.$store.state.unitId);
            this.$router.push('./wordListen');
            break;
          case 3:
            console.log('单词默写教材:' + this.$store.state.textbookId + '单元：' + this.$store.state.unitId);
            this.$router.push('./wordWrite');
            break;
          case 4:
            console.log('句子听力教材:' + this.$store.state.textbookId + '单元：' + this.$store.state.unitId);
            this.$router.push('./sentenceListen');
            break;
          case 5:
            console.log('句子翻译教材:' + this.$store.state.textbookId + '单元：' + this.$store.state.unitId);
            this.$router.push('./sentenceTranslate');
            break;
          case 6:
            console.log('句子默写教材:' + this.$store.state.textbookId + '单元：' + this.$store.state.unitId);
            this.$router.push('./sentenceWrite');
            break;
          // default:
          //   this.$router.push('./wordStudy');
          //   break;
        }
      },
      // 打开单词本
      fnGoWordBook() {
        this.$router.replace('/home/wordBook');
        this.$store.commit('updateShowGoStudyCenter');
      },
      // 打开记忆追踪
      fnGoHomeMemoryTracer() {
        this.$router.replace('/home/homeMemoryTracer');
        this.$store.commit('updateShowGoStudyCenter');
      },
      // 获取课程进度
      fnGetStudyProgress() {
        let typeId = sessionStorage.type_id;
        let unitId = sessionStorage.unit_id;
        let textbookId = sessionStorage.textbook_id;
        if (typeId && unitId && textbookId) {
          this.$ajax({
            method: 'GET',
            url: this.$url.url0,
            params: {
              method: 'GetProgress',
              user_id: this.userMsg.ID,
              unit_id: unitId,
              type_id: typeId,
              textbook_id: textbookId
            }
          }).then(res => {
            let data = res.data;
            if (data.msg == '无数据') {
              this.$alert('提示', '该课程无数据，请更换其他课程或联系管理员！', {
                confirmButtonText: '确定',
                callback: () => {
                  return false;
                }
              });
            } else {
              this.unit_total = data.unit_total;
              this.study_unit = data.study_unit;
              this.textbook_total = data.textbook_total;
              this.study_textbook = data.study_textbook;
              this.memorytracking_count = data.Memorytracking_count;
              this.review_count = data.Review_count;
            }
          })
        } else {
          console.log('获取课程进度失败');
          // console.log('typeId:' + typeId);
          // console.log('unitId:' + unitId);
          // console.log('userMsg:' + this.userMsg);
          // console.log('textbookId:' + textbookId);
          return false;
        }
      },
      // 切换显示或隐藏测试列表中心
      fnshowTestContent() {
        this.showTestContent = this.showTestContent ? false : true;
        if (this.showTestContent) {
          this.fnGetTextNum();
        }
      },
      // 获取测试中心相关测试的数量
      fnGetTextNum() {
        this.loading1 = true;
        let typeId = sessionStorage.type_id;
        let textbookId = sessionStorage.textbook_id;
        this.$ajax({
          method: 'GET',
          url: this.$url.url0,
          params: {
            method: 'GetTestNumber',
            user_id: this.userMsg.ID,
            textbook_id: textbookId,
            type_id: typeId
          }
        }).then(res => {
          this.loading1 = false;
          let data = res.data;
          this.oldwordnumber = data.oldwordnumber;
          this.newwordnumber = data.newwordnumber;
          this.totalnumber = data.totalnumber;
        })
      },
      // 发送更新当前学习相关信息的事件
      fnSendMsg() {
        this.$ajax({
          method: 'GET',
          url: this.$url.url1,
          params: {
            method: 'UserClose',
            user_id: this.userMsg.ID
          }
        }).then(res => {
          let data = res.data;
          let thisStudy = data.study_words + data.study_sentence;
          // 定义每小时应该学习的数量为40
          let oneHourStudyNum = 40;
          if (data.result == 1) {
            // 先判断token
            if (data.token != sessionStorage.token) {
              this.$alert('账号已在其他设备登录，若非本人操作，请尝试重新登陆并修改密码', '警告').then(() => {
                this.$router.push('/');
              });
            }
            // 计算今日学习速度
            this.todaySpeed = Math.round(thisStudy / (data.Login_today / 3600));
            this.Login_all = this.fnupdateAllTime(data.Login_all);
            this.Login_today = this.fnupdateAllTime(data.Login_today);
            this.fnupdateStudyTime(data.Login_all, data.Login_today);
            //今日学习效率
            this.todayPercentage = Math.round(this.todaySpeed / oneHourStudyNum * 100) > 100 ? 100 : Math.round(this.todaySpeed / oneHourStudyNum * 100);
          }
        })
      },
      // 计算时间的函数
      fnupdateAllTime(login_all) {
        let hour = parseInt(login_all / 3600) < 10 ? ('0' + parseInt(login_all / 3600)) : parseInt(login_all / 3600);
        let minute = parseInt((login_all - (hour * 3600)) / 60) < 10 ? ('0' + parseInt((login_all - (hour * 3600)) / 60)) : parseInt((login_all - (hour * 3600)) / 60);
        let seconds = parseInt(login_all - (hour * 3600) - (minute * 60)) < 10 ? ('0' + parseInt(login_all - (hour * 3600) - (minute * 60))) : parseInt(login_all - (hour * 3600) - (minute * 60));

        let time = `${hour} : ${minute} : ${seconds}`;
        return time;
      },
      // 点击在学一次按钮，清空本教材学习记录
      fnClearStudyRecord() {
        if (this.unitProgress == '100%') {
          this.$alert(
            '确定再学一次吗，该操作将清空本单元学习进度（不包括学前测试记录）！',
            '提示'
          ).then(() => {
            this.fnSendAgainLearn();
          })
        } else {
          this.$message({
            message: '注意哦，这个单元你还没有学完呢！',
            type: 'warning'
          });
        }
      },
      // 发送在学一次事件
      fnSendAgainLearn() {
        let unit_id = sessionStorage.unit_id;
        let type_id = sessionStorage.type_id;
        this.loading = true;
        this.$ajax({
          method: 'GET',
          url: this.$url.url0,
          params: {
            method: 'AgainLearn',
            user_id: this.userMsg.ID,
            unit_id: unit_id,
            type_id: type_id
          }
        }).then(res => {
          this.loading = false;
          let data = res.data;
          if (data.msg === '成功') {
            this.$message({
              message: '本单元学习记录已清除成功！',
              type: 'success'
            });
            this.study_unit = 0;
          }
        })
      },
      // 在线时间不断增加
      fnupdateStudyTime(time1_, time2_) {
        setInterval(() => {
          time1_++;
          time2_++;
          this.Login_all = this.fnupdateAllTime(time1_);
          this.Login_today = this.fnupdateAllTime(time2_);
        }, 1000);
      },

    },
    computed: {
      typeNum() {
        let typeId = this.$store.state.typeId;
        return parseInt(typeId)
      },
      typeName() {
        return this.$store.state.deviceBoxTitle;
      },
      // 单元进度
      unitProgress() {
        if (this.study_unit === 0 && this.unit_total === 0) {
          return '0%';
        }
        return parseInt(this.study_unit / this.unit_total * 100) + '%';
      },
      // 课程进度
      courseProgress() {
        return parseInt(this.study_textbook / this.textbook_total * 100) + '%';
      }
    },
    mounted() {
      // 获取进度
      this.fnGetStudyProgress();
      // 发送更新当前学习信息的消息
      this.fnSendMsg();
    },
    created() {
      this.userMsg = JSON.parse(sessionStorage.userMsg);
      this.fnUpdateCourseMsg();
      this.fnUpdateUnitList();
      // 监听选择完课本打开选择单元组件的事件
      this.$bus.on('openUnitModule', () => {
        this.fnShowSelfBox(2);
      });
      // 监听获取当前课程进度事件
      this.$bus.on('getStudyProgress', () => {
        this.fnGetStudyProgress();
      });
    },
    // 组件销毁时，解除监听
    beforeDestroy() {
      this.$bus.off('getUnitList');
      this.$bus.off('openUnitModule');
      this.$bus.off('getUnitProgress');
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
    position: relative;
  }

  .content > .categoryBtn .link:hover {
    color: #333;
    background-color: transparent;
    cursor: pointer;
  }

  .content > .categoryBtn .link .testContent {
    width: 100px;
    position: absolute;
    right: -20px;
    top: 84%;
    border: 1px solid #333;
    border-bottom: none;
  }

  .content > .categoryBtn .link .testContent li {
    width: 100%;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #fff;
    color: #333;
    border-bottom: 1px solid #333;
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
    opacity: .9;
    position: relative;
  }

  .conBot > .botCenter.type1 {
    background: url(../../static/img/remember.png) no-repeat center center;
  }

  .conBot > .botCenter.type2 {
    background: url(../../static/img/listen.png) no-repeat center center;
  }

  .conBot > .botCenter.type3 {
    background: url(../../static/img/write.png) no-repeat center center;
  }

  .conBot > .botCenter.type4 {
    background: url(../../static/img/sentenceListen.png) no-repeat center center;
  }

  .conBot > .botCenter.type5 {
    background: url(../../static/img/sentenceTranslate.png) no-repeat center center;
  }

  .conBot > .botCenter.type6 {
    background: url(../../static/img/sentenceWrite.png) no-repeat center center;
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

  .centerCon {
    position: relative;
    z-index: 200;
    background-color: #eee;
    width: 1000px;
  }
</style>
