<template>
  <div id="home" >
    <home-head></home-head>
    <home-con></home-con>
    <home-foot></home-foot>
  </div>
</template>

<script>
  import homeHead from '../components/homeHead'
  import homeCon from '../components/homeCon'
  import homeFoot from '../components/homeFoot'
  export default {
    name: 'appHome',
    components: {homeHead , homeCon , homeFoot},
    data() {
      return {}
    },
    methods: {},
    mounted() {

    }
  }
</script>

<style scoped>
#home{
  background-color: #efefef;
}
</style>
