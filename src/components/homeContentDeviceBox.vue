<template>
  <div class="versionBox" id="deviceBox" v-show="showDeviceBox">
    <div class="versionTop clearfix">
      <div class="vBtn" style="visibility: hidden;">{{this.$store.state.versionBoxTitle}} <span> ▼</span></div>
      <div class="vBtn" style="visibility: hidden;">{{this.$store.state.unitBoxTitle}} <span> ▼</span></div>
      <div class="vBtn" @click="fnTabSelf()">{{this.$store.state.deviceBoxTitle}} <span> ▼</span></div>
    </div>
    <div class="versionCon">
      <ul class="moudleList clearfix">
        <li :style="{backgroundImage:'url('+ item.imgUrl +')'}"
            @click="fnclickItem(index)"
            v-show="showType(index)"
            v-for="(item,index) in moduleList">
          <span>{{item.name}}</span>
        </li>
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
        moduleList: [
          {
            name: '智能记忆',
            imgUrl: '../../static/img/remember.png'
          }, {
            name: '智能听写',
            imgUrl: '../../static/img/listen.png'
          }, {
            name: '智能默写',
            imgUrl: '../../static/img/write.png'
          }, {
            name: '例句听力',
            imgUrl: '../../static/img/sentenceListen.png'
          }, {
            name: '例句翻译',
            imgUrl: '../../static/img/sentenceTranslate.png'
          }, {
            name: '例句默写',
            imgUrl: '../../static/img/sentenceWrite.png'
          }
        ]
      }
    },
    methods: {
      // 关闭选择模块组件
      fnTabSelf() {
        this.showDevice = false;
        this.$emit("closeDeviceBox", 3);
      },
      // 选中学习类型
      fnclickItem(type_) {
        let typeId = type_ + 1;
        sessionStorage.type_id = typeId;
        sessionStorage.type_name = this.moduleList[type_].name;
        this.$store.commit('updateTypeId', typeId);
        this.$store.commit('updateDeviceBoxTitle', this.moduleList[type_].name);
        this.fnTabSelf();
        this.$bus.emit('getStudyProgress');
      },
      // 获取默认选中类型
      showType(index_) {
        let typeId = sessionStorage.type_id;
        this.$store.commit('updateTypeId', typeId);
        if (typeId <= 3 && (index_ + 1) <= 3) {
          return true
        } else if (typeId > 3 && (index_ + 1) > 3) {
          return true
        } else {
          return false
        }
      }
    },
    mounted() {
    },
    computed: {

    },
    created() {
      this.$bus.on('openStudyType', (type_) => {
        this.fnclickItem(type_ - 1);
      });
    },
    beforeDestroy() {
      this.$bus.off('openStudyType', (type_) => {
        this.fnclickItem(type_ - 1);
      });
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
