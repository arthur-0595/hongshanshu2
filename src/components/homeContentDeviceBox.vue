<template>
  <div class="versionBox" id="deviceBox" v-show="showDeviceBox">
    <div class="versionTop clearfix">
      <div class="vBtn" style="visibility: hidden;">牛津译林版2012(三年级起点)-三上词组和惯用法<span>▼</span></div>
      <div class="vBtn" style="visibility: hidden;">Unit1-8<span>▼</span></div>
      <div class="vBtn" @click="fnTabSelf()">智能记忆<span>▼</span></div>
    </div>
    <div class="versionCon">
      <ul class="moudleList clearfix" style="display: none;">
        <li style="background-image:url(../../static/img/remember.png);"><span>智能记忆</span></li>
        <li style="background-image:url(../../static/img/listen.png);"><span>智能听写</span></li>
        <li style="background-image:url(../../static/img/write.png);"><span>智能默写</span></li>
      </ul>
      <ul class="moudleList clearfix" style="display: block;">
        <li style="background-image:url(../../static/img/sentenceListen.png);"><span>例句听力</span></li>
        <li style="background-image:url(../../static/img/sentenceTranslate.png);"><span>例句翻译</span></li>
        <li style="background-image:url(../../static/img/sentenceWrite.png);"><span>例句默写</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home-content-device-box',
    props: {
      showDeviceBox: Boolean
    },
    components: {},
    data() {
      return {
        showDevice: this.showDeviceBox,
      }
    },
    methods: {
      fnTabSelf(){
        this.showDevice = false;
        this.$emit("closeDeviceBox", 3);
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .versionBox {
    position: absolute;
    left: -2px;
    top: -80px;
    height: 580px;
    width: 100%;
  }

  .versionTop {
    width: 100%;
    height: 80px;
  }

  .versionTop .vBtn {
    height: 80px;
    line-height: 80px;
    float: left;
    background-color: #fff;
    padding: 0 15px;
  }

  .versionTop .vBtn:hover {
    cursor: pointer;
    background-color: #008c72;
    color: #fff;
  }

  .moudleList {
    height: 540px;
    padding: 100px 62px;
    box-sizing: border-box;
    background-color: #fff;
  }

  .moudleList > li {
    float: left;
    width: 236px;
    height: 270px;
    background-repeat: no-repeat;
    background-position: center center;
    margin: 0 28px;
    position: relative;
    opacity: .9;
    cursor: pointer;
  }

  .moudleList > li:hover {
    opacity: 1;
  }

  .moudleList > li span {
    font-size: 20px;
    color: #fff;
    position: absolute;
    bottom: 54px;
    left: 86px;
  }
</style>
