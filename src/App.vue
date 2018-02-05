<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  * {
    margin: 0;
    border: 0;
    padding: 0;
    font-style: normal;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    font-family: "微软雅黑";
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }

  ul,
  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  i {
    font-style: normal;
  }

  img {
    border: none;
  }

  img, a, button, em, del, strong, var, label, cite, small, time, mark, code, textarea {
    display: inline-block;
  }

  button, input {
    outline: medium;
  }

  .clearfix:after {
    content: ' ';
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
  }

  .displayNone {
    display: none;
  }

  #app {
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
