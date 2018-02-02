<template>
  <div id="home">
    <home-head></home-head>
    <home-content @showCoverBox = 'fnShowCoverBox'></home-content>
    <home-foot></home-foot>
    <div class="coverBox" id="coverBox" v-show="showCover"></div>
  </div>
</template>

<script>
  import homeHead from '../components/homeHead'
  import homeContent from '../components/homeContent'
  import homeFoot from '../components/homeFoot'

  export default {
    name: 'appHome',
    components: {homeHead, homeContent, homeFoot},
    data() {
      return {
        showCover: false,
      }
    },
    methods: {
      fnShowCoverBox(bool_) {
        this.showCover = bool_;
      },
      // 获取缓存中的模块ID,若未undefined,则设置默认为 1智能记忆
      fnSetTypeId() {
        let typeId = sessionStorage.type_id;
        if (typeId) { // 如果缓存中存在typeId ，则设置vuex中typeId的值
          this.$store.commit('updateTypeId' , typeId);
        } else {
          typeId = 1;
          this.$store.commit('updateTypeId' , typeId);
          sessionStorage.type_id = typeId;
        }
      },
      // 获取用户信息中的用户Id
      fnGetUserId() {
        let userMsg = JSON.parse(sessionStorage.userMsg);
        let userId = userMsg.ID;
        this.$store.commit('updateUserId', userId);
      }
    },
    mounted() {
      // 设置模块类型默认为 1 智能记忆
      sessionStorage.type_id = 1;
    },
    created() {
      this.fnSetTypeId();
      this.fnGetUserId();
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
