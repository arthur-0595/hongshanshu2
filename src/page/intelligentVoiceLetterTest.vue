<template>
  <div id="letterTest">
    <testHead :title="test_type"></testHead>
    <div class="main">
      <ul class="clearfix">
        <li v-for="(item, index) in testList">
          <span class="num">{{index+1}}.</span>
          <input type="text" class="line"
                 placeholder="点击文本框听读音"
                 @click="fnAudioPalyer(item.letter_url)"
                 :data-letter="item.letter"
                 :data-src="item.letter_url" />
        </li>
      </ul>
    </div>
    <home-foot></home-foot>
    <audio src="" id="audio" autoplay></audio>
  </div>
</template>

<script>
  import testHead from '../components/testHead'
  import homeFoot from '../components/homeFoot'

  export default {
    name: 'intelligent-voice-word-test',
    components: {testHead, homeFoot},
    data() {
      return {
        loading: false,
        test_type: '我是左上角标题',
        testList: [], // 测试的数据
        testArr: [], // 测试结果数组
        score: 0, // 测试成绩
        userMsg: {}, // 个人信息
      }
    },
    methods: {
      // 播放器播放
      fnAudioPalyer(url_) {
        let audio = document.querySelector('#audio');
        audio.src = this.$url.url2 + url_;
      },
      // 获取所有测试内容
      fnGetAllTestList() {
        this.loading = true;
        let thistType = 2;// 默认为学习
        if (this.$route.query.typeName === '学前测试'){
          thistType = 1;
        } else if (this.$route.query.typeName === '学后测试') {
          thistType = 3;
        }
        this.$ajax({
          method: 'GET',
          url: this.$url.url1,
          params: {
            method: 'voicetest',
            type_id: this.$route.query.typeId,
            voice_id: this.$route.query.id,
            type: thistType,
            issound: 0
          }
        }).then(res => {
          this.loading = false;
          let data = res.data;
          // console.log(data);
          this.testList = data;
          this.$bus.emit('fnsetTimeOut', this.testList.length);
        })
      },
      // 交卷事件
      fnOverTest() {
        let inputs = document.querySelectorAll('.main input');
        // console.log('交卷啦！' + inputs.length);
        inputs.forEach((item, index) => {
          let myVal = this.fnRegReplace(item.value);
          let this_name = item.dataset.letter;
          let thisStatus = 1;// 正确
          if (myVal == this_name) {
            thisStatus = 1;
          }else {
            thisStatus = 0;
          }
          let thisWordObj = {
            id: index + 1,
            this_name: this_name,
            this_mean: '字母' + this_name,
            this_url: item.dataset.src,
            myVal: myVal,
            status: thisStatus
          };
          this.testArr.push(thisWordObj);
        })
        this.fnCountTestScore();
      },
      // 计算测试分数
      fnCountTestScore() {
        let num = 0;
        this.testArr.forEach(item => {
          if (item.status === 1) {
            num++;
          }
        });
        this.score = Math.round((num / this.testArr.length) * 100);
        this.fnSubmitScore();
        sessionStorage.testArr = JSON.stringify(this.testArr);
      },
      // 发送测试成绩
      fnSubmitScore() {
        let thistType = 2;// 默认为学习
        if (this.$route.query.typeName === '学前测试'){
          thistType = 1;
        } else if (this.$route.query.typeName === '学后测试') {
          thistType = 3;
        }
        this.$ajax({
          method: 'GET',
          url: this.$url.url1,
          params: {
            method: 'submit',
            user_id: this.userMsg.ID,
            type_id: this.$route.query.typeId,
            voice_id: this.$route.query.id,
            score: this.score,
            type: thistType
          }
        }).then(res => {
          let data = res.data;
          let testType_ = 0;
          if (thistType === 1) {
            testType_ = 0;
          }else {
            testType_ = 1;
          }
          if (data == 1) { // 分数提交成功，转入显示成绩页面
            this.$router.push({
              name: 'scorePage',
              query: {
                testType: testType_,
                score: this.score,
                scoreTit: this.test_type
              }
            });
          }
        })
      },
      // 过滤两边空格
      fnRegReplace(tex_) {
        let reg = /\s/g;
        tex_.replace(reg, '');
        return tex_
      }
    },
    computed: {

    },
    mounted() {
      // console.log(this.$route);
      this.test_type = '智能语音 - 字母拼读 - ' + this.$route.query.typeName;
      this.fnGetAllTestList();
      // 监听交卷事件
      this.$bus.on('submitGrade', () => {
        this.fnOverTest();
      })
    },
    created() {
      this.userMsg = JSON.parse(sessionStorage.userMsg);
      this.$bus.off('submitGrade');
    }
  }
</script>

<style scoped>
  .clearfix:after{
    content: '';
    height: 0;
    display: block;
    clear: both;
  }
  #letterTest{
    background-color: #efefef;
    padding-top: 52px;
  }
  .main{
    width: 1000px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px 30px;
    box-sizing: border-box;
  }
  .main ul{
    width: 100%;
    font-size: 18px;
  }
  .main ul li{
    width: 50%;
    float: left;
    height: 36px;
    margin-bottom: 18px;
  }
  .main ul li input{
    height: 32px;
    border: 1px solid #333;
    border-radius: 4px;
    width: 70%;
    padding:0 10px;
  }
</style>
