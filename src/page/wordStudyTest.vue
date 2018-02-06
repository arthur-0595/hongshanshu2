<template>
  <div id="studyTest">
    <testHead></testHead>
    <div class="content">
      <div class="itemBox">
        <h4>英译汉</h4>
        <ul class="itemList">
          <li class="selItem">
            <div class="wordLine">
              <span class="num">1.</span>
              <span class="word">alive</span>
            </div>
            <div class="selectorBox">
              <label for="y1-a"><input type="radio" checked="checked" name="Y-itemsel1" id="y1-a"/>n. 助手</label>
              <label for="y1-b"><input type="radio" name="Y-itemsel1" id="y1-b"/>adv. 在周围；在附近prep. 在......周围；大约</label>
              <label for="y1-c"><input type="radio" name="Y-itemsel1" id="y1-c"/>adv. 在周围；在附近prep. 在......周围；大约adv. 在周围；在附近prep. 在......周围；大约</label>
              <label for="y1-d"><input type="radio" name="Y-itemsel1" id="y1-d"/>adj. 积极的，主动的</label>
            </div>
          </li>
          <li>
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
          </li>
        </ul>
      </div>
      <div class="itemBox">
        <h4>汉译英</h4>
        <ul class="itemList">
          <li>
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
          </li>
          <li>
            <div class="wordLine">
              <span class="num">2.</span>
              <span class="word">n. 臂，支架；（美）武器，武力  v. 以......装备，武装起来</span>
            </div>
            <div class="selectorBox">
              <label for="h2-a"><input type="radio" name="H-itemsel2" id="h2-a"/>atract</label>
              <label for="h2-b"><input type="radio" name="H-itemsel2" id="h2-b"/>attend</label>
              <label for="h2-c"><input type="radio" name="H-itemsel2" id="h2-c"/>arrive</label>
              <label for="h2-d"><input type="radio" name="H-itemsel2" id="h2-d"/>active</label>
            </div>
          </li>
          <li>
            <div class="wordLine">
              <span class="num">3.</span>
              <span class="word">adj. 积极的</span>
            </div>
            <div class="selectorBox">
              <label for="h3-a"><input type="radio" name="H-itemsel3" id="h3-a"/>atract</label>
              <label for="h3-b"><input type="radio" name="H-itemsel3" id="h3-b"/>attend</label>
              <label for="h3-c"><input type="radio" name="H-itemsel3" id="h3-c"/>arrive</label>
              <label for="h3-d"><input type="radio" name="H-itemsel3" id="h3-d"/>active</label>
            </div>
          </li>
          <li>
            <div class="wordLine">
              <span class="num">3.</span>
              <span class="word">adj. 积极的</span>
            </div>
            <div class="selectorBox">
              <label for="h3-a"><input type="radio" name="H-itemsel3" id="h3-a"/>atract</label>
              <label for="h3-b"><input type="radio" name="H-itemsel3" id="h3-b"/>attend</label>
              <label for="h3-c"><input type="radio" name="H-itemsel3" id="h3-c"/>arrive</label>
              <label for="h3-d"><input type="radio" name="H-itemsel3" id="h3-d"/>active</label>
            </div>
          </li>
        </ul>
      </div>
      <div class="itemBox">
        <h4>听力理解</h4>
        <ul class="itemList">
          <li>
            <div class="wordLine">
              <span class="num">1.</span>
              <span class="readBtn"></span>
            </div>
            <div class="selectorBox">
              <label for="y2-a"><input type="radio" name="Y-itemsel2" id="y2-a"/>n. 助手</label>
              <label for="y2-b"><input type="radio" name="Y-itemsel2" id="y2-b"/>adv. 在周围；在附近prep. 在......周围；大约</label>
              <label for="y2-c"><input type="radio" name="Y-itemsel2" id="y2-c"/>adv. 在周围；在附近prep. 在......周围；大约adv. 在周围；在附近prep. 在......周围；大约</label>
              <label for="y2-d"><input type="radio" name="Y-itemsel2" id="y2-d"/>adj. 积极的，主动的</label>
            </div>
          </li>
          <li>
            <div class="wordLine">
              <span class="num">2.</span>
              <span class="readBtn"></span>
            </div>
            <div class="selectorBox">
              <label for="y2-a"><input type="radio" name="Y-itemsel2" id="y2-a"/>n. 助手</label>
              <label for="y2-b"><input type="radio" name="Y-itemsel2" id="y2-b"/>adv. 在周围；在附近prep. 在......周围；大约</label>
              <label for="y2-c"><input type="radio" name="Y-itemsel2" id="y2-c"/>adv. 在周围；在附近prep. 在......周围；大约adv. 在周围；在附近prep. 在......周围；大约</label>
              <label for="y2-d"><input type="radio" name="Y-itemsel2" id="y2-d"/>adj. 积极的，主动的</label>
            </div>
          </li>
          <li>
            <div class="wordLine">
              <span class="num">3.</span>
              <span class="readBtn"></span>
            </div>
            <div class="selectorBox">
              <label for="y2-a"><input type="radio" name="Y-itemsel2" id="y2-a"/>n. 助手</label>
              <label for="y2-b"><input type="radio" name="Y-itemsel2" id="y2-b"/>adv. 在周围；在附近prep. 在......周围；大约</label>
              <label for="y2-c"><input type="radio" name="Y-itemsel2" id="y2-c"/>adv. 在周围；在附近prep. 在......周围；大约adv. 在周围；在附近prep. 在......周围；大约</label>
              <label for="y2-d"><input type="radio" name="Y-itemsel2" id="y2-d"/>adj. 积极的，主动的</label>
            </div>
          </li>
          <li>
            <div class="wordLine">
              <span class="num">3.</span>
              <span class="readBtn"></span>
            </div>
            <div class="selectorBox">
              <label for="y2-a"><input type="radio" name="Y-itemsel2" id="y2-a"/>n. 助手</label>
              <label for="y2-b"><input type="radio" name="Y-itemsel2" id="y2-b"/>adv. 在周围；在附近prep. 在......周围；大约</label>
              <label for="y2-c"><input type="radio" name="Y-itemsel2" id="y2-c"/>adv. 在周围；在附近prep. 在......周围；大约adv. 在周围；在附近prep. 在......周围；大约</label>
              <label for="y2-d"><input type="radio" name="Y-itemsel2" id="y2-d"/>adj. 积极的，主动的</label>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <home-foot></home-foot>
  </div>
</template>

<script>
  import testHead from '../components/testHead'
  import homeFoot from '../components/homeFoot'

  export default {
    name: 'word-study-test',
    components: {testHead, homeFoot},
    data() {
      return {}
    },
    methods: {},
    mounted() {

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
