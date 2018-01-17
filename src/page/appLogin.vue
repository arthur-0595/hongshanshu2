<template>
  <div id="login">
    <login-head></login-head>
    <login-main></login-main>
    <login-foot></login-foot>
  </div>
</template>

<script>
  import loginHead from '../components/loginHead.vue'
  import loginMain from '../components/loginMain.vue'
  import loginFoot from '../components/loginFoot.vue'

  export default {
    name: 'appLogin',
    components: {loginHead, loginMain, loginFoot},
    data() {
      return {}
    },
    methods: {},
    mounted() {

    }
  }
</script>

<style scoped>

</style>
