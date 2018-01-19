<template>
  <div class="versionBox" id="unitBox" v-show="showUnitBox">
    <div class="versionTop clearfix">
      <div class="vBtn" style="visibility: hidden;">牛津译林版2012(三年级起点)-三上词组和惯用法<span>▼</span></div>
      <div class="vBtn" @click="fnTabSelf()">Unit1-8<span>▼</span></div>
    </div>
    <div class="versionCon">
      <ul class="unitList clearfix" id="unitList">
        <li>
          <div class="unitName">Unit 1</div>
          <div class="markList">
            <span class="hasStudy">闯</span>
            <span>|</span>
            <span>听</span>
            <span>|</span>
            <span>默</span>
          </div>
        </li>
        <li class="curSelect">
          <div class="unitName">Unit 2</div>
          <div class="markList">
            <span class="hasStudy">闯</span>
            <span>|</span>
            <span>听</span>
            <span>|</span>
            <span>默</span>
          </div>
        </li>
        <li class="noStudyUnit">
          <div class="unitName">Unit 2</div>
          <div class="markList">
            <span>闯</span>
            <span>|</span>
            <span>听</span>
            <span>|</span>
            <span>默</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home-content-unit-box',
    props:{
      showUnitBox:Boolean
    },
    components: {},
    data() {
      return {
        showUnit: this.showUnitBox,
      }
    },
    methods: {
      fnTabSelf(){
        this.showUnit = false;
        this.$emit("closeUnitBox" , 2)
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
   .versionBox{
    position: absolute;
    left: -2px;
    top: -80px;
    height:580px;
    width:100%;
  }
   .versionTop{
    width:100%;
    height:80px;
  }
  .versionTop .vBtn{
    height:80px;
    line-height: 80px;
    float:left;
    background-color: #fff;
    padding:0 15px;
  }
   .versionTop .vBtn:hover{
    cursor: pointer;
    background-color: #008c72;
    color:#fff;
  }
  .unitList{
    height: 540px;
    width:100%;
    padding:20px 40px;
    box-sizing: border-box;
    background-color: #fff;
  }
  .unitList>li{
    float:left;
    width: 180px;
    height:90px;
    border:2px solid #99cccc;
    background-color: #eefffc;
    margin:16px;
    overflow: hidden;
  }
  .unitList>li:hover,
  .unitList>li.curSelect{
    border:2px solid #ffb13c;
    cursor: pointer;
  }
  .unitList>li.noStudyUnit{
    background-color: #fff;
  }
  .unitList>li.noStudyUnit .unitName{
    color:#d0e6e6;
  }
  .unitList>li .unitName{
    width:100%;
    height:60px;
    line-height: 60px;
    text-align: center;
    font-size:22px;
    color:#6bb3a3;
  }
  .unitList>li.noStudyUnit .markList{
    background-color: #eef7f5;
  }
  .unitList>li .markList{
    width:100%;
    height:30px;
    background-color: #dbf3ee;
    line-height: 30px;
    text-align: center;
    font-size:14px;
    color:#6bb3a3;
  }
  .unitList>li .markList > span{
    margin:6px;
  }
  .unitList>li .markList > span.hasStudy{
    color:#ff6600 !important
  }
</style>
