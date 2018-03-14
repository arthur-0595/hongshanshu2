<template>
  <div id="intelligentVoicewordTest">
    <testHead :title="titName"></testHead>
    <div class="content">
      <h4>字母拼读-听写</h4>
      <ul class="itemList clearfix">
        <li class="selItem" v-for="(item, index) in testList"
            :data-word="item.letter">
          <span class="num">{{index + 1}}.</span>
          <span class="word" v-for="subitem in item.testletter"
                :data-state="subitem.state">
						{{(subitem.state == 0)?subitem.model:''}}
            <input type="text" v-if="(subitem.state == 1)?true:false"
                   :data-src="item.letter_url"
                   :data-letter="subitem.model"
                  @click="fnAudioPalyer(item.letter_url)"/>
					</span>
        </li>
        <!--
        <li class="selItem">
          <span class="num">1.</span>
          <span class="word">
						qq
            <input type="text" />
					</span>
        </li>
        -->
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
    name: 'intelligent-voiceword-test',
    components: {testHead, homeFoot},
    data() {
      return {
        titName: '我是左上角标题',
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
          console.log(data);
          this.testList = data;
          this.$bus.emit('fnsetTimeOut', this.testList.length);
        })
      },
      // 交卷事件
      fnOverTest() {
        let conArr = document.querySelectorAll('.itemList li.selItem');
        let Nnum = 0;
        conArr.forEach((item, index) => {
          let word = item.dataset.word;
          let thisinput = item.querySelectorAll('input');
          let thisletter = thisinput[0].dataset.letter;
          let letter_url = thisinput[0].dataset.src;
          let myletter = this.fnRegReplace(thisinput[0].value);
          let status = 0;
          let spana = item.querySelectorAll('span.word');

          if (thisletter == myletter) {
            status = 1;
            Nnum++;
          }
          let obj = {
            word: word,
            letter: thisletter,
            letter_url: letter_url,
            myletter: [{
              'model': spana[0].dataset.state==1?myletter:spana[0].innerText,
              'state': spana[0].dataset.state
            }, {
              'model': spana[1].dataset.state==1?myletter:spana[1].innerText,
              'state': spana[1].dataset.state
            }, {
              'model': spana[2].dataset.state==1?myletter:spana[2].innerText,
              'state': spana[2].dataset.state
            }],
            status: status
          };
          this.testArr.push(obj);
          this.score = Math.round((Nnum / this.testArr.length) * 100);
        });
        this.fnCountTestScore();
      },
      // 计算测试分数
      fnCountTestScore() {
        sessionStorage.testArr = JSON.stringify(this.testArr);
        this.fnSubmitScore();
      },
      // 发送测试成绩
      fnSubmitScore() {
        let thistType = 2;// 默认为学习
        if (this.$route.query.typeName === '学前测试'){
          thistType = 1;
        } else if (this.$route.query.typeName === '学后测试') {
          thistType = 3;
        }
        // console.log(this.$route.query);
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
          // console.log(data);
          let testType_ = 0;
          if (thistType === 1) {
            testType_ = 0;
          }else {
            testType_ = 1;
          }
          if (data > 0) { // 分数提交成功，转入显示成绩页面
            this.$router.push({
              name: 'intelligentVoicewordTestScore',
              query: {
                testType: testType_,
                score: this.score,
                scoreTit: this.titName
              }
            });
          } else {
            this.$message.error('提交成绩出错，请重试或联系客服');
            return false;
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
      this.titName = '智能语音 - 字母拼读 - ' + this.$route.query.typeName;
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
  .content{
    width:1000px;
    /*min-height:800px;*/
    margin:70px auto 20px;
    background-color: #fff;
    padding: 10px;
    box-sizing: border-box;
  }
  .content h4{
    width:100%;
    height: 34px;
    background-color: #008c72;
    line-height: 34px;
    color:#fff;
    padding-left:20px;
    box-sizing: border-box;
  }
  .content .itemList{
    width:100%;
    /*min-height: 700px;*/
    border:1px solid #ccc;
    box-sizing: border-box;
  }
  .content .itemList>li{
    float:left;
    width:50%;
    border-top:1px dashed #666;
    border-right:1px dashed #666;
    height: 70px;
    line-height: 30px;
    padding:20px;
    background-color: #fdfbf4;
    box-sizing: border-box;
    font-size: 18px;
    color:#666;
  }
  .content .itemList>li.selItem{
    background-color: #eee9e3;
  }
  .content .itemList>li .num{
    display: inline-block;
    vertical-align: top;
    width: 36px;
    text-align: center;
    color:#333;
    font-weight:600;
    font-family: "SimSun";
  }
  .content .itemList>li input{
    display: inline-block;
    vertical-align: top;
    width:40px;
    height:100%;
    -webkit-appearance: none;
    outline: none;
    border:1px solid #ddd;
    padding-left:10px;
    font-size: 18px;
    color:#666;
  }
  .content .itemList>li input:focus{
    background-color: #dbf9f3;
    border: 1px solid #0adeb7;
    box-shadow: 0 0 10px #28c3a4;
  }
  .content .itemList>li:nth-child(2n){
    border-right:none;
  }
  .content .itemList>li:nth-child(1),
  .content .itemList>li:nth-child(2){
    border-top:none;
  }
</style>
