<template>
  <section class="content" id="home-con">
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
      <div class="link">测试中心<span>▼</span></div>
      <div class="link" @click="fnGoHomeMemoryTracer()">记忆追踪</div>
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
        <div class="review">课程总单词量</div>
        <h3 class="reviewNum">{{this.$store.state.courseNum}}个</h3>
        <div class="reviewBtn">
          <span>智能复习</span>
          <span>测试复习</span>
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
        <div class="proPer">20%</div>
        <div class="time">在线时长：01:40:00</div>
        <div class="time">有效时长：01:20:00</div>
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
    components: {homeContentDeviceBox, homeContentUnitBox, homeContentVersionBox },
    data() {
      return {
        showDeviceBox: false,
        showVersionBox: false,
        showUnitBox: false,
        versionBoxTitle: '选择版本',
        unitBoxTitle: '选择单元',
        deviceBoxTitle: '智能记忆',
        typeId: 1
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
        if(version_id && version_name && textbook_id && textbook_name && unit_id && unit_name){
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
          console.log('最后一次学习记录：');
          console.log(data);
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
        switch ( parseInt(this.$store.state.typeId) ) {
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
      }
    },
    computed: {
      typeNum() {
        let typeId = this.$store.state.typeId;
        return parseInt(typeId)
      },
      typeName() {
        return this.$store.state.deviceBoxTitle;
      }
    },
    mounted() {
    },
    created() {
      this.typeId = sessionStorage.type_id;
      this.fnUpdateCourseMsg();
      this.fnUpdateUnitList();
      // 监听选择完课本打开选择单元组件的事件
      this.$bus.on('openUnitModule', () => {
        this.fnShowSelfBox(2);
      });
    },
    // 组件销毁时，解除监听
    beforeDestroy() {
      this.$bus.off('getUnitList');
      this.$bus.off('openUnitModule');
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
    opacity: .9;
    position: relative;
  }
  .conBot > .botCenter.type1{
    background: url(../../static/img/remember.png) no-repeat center center;
  }
  .conBot > .botCenter.type2{
    background: url(../../static/img/listen.png) no-repeat center center;
  }
  .conBot > .botCenter.type3{
    background: url(../../static/img/write.png) no-repeat center center;
  }
  .conBot > .botCenter.type4{
    background: url(../../static/img/sentenceListen.png) no-repeat center center;
  }
  .conBot > .botCenter.type5{
    background: url(../../static/img/sentenceTranslate.png) no-repeat center center;
  }
  .conBot > .botCenter.type6{
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
