<template>
  <div class="wordWrapper">
    <div class="version"> {{version_name}} - {{textbook_name}} - {{unit_name}}</div>
    <div class="centerBtns clearfix">
      <!--单元下拉选择框-->
      <div class="unitSel">
        <div class="title">选择单元：</div>
        <div class="unitBox"  @click="showUnitBox = !showUnitBox">
          {{unit_name}}
          <ul class="unitList">
            <li class="unitItem" v-if="showUnitBox" v-for="item in units" @click="showUnitWords(item)"> {{item.unit_name}} </li>
          </ul>
        </div>
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
          <td style="width:210px">单词 <input type="checkbox" @click="toShowName"/>显示</td>
          <td>单词 <input type="checkbox" @click="toShowMean" />词义</td>
        </tr>
        <tr v-for="item in words">
          <td>{{item.id}}</td>
          <td>{{item.phonogram}} <img class="hearing" @click="reading(item.word_url)" src="../../static/img/study/hearing-1.png" alt=""> </td>
          <td><span class="hidden" ref="wordName">{{item.word_name}}</span></td>
          <td><span class="hidden" ref="wordMean" >{{item.word_mean}}</span></td>
        </tr>
      </table>
    </div>
    <!--分页-->
    <div class="pagination">
      <span class="pre" @click="beforePage"> <<上一页 </span>
      <span class="next" @click="nextPage"> >>下一页 </span>
      <ul class="pageList clearfix">
        <li :class="{curPage: item===pageIndex}" v-for="item in pageNum" @click="selectPage(item)">{{item}}</li>
      </ul>
    </div>

    <audio :src="wordUrl" ref="audio" autoplay="autoplay"></audio>
  </div>
</template>

<script>
  export default {
    name: 'home-word-book',
    components: {},
    data() {
      return {
        userMsg: {},
        version_name: '',
        textbook_id: 1,
        textbook_name: '',
        unit_id: 1,
        unit_name: '',
        type_id: 1,
        units: [],
        words: [],
        wordTotal: 0,
        pageIndex: 1,
        pageSize: 10,
        pageNum: [1],
        showUnitBox: false,
        showName: false,
        showMean: false,
        wordUrl: ''
      }
    },
    methods: {
      _getUnits() {
        this.$ajax({
          method: 'GET',
          url: this.$url.url0,
          params:{
            method: 'GetUnitByTextBookID',
            user_id: this.userMsg.ID,
            textbook_id: this.textbook_id,
            type_id: this.type_id
          }
        }).then((res) => {
          let data = res.data
          this.units = data
        })
      },
      _getWords(textbook_id, unitId, pageIndex, pageSize) {
        this.$ajax({
          method: 'GET',
          url: this.$url.url0,
          params:{
            method: 'GetWordsByUnitID',
            textbook_id: textbook_id,
            unit_id: unitId,
            page_index: pageIndex,
            page_size: pageSize
          }
        }).then((res) => {
          this.words = res.data.data
          this.wordTotal = res.data.total
          this.pageNum = []
          var n = Math.ceil(this.wordTotal/this.pageSize)
          for (var i = 0; i < n; i++) {
            this.pageNum.push(i+1)
          }
        })
      },
      showUnitWords(item) {
        var unitId = item.id,
        pageIndex = 1,
        pageSize = this.pageSize;
        this.pageIndex = 1
        this.unit_id = unitId
        this.unit_name = item.unit_name
        this._getWords(this.textbook_id, unitId, pageIndex, pageSize)
      },
      selectPage(item) {
         this.pageIndex = item
         this._getWords(this.textbook_id, this.unit_id, item, this.pageSize)
      },
      beforePage() {
        this.pageIndex = this.pageIndex-1
        if(this.pageIndex<1){
          this.pageIndex = 1
          return
        }else{
          this._getWords(this.textbook_id, this.unit_id, this.pageIndex, this.pageSize)
        }
      },
      nextPage() {
        this.pageIndex = this.pageIndex + 1
        if(this.pageIndex>this.pageNum.length){
          this.pageIndex = this.pageNum.length
          return
        }else{
          this._getWords(this.textbook_id, this.unit_id, this.pageIndex, this.pageSize)
        }
      },
      toShowName() {
        this.showName = !this.showName
        if(this.showName){
          this.$refs.wordName.forEach((item) => {
            item.style.opacity = '1'
          })
        }else{
          this.$refs.wordName.forEach((item) => {
            item.style.opacity = ''
          })
        }
      },
      toShowMean() {
        this.showMean = !this.showMean
        if(this.showMean){
          this.$refs.wordMean.forEach((item) => {
            item.style.opacity = '1'
          })
        }else{
          this.$refs.wordMean.forEach((item) => {
            item.style.opacity = ''
          })
        }
      },
      reading(wordurl) {
        this.wordUrl = this.$url.url2 + wordurl.replace(/\\/g, '/')
        this.$refs.audio.play()
      }
    },
    created() {
      this.userMsg = JSON.parse(sessionStorage.getItem('userMsg'));
      this.textbook_id = JSON.parse(sessionStorage.getItem('textbook_id'));
      this.unit_id = JSON.parse(sessionStorage.getItem('unit_id'));
      this.version_name = sessionStorage.getItem('version_name');
      this.unit_name = sessionStorage.getItem('unit_name');
      this.textbook_name = sessionStorage.getItem('textbook_name')
      this.type_id = JSON.parse(sessionStorage.getItem('type_id'));
      this._getUnits()
      this._getWords(this.textbook_id, this.unit_id, this.pageIndex, this.pageSize)
      
    },
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
    /*float: left;*/
    height: 32px;
    line-height: 32px;
    /*vertical-align: middle;*/
  }

  .centerBtns .unitSel > .title {
    /*display: inline-block;*/
    float: left;
    /*width: 60px;*/
    height: 32px;
    line-height: 32px;
  }

/*  .centerBtns .unitSel > select {
    width: 140px;
    height: 32px;
    font-size: 12px;
    cursor: pointer;
    border: 1px solid #ccc;
  }*/

  .centerBtns .unitSel > .unitBox {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    width: 140px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    padding-left: 10px;
    cursor: pointer;
    border: 1px solid #ccc;
    /*overflow: hidden;*/
  }

   .centerBtns .unitSel > .unitBox > .unitList {
    position: absolute;
    box-sizing: border-box;
    width: 140px;
    top: 100%;
    left: -1px;
    border: 1px solid #ccc; 
    background-color: #fff;
    z-index: 10;
   }
  
  .centerBtns .unitSel > .unitBox > .unitList > li {
    
    height: 32px;
    padding-left: 10px;
    /*border-bottom: 1px solid #ccc;*/
    /*background-color: green;*/
  }

  .centerBtns .unitSel > .unitBox > .unitList > li:hover {
    background-color: #008C72;
    color: #fff;
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

  .wordList > table tr:nth-child(2n) {
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

  .wordList > table tr td img.hearing {
    width: 60px;
    margin-left: 5px;
    opacity: 0;
  }
  
  .wordList > table tr td img.hearing:hover {
    opacity: 1;
  }

  .wordList > table tr td span.show {
    opacity: 1;
  }

  .wordList > table tr td span.hidden {
    opacity: 0;
  }
  
  .wordList > table tr td:hover span.hidden {
    opacity: 1;
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
