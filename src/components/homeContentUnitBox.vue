<template>
  <div class="versionBox" id="unitBox" v-show="showUnitBox">
    <div class="versionTop clearfix">
      <div class="vBtn" style="visibility: hidden;">{{this.$store.state.versionBoxTitle}} <span> ▼</span></div>
      <div class="vBtn" @click="fnTabSelf()">{{this.$store.state.unitBoxTitle}} <span> ▼</span></div>
    </div>
    <div class="versionCon">
      <ul class="unitList clearfix" id="unitList">
        <li v-for="(item,index) in unitList"
          @click="fnclickUnitItem(item)"
            :title="'学习次数：'+item.study_count+'---学前测试分数:'+item.score+'---闯关测试最高得分:'+item.top_score">
          <div class="unitName">{{item.unit_name}}</div>
          <div class="markList">
            <span>{{item.study_count}}</span>
            <span>|</span>
            <span>{{item.score}}</span>
            <span>|</span>
            <span>{{item.top_score}}</span>
          </div>
        </li>
        <!--<li class="noStudyUnit">-->
          <!--<div class="unitName">Unit 2</div>-->
          <!--<div class="markList">-->
            <!--<span class="hasStudy">闯</span>-->
            <!--<span>|</span>-->
            <!--<span>听</span>-->
            <!--<span>|</span>-->
            <!--<span>默</span>-->
          <!--</div>-->
        <!--</li>-->
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home-content-unit-box',
    props:{
      showUnitBox: Boolean
    },
    components: {},
    data() {
      return {
        showUnit: this.showUnitBox,
      }
    },
    methods: {
      // 切换显示隐藏单元组件
      fnTabSelf() {
        this.showUnit = false;
        this.$emit('closeUnitBox', 2);
      },
      // 点击选中单元事件
      fnclickUnitItem(obj_) {
        this.$store.commit('updateUnitBoxTitle', obj_.unit_name);
        this.$store.commit('updateUnitId', obj_.id);
        this.fnTabSelf();
        sessionStorage.unit_id = obj_.id;
        sessionStorage.unit_name = obj_.unit_name;
      }
    },
    computed: {
      unitList() {
        return this.$store.state.unitList;
      }
    },
    mounted() {
      // console.log(this.$store.state.unitList);
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
    overflow: auto;
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
    margin:1px;
  }
  .unitList>li .markList > span.hasStudy{
    color:#ff6600 !important
  }
</style>
