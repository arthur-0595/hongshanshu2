<template>
  <div id="home">
    <home-head></home-head>
    <router-view @showCoverBox='fnShowCoverBox'/>
    <home-foot></home-foot>
    <div class="coverBox" id="coverBox" v-show="showCover"></div>
  </div>
</template>

<script>
  import homeHead from '../components/homeHead'
  import homeFoot from '../components/homeFoot'

  export default {
    name: 'appHome',
    components: {homeHead, homeFoot},
    data() {
      return {
        showCover: false,
        current: 'homeContent',
      }
    },
    methods: {
      fnShowCoverBox(bool_) {
        this.showCover = bool_;
      },
      // 获取缓存中的模块ID,若未undefined,则设置默认为 1智能记忆
      fnSetTypeId() {
        let typeId = sessionStorage.type_id;
        console.log('类型：' + typeId);
        if (typeId) { // 如果缓存中存在typeId ，则设置vuex中typeId的值
          this.$store.commit('updateTypeId', typeId);
          this.$store.commit('updateDeviceBoxTitle', sessionStorage.type_name);
        } else {
          typeId = 1;
          this.$store.commit('updateTypeId', typeId);
          sessionStorage.type_id = typeId;
        }
      }
    },
    computed: {},
    mounted() {
    },
    created() {
      this.fnSetTypeId();
    },
    beforeDestroy() {
    }
  }
</script>

<style scoped>
  #home {
    background-color: #efefef;
  }

  .coverBox {
    width: 100%;
    height: 100%;
    opacity: 0.7;
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    background: rgb(51, 51, 51);
  }
</style>
