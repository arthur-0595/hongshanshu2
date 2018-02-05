<template>
  <div class="wordWrapper">
    <div class="version">牛津译林版2012(三年级起点) - 三上词组和惯用法</div>
    <div class="centerBtns clearfix">
      <!--单元下拉选择框-->
      <div class="unitSel">
        选择单元：
        <select name="" id="">
          <option value="" selected="selected">Unit1-8</option>
          <option value="">全部单词</option>
        </select>
      </div>
      <!--中间选择按钮-->
      <!--<div class="radioBox">-->
        <!--<label for="r1" class="choosed"><input type="radio" id="r1" name="classify" checked="checked"/> 总单词（12）</label>-->
        <!--<label for="r2"><input type="radio" id="r2" name="classify"/> 生词（3）</label>-->
        <!--<label for="r3"><input type="radio" id="r3" name="classify"/> 熟词（4）</label>-->
        <!--<label for="r4"><input type="radio" id="r4" name="classify"/> 剩余（12）</label>-->
        <!--<span class="newWordPer">生词比： 10%</span>-->
        <!--<span class="proPer">进度 <span class="long"><i class="curPer"></i></span> 10%</span>-->
      <!--</div>-->
      <!--<div class="boBtn">单词播放机</div>-->
    </div>
    <!--单词列表-->
    <div class="wordList">
      <table>
        <tr class="tHeader">
          <td style="width:50px">序号</td>
          <td style="width:210px">音标（读音 ）</td>
          <td style="width:210px">单词 <input type="checkbox"/>显示</td>
          <td>单词 <input type="checkbox"/>词义</td>
        </tr>
        <tr>
          <td>1</td>
          <td>[ei]</td>
          <td style="display: block;">a</td>
          <td>conj. 一个</td>
        </tr>
        <tr class="gray">
          <td>2</td>
          <td>['æʤiktiv]</td>
          <td>adjective</td>
          <td>n. 形容词</td>
        </tr>
        <tr>
          <td>3</td>
          <td>['ɑ:ftə'nu:n]</td>
          <td>afternoon</td>
          <td>n. 下午，午后</td>
        </tr>
        <tr class="gray">
          <td>4</td>
          <td>[ə'gen]</td>
          <td>again</td>
          <td>adv. 再一次，又一次</td>
        </tr>
      </table>
    </div>
    <!--分页-->
    <div class="pagination">
      <span class="pre"> <<上一页 </span>
      <span class="next"> >>下一页 </span>
      <ul class="pageList clearfix">
        <li>1</li>
        <li class="curPage">2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home-word-book',
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
  .wordWrapper {
    width: 1000px;
    height: 669px;
    margin: 20px auto;
    background-color: #fff;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
  }

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

  .version > .backHome {
    float: right;
  }

  /*中间按钮*/
  .centerBtns {
    font-size: 12px;
    height: 32px;
    line-height: 32px;
    margin: 15px 0;
    position: relative;
  }

  .centerBtns .unitSel {
    float: left;
  }

  .centerBtns .unitSel > select {
    width: 140px;
    height: 32px;
    font-size: 12px;
    cursor: pointer;
    border: 1px solid #ccc;
  }

  .radioBox {
    float: left;
    margin: 0 12px;
  }

  .radioBox label {
    position: relative;
    padding-left: 22px;
    cursor: pointer;
  }

  .radioBox label.choosed {
    color: #008c72;
  }

  .radioBox input {
    position: absolute;
    left: 0;
    top: -1px;
  }

  .radioBox .newWordPer {
    margin: 0 10px;
  }

  .radioBox .proPer .long {
    display: inline-block;
    vertical-align: middle;;
    width: 50px;
    height: 4px;
    background-color: #aaa;
    margin: 0 6px;
    overflow: hidden;
    position: relative;
  }

  .radioBox .proPer .long > .curPer {
    width: 20px;
    height: 5px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #ff9900;
  }

  /*单词播放机*/
  .boBtn {
    position: absolute;
    right: 0;
    color: #fff;
    background-color: #ff9900;
    width: 72px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }

  .boBtn:hover {
    cursor: pointer;
    background-color: #fdae39;
  }

  /*单词表格*/
  .wordList {
    width: 100%;
    /*max-height: 460px;*/
  }

  .wordList > table {
    width: 100%;
  }

  .wordList > table tr.gray {
    background-color: #f7f7f7;
  }

  .wordList > table tr:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }

  .wordList > table tr td {
    height: 38px;
    text-align: center;
    font-size: 14px;
    line-height: 38px;
    border: 1px solid #e8e8e8;
  }

  .wordList > table .tHeader {
    background-color: #008c72;
    height: 40px;
    color: #fff;

  }

  .wordList > table .tHeader:hover {
    cursor: default;
    background-color: #008c72;
  }

  .wordList > table .tHeader > td {
    line-height: 40px;
    font-size: 16px;
  }

  .wordList > table .tHeader > td input[type="checkbox"] {
    vertical-align: middle;
    cursor: pointer;
  }

  /*分页*/
  .pagination {
    position: absolute;
    bottom: 10px;
    right: 10px;
    height: 30px;
    line-height: 30px;
  }

  .pagination > span {
    display: inline-block;
    border: 1px solid #ddd;
    padding: 0 10px;
    color: #666;
    font-size: 14px;
    cursor: pointer;
  }

  .pagination > span.pre {
    float: left;
  }

  .pagination > span.next {
    float: right;
  }

  .pagination > .pageList {
    overflow: hidden;
    margin: 0 96px;
  }

  .pagination > .pageList > li {
    float: left;
    margin: 0 2px;
    padding: 0 8px;
    color: #666;
    border: 1px solid #ddd;
    cursor: pointer;
  }

  .pagination > .pageList > li.curPage,
  .pagination > span.pre:hover,
  .pagination > span.next:hover,
  .pagination > .pageList > li:hover {
    border: 1px solid #008c72;
    background-color: #13a995;
    color: #fff;
  }
</style>
