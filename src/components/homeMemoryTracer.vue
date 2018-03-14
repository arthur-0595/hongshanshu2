<template>
  <div class="wordWrapper" v-loading="loading">
    <!--版本名称-->
    <div class="version">
      <div class="versionName">{{thisVersionName}}</div>
      <div class="tipBox">
        <span class="tipBtn" @click="openTip()">提示</span>
        <!--提示内容-->
        <div class="tipCon" id="tipCon" v-show="showTip">
          <h4>提示</h4>
          <div class="context clearfix">
            <span class="leftImg"></span>
            <span class="txt">记忆追踪是利用“记忆引擎”技术，将你已学单词（句子）中的生词（句）自动挑选出来，颜色越深、字体越大的单词（句）需优先复习。
				　　记忆追踪根据你的记忆规律，结合每个单词（句子）的记忆次数、反应时间、记忆难度、记忆强度等指标，精准运算出黄金记忆序列，并进行记忆优化，确保每个学员都能用最少的时间达到母语式记忆效果。</span>
          </div>
          <div class="closeBtn" @click="closeTip()">关闭</div>
        </div>
      </div>
    </div>
    <!--显示当前时间-->
    <div class="timeBox clearfix">
      <span class="curTime">{{time}}</span>
      <span class="wordNum" v-show="false">本课程共有<i class="red">10</i>个生词，前<i class="red">10</i>个需要立即复习。</span>
      <span class="reviewBtn" @click="fnGoStudy()">智能复习</span>
    </div>
    <!--展示单词-->
    <div class="wordList">
      <span :class="{
        bold: item.countdown%60==0,
        small: item.countdown%60!=0
        }" v-for="item in wordList"
        @mouseenter="fnshowCon(item, $event)"
        @mouseleave="fnCloseCon()">
        {{item.word_name?item.word_name:item.sentence}}
      </span>
      <!--<span class="bold">advise</span>-->
      <!--<span class="small">adjective</span>-->
    </div>

    <div class="box" v-show="showCon" :style="{left: leftP+'px', top: topP+'px'}">
      <div class="translate" id="translate">翻译：
        <i>{{boxTranslate}}</i>
      </div>
      <div class="thisStudyNum" id="thisStudyNum">
        学习次数：{{studyNum}}  错误次数：{{errNum}}
      </div>
      <div class="memoryNum" id="memoryNum">
        记忆强度：{{intensityMemory}}%
      </div>
      <div class="studyTimeOver" id="studyTimeOver">
        {{memoryTime}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home-memory-tracer',
    components: {},
    data() {
      return {
        showTip: false, // 是否显示提示
        loading: false,
        userMsg: {},
        typeId: 0,
        textbookTd: 0,
        time: '', // 当前记忆追踪时间
        allWord: 0, // 所有生词
        presentWord: 0, // 当前需要复习的生词
        wordList: [{
          "id":2,
          "user_id":1,
          "unit_id":1,
          "word_name":"adjec•tive",
          "word_mean":"n.形容词",
          "phonogram":"['æʤiktiv]",
          "word_url":"\UploadeFile\Video\adjective.wav",
          "sentence":"What is the adjective?",
          "sentence_mean":"什么是形容词？",
          "neworold_word":2,
          "percent":12,
          "countdown":0,
          "downtime":"2018-03-13T19:32:53",
          "study_times":1,
          "correct_times":0,
          "wrong_number":1
        }],
        showCon: false, // 是否显示记忆追踪单词信息
        leftP: 0, // 定位left
        topP: 0, // 定位top
        boxTranslate: '', // 翻译
        studyNum: 0, // 学习次数
        errNum: 0, // 错误次数
        intensityMemory: 0, // 记忆强度
        memoryTime: '00:00:00' // 记忆点
      }
    },
    methods: {
      // 点击打开提示
      openTip() {
        this.showTip = this.showTip ? false : true;
      },
      // 点击关闭提示
      closeTip() {
        this.showTip = false;
      },
      // 获取所有记忆追踪单词
      fnGetAllWord() {
        this.loading = true;
        this.$ajax({
          method: 'GET',
          url: this.$url.url1,
          params: {
            method: 'Memorytracking',
            user_id: this.userMsg.ID,
            textbookid: this.textbookTd,
            type: this.typeId
          }
        }).then(res => {
          this.loading = false;
          let data = res.data;
          console.log(data);
          this.wordList = data;
        })
      },
      // 获取当前时间
      updateTime() {
        let date = new Date();
        let year = date.getFullYear(); // 获取年
        let month = date.getMonth() + 1; // 获取月
        let day = date.getDate(); // 获取日
        let h = date.getHours(); // 获取小时
        let m = date.getMinutes(); // 获取分钟
        let s = date.getSeconds(); // 获取秒
        this.time = `当前记忆追踪时间：${year}年 ${month}月 ${day}日 ${h}: ${m}: ${s}`;
      },
      // 是否显示记忆追踪单词信息框
      fnshowCon(item_, event) {
        this.showCon = true;
        this.leftP = event.clientX + 10;
        this.topP = event.clientY + 20;
        this.boxTranslate = item_.word_mean?item_.word_mean:item_.sentence_mean;
        this.studyNum = item_.study_times;
        this.errNum = item_.wrong_number;
        this.intensityMemory = item_.percent;
        this.memoryTime = this.thisMemoryTime(item_.countdown);
      },
      fnCloseCon() {
        this.showCon = false;
      },
      // 计算记忆点的函数
      thisMemoryTime(time_) {
        let hour_ = parseInt(time_ / 3600);
        let minute_ = parseInt((time_ % 3600) / 60);
        let second_ = time_ % 60;
        if (second_ == 0) {
          return `记忆点已到，快开始复习吧！`;
        } else {
          return `距离记忆点：${hour_} : ${minute_} : ${second_}`;
        }
      },
      // 智能复习事件
      fnGoStudy() {
        switch (parseInt(this.typeId)){
          case 1:
            this.$router.push({
              name: 'centerWordStudy'
            });
            break;
          case 2:
            this.$router.push({
              name: 'centerWordListen'
            });
            break;
          case 3:
            this.$router.push({
              name: 'centerWordWrite'
            });
            break;
          case 4:
            this.$router.push({
              name: 'centerSentenceListen'
            });
            break;
          case 5:
            this.$router.push({
              name: 'centerSentenceTranslate'
            });
            break;
          case 6:
            this.$router.push({
              name: 'centerSentenceWrite'
            });
            break;
        }
      }
    },
    computed: {
      // 拼接左上角学习的教材标题
      thisVersionName() {
        let versionBoxName = sessionStorage.version_name;
        let textbookName = sessionStorage.textbook_name;
        let unitBoxName = sessionStorage.unit_name;
        let leftTitle = versionBoxName + ' - ' + textbookName + ' - ' + unitBoxName;
        return leftTitle;
      },
    },
    mounted() {
      this.updateTime();
      this.fnGetAllWord();
    },
    created() {
      this.userMsg = JSON.parse(sessionStorage.userMsg);
      this.textbookTd = sessionStorage.textbook_id;
      this.typeId = sessionStorage.type_id;
    }
  }
</script>

<style scoped>
  .wordWrapper {
    width: 1000px;
    min-height: 640px;
    background-color: #fff;
    margin: 20px auto;
    padding: 10px;
    box-sizing: border-box;
    /*position: relative;*/
  }
  .box{
    padding: 10px 15px;
    width: 240px;
    font-size: 14px;
    color: #fff;
    background-color: #008c72;
    position: absolute;
    left: 0;
    top: 0;
  }
  .box div{
    line-height: 24px;
    border-bottom: 1px solid #fff;
  }

  /*版本名字*/
  .version {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #fff;
    background-color: #008c72;
    padding: 0 12px;
    box-sizing: border-box;
  }

  .version > .versionName {
    float: left;
  }

  .version > .tipBox {
    float: right;
    position: relative;
  }

  .version > .tipBox .tipBtn {
    cursor: pointer;
  }

  .version > .tipBox .tipBtn:hover {
    color: darkorange;
  }

  /*显示时间框*/
  .timeBox {
    margin-top: 10px;
    width: 100%;
    height: 26px;
    line-height: 26px;
    padding: 6px 0;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    color: #666;
  }

  .timeBox .curTime {
    float: left;
  }

  .timeBox .wordNum {
    float: left;
    margin-left: 30px;
  }

  .timeBox .wordNum .red {
    color: red;
  }

  .timeBox .reviewBtn {
    float: right;
    padding: 0 10px;
    color: #fff;
    background-color: #ff9900;
  }

  .timeBox .reviewBtn:hover {
    cursor: pointer;
    background-color: orange;
  }

  /*展示单词*/
  .wordList {
    padding: 20px;
    box-sizing: border-box;
  }

  .wordList > span {
    margin-right: 8px;
    cursor: pointer;
  }

  .wordList .bold {
    font-size: 24px;
    font-weight: 600;
  }

  .wordList .small {
    font-size: 13px;
    color: #999;
    vertical-align: text-top;
  }

  .cover {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
    z-index: 20;
  }

  /*提示信息*/
  .tipCon {
    position: absolute;
    top: 38px;
    right: -12px;
    width: 660px;
    height: 300px;
    background-color: #fff;
    z-index: 21;
    padding: 10px;
    box-sizing: border-box;
    color: #666;
  }

  .tipCon h4 {
    height: 30px;
    line-height: 30px;
    color: #fff;
    padding: 0 10px;
    background-color: #008c72;
    box-sizing: border-box;
  }

  .tipCon .context {
    margin-top: 10px;
  }

  .tipCon .context .leftImg {
    float: left;
    width: 240px;
    height: 200px;
    background: url(../../static/img/study/test-result-klm.png) no-repeat center center;
  }

  .tipCon .context .txt {
    float: left;
    width: 400px;
    font-size: 15px;
    color: #333;
    line-height: 26px;
    padding-top: 26px;
  }

  .tipCon .closeBtn {
    width: 100px;
    height: 36px;
    background-color: #ce0324;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
    line-height: 36px;
    margin-left: 530px;
  }

  .tipCon .closeBtn:hover {
    opacity: .8;
  }
</style>
