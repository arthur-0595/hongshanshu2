<template>
  <div id="studyTest">
    <testHead :title="test_type"></testHead>
    <div class="content" v-loading="loading">
      <div class="itemBox">
        <h4>英译汉</h4>
        <ul class="itemList">
          <li :class="{selItem:false}" v-for="(item, index) in e_cList">
            <div class="wordLine">
              <span class="num">{{index + 1}}.</span>
              <span class="word">{{item.word_name.replace(/\•/g,'')}}</span>
            </div>
            <div class="selectorBox">
              <label v-for="vo in item.chinese">
                <input type="radio" :value="vo"
                       v-model="item.checked"
                       :name="item.id"
                       :data-type="vo.type"/>
                {{vo.content}}
              </label>
            </div>
          </li>
          <!--<li>
            <div class="wordLine">
              <span class="num">2.</span>
              <span class="word">alive</span>
            </div>
            <div class="selectorBox">
              <label for="y2-a"><input type="radio" name="Y-itemsel2" id="y2-a"/>n. 助手</label>
              <label for="y2-b"><input type="radio" name="Y-itemsel2" id="y2-b"/>adv. 在周围；在附近prep. 在......周围；大约</label>
              <label for="y2-c" ><input type="radio" name="Y-itemsel2" id="y2-c"/>adv. 在周围；在附近prep. 在......周围；大约adv. 在周围；在附近prep. 在......周围；大约</label>
              <label for="y2-d" ><input type="radio" name="Y-itemsel2" id="y2-d"/>adj. 积极的，主动的</label>
            </div>
          </li>-->
        </ul>
      </div>
      <div class="itemBox">
        <h4>汉译英</h4>
        <ul class="itemList">
          <li v-for="(item, index) in c_eList">
            <div class="wordLine">
              <span class="num">{{index + 1}}.</span>
              <span class="word">{{item.word_mean}}</span>
            </div>
            <div class="selectorBox">
              <label v-for="vo in item.english">
                <input type="radio" :value="vo"
                       v-model="item.checked"
                       :name="item.id"
                       :data-type="vo.type"/>
                {{vo.content.replace(/\•/g,'')}}
              </label>
            </div>
          </li>
          <!--<li>
            <div class="wordLine">
              <span class="num">1.</span>
              <span class="word">adj. 积极的</span>
            </div>
            <div class="selectorBox">
              <label for="h1-a"><input type="radio" name="H-itemsel1" id="h1-a"/>atract</label>
              <label for="h1-b"><input type="radio" name="H-itemsel1" id="h1-b"/>attend</label>
              <label for="h1-c"><input type="radio" name="H-itemsel1" id="h1-c"/>arrive</label>
              <label for="h1-d"><input type="radio" name="H-itemsel1" id="h1-d"/>active</label>
            </div>
          </li>-->
        </ul>
      </div>
      <div class="itemBox">
        <h4>听力理解</h4>
        <ul class="itemList">
          <li v-for="(item, index) in listenList">
            <div class="wordLine">
              <span class="num">{{index + 1}}.</span>
              <span class="readBtn" @click="fnVoicePlaying(item)"></span>
            </div>
            <div class="selectorBox">
              <label v-for="vo in item.chinese">
                <input type="radio" :value="vo"
                       v-model="item.checked"
                       :name="item.id"
                       :data-type="vo.type"/>
                {{vo.content}}
              </label>
            </div>
          </li>
          <!--<li>
            <div class="wordLine">
              <span class="num">1.</span>
              <span class="readBtn" ></span>
            </div>
            <div class="selectorBox">
              <label for="y2-a"><input type="radio" name="Y-itemsel2" id="y2-a"/>n. 助手</label>
              <label for="y2-b"><input type="radio" name="Y-itemsel2" id="y2-b"/>adv. 在周围；在附近prep. 在......周围；大约</label>
              <label for="y2-c"><input type="radio" name="Y-itemsel2" id="y2-c"/>adv. 在周围；在附近prep. 在......周围；大约adv. 在周围；在附近prep. 在......周围；大约</label>
              <label for="y2-d"><input type="radio" name="Y-itemsel2" id="y2-d"/>adj. 积极的，主动的</label>
            </div>
          </li>-->
        </ul>
      </div>
    </div>
    <home-foot></home-foot>
    <audio-tag></audio-tag>
  </div>
</template>

<script>
  import testHead from '../components/testHead'
  import homeFoot from '../components/homeFoot'
  import audioTag from '../components/audioTag'

  export default {
    name: 'word-study-test',
    components: {testHead, homeFoot, audioTag},
    data() {
      return {
        loading: false,
        unitId: 0,
        dataArr: [],
        dataLength: 0,
        itemsLength: 0,
        e_cList: [],
        c_eList: [],
        listenList: [],
        score: 0,
        test_type: '我是左上角标题',
        testObjArr: [],
      }
    },
    methods: {
      // 获取测试所有题目
      fnGetTestList() {
        this.loading = true;
        this.$ajax({
          method: 'GET',
          url: this.$url.url1,
          params: {
            method: 'getwords',
            unit_id: this.unitId
          }
        }).then(res => {
          this.loading = false;
          let data = res.data;
          this.fnArrProcessor(data);

          if (data && JSON.stringify(data) === '[]') {
            this.$alert('无测试内容，请返回重试，或联系管理员', '提示', {
              confirmButtonTex: '确定',

              callback: () => {
                this.$router.push('/home');
              }
            });
          } else {
            this.dataArr = data;
            this.dataLength = data.length;
            this.itemsLength = parseInt(this.dataLength / 3);

            // 发送开始倒计时事件
            this.$bus.emit('fnsetTimeOut', data.length);

            this.fnPushList();
          }
        })
      },
      // 处理数组，添加一个选中项的空数组
      fnArrProcessor(arr_) {
        arr_.forEach((item, index) => {
          item.checked = {};
        })
      },
      // 给三种题目的列表分别push进题目，循环题目列表，依次push
      fnPushList() {
        this.fnPushItemList(this.e_cList);
        this.fnPushItemList(this.c_eList);
        this.listenList = this.dataArr;
        sessionStorage.e_cList = JSON.stringify(this.e_cList);
        sessionStorage.c_eList = JSON.stringify(this.c_eList);
        sessionStorage.listenList = JSON.stringify(this.listenList);
        // console.log('三种题目分别的数量：'+this.e_cList.length +'-'+ this.c_eList.length +'-'+ this.listenList.length);
      },
      fnPushItemList(arr_) {
        for (let i = 0; i < this.itemsLength; i++) {
          this.dataLength--;
          let random = parseInt(Math.random() * this.dataLength + 1);
          arr_.push(this.dataArr.splice(random, 1)[0]);
        }
      },
      // 点击播放语音事件
      fnVoicePlaying(item_) {
        this.$bus.emit('audioPlayer', item_.word_url);
      },
      // 计算分数：把处理过后的数组合并在一起，并循环，计算正确题目的个数
      fnNextArrProcessor() {
        // 遍历所有的题目input，获取其选择的项正确或者错误，记录已选的或正确项的index
        // let testObjArr = [];
        let testArr = document.querySelectorAll('.itemList>li');
        testArr.forEach((item, index) => {
          let newItemObj = {};
          let myCheckedIndex = -1;
          let answerIndex = -1;
          let isCorrect = false;
          let itemInput = item.querySelectorAll('input');
          itemInput.forEach((item_, index_) => {
            if (item_.dataset.type === '1') {
              answerIndex = index_;
            }
            if (item_.checked) {
              myCheckedIndex = index_;
            }
            if (myCheckedIndex >= 0 && myCheckedIndex === answerIndex) {
              isCorrect = true;
            }
          });
          newItemObj.myCheckedIndex = myCheckedIndex;
          newItemObj.answerIndex = answerIndex;
          newItemObj.isCorrect = isCorrect;
          newItemObj.liIndex = index;
          this.testObjArr.push(newItemObj);
        });
        // console.log(JSON.stringify(testObjArr));
        let correctNum = 0;
        this.testObjArr.forEach((item, index) => {
          if (item.isCorrect) {
            correctNum++
          }
        });
        this.score = Math.round( (correctNum / this.testObjArr.length) * 100 ) ;
        sessionStorage.testList = JSON.stringify(this.testObjArr);
        console.log('分数：' + this.score + '- 答对个数：' + correctNum);
        this.fnSubmitScore();
      },
      // 提交成绩事件
      fnSubmitScore() {
        let textbook_id = sessionStorage.textbook_id;
        let study_type = sessionStorage.type_id;
        let userMsg = JSON.parse(sessionStorage.userMsg);
        // console.log('user_id:' + userMsg.ID);
        // console.log('textbook_id:' + textbook_id);
        // console.log('test_type:' + test_type);
        // console.log('test_score:' + this.score);
        // console.log('test_number:' + this.dataLength);
        // console.log('study_type:' + study_type);
        // console.log('type:' + this.testType);
        // console.log('unit_id:' + this.unitId);
        // console.log('count:' + this.countTestType);
        this.$ajax({
          method: 'GET',
          url: this.$url.url0,
          params: {
            method: 'SaveTestRecord',
            user_id: userMsg.ID,
            textbook_id: textbook_id,
            test_type: this.test_type,
            test_score: this.score,
            test_number: this.dataLength,
            study_type: study_type,
            type: this.testType, // 0学前测试 1学后测试
            unit_id: this.unitId,
            count: this.countTestType
          }
        }).then(res => {
          let data = res.data;
          console.log(data);
          if (data.msg) {
            this.$router.push({
              path: './wordStudyScore',
              query: {
                score: this.score,
                testType: this.testType,
                countTestType: this.countTestType
              }
            });
          } else {
            this.$alert('提交成绩失败，请重试！', '请尝试重新提交或联系管理员', {
              confirmButtonText: '确定',
              callback: () => {
                return
              }
            });
          }
        })
      }
    },
    computed: {
      // 0学前测试   1闯关测试
      testType() {
        let testType_ = parseInt(this.$route.query.testType) === 0 ? 0 : 1;
        return testType_;
      },
      // 0没学习直接进入测试   1学完了进入测试
      countTestType() {
        let countTestType_ = this.$route.query.countTestType ? parseInt(this.$route.query.countTestType) : 1;
        return countTestType_;
      },
      // 是否是学前测试
      scoreType() {
        let scoreType_ = this.testType === 0 ? '学前测试' : '闯关测试';
        return scoreType_;
      },
    },
    mounted() {
      this.fnGetTestList();
      this.test_type = sessionStorage.version_name + sessionStorage.textbook_name + ' - ' + this.scoreType + ' ( ' + sessionStorage.unit_name + ' )';
    },
    created() {
      this.unitId = sessionStorage.unit_id;
      // 监听提交成绩事件
      this.$bus.on('submitGrade', () => {
        // this.$alert('提交成绩啦！', '提交', {
        //   confirmButtonTex: '确定',
        //   callback: () => {
        //     this.fnNextArrProcessor();
        //   }
        // });
        this.$confirm('确认提交本次测试答案?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => { // 确定
          this.fnNextArrProcessor();
        }).catch(() => { // 取消
          return
        });
      });
    },
    beforeDestroy() {
      this.$bus.off('submitGrade');
    }
  }
</script>

<style scoped>
  .content{
    width:1000px;
    min-height:800px;
    margin:70px auto 20px;
    background-color: #fff;
    padding: 10px;
    box-sizing: border-box;
  }
  .content>.itemBox{
    margin-top:10px;
    width:100%;
  }
  .content>.itemBox>h4{
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
    background-color: #fdfbf4;
    border-right:1px dashed #959595;
    border-top:1px dashed #959595;
    box-sizing: border-box;
  }
  .content>.itemBox>ul>li.selItem{
    background-color: #eee9e3;
  }
  .content>.itemBox>ul>li:nth-child(2n){
    border-right:none;
  }
  .content>.itemBox>ul>li:nth-child(1),
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
  .content>.itemBox>ul>li .selectorBox{
    margin-left:20px;margin-top:10px;
  }
  .content>.itemBox>ul>li .selectorBox label{
    display: block;
    line-height: 28px;
    position: relative;
    padding-left:26px;
    cursor: pointer;
    color:#666;
    font-size:16px;
  }
  .content>.itemBox>ul>li .selectorBox label input{
    position: absolute;
    top:5px;
    left:0;
  }
  .content>.itemBox>ul>li .selectorBox label:hover{
    background-color: #ccc;
  }
</style>
