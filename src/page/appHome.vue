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
      fnShowCoverBox(bool_){
        this.showCover = bool_;
      }
    },
    mounted() {

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
