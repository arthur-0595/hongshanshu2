<template>
  <div id="login">
    <loginHead></loginHead>
    <loginMain></loginMain>
    <loginFoot></loginFoot>
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
      // this.$api.get('topics', null, r => {
      //   console.log(r)
      // })
    }
  }
</script>

<style scoped>

</style>
