<template>
  <div class="courseCon" id="courseCon" v-show="showCourse">
    <ul>
      <li class="words">
        <ul>
          <li class="leftName">智能单词</li>
          <li>
            <span class="leftIcon" style="background-image:url(../assets/img/memory.png);"></span>
            <span class="name">智能记忆</span>
          </li>
          <li>
            <span class="leftIcon" style="background-image:url(../assets/img/dictation-fff.png);"></span>
            <span class="name">智能听写</span>
          </li>
          <li>
            <span class="leftIcon" style="background-image:url(../assets/img/write-fff.png);"></span>
            <span class="name">智能默写</span>
          </li>
        </ul>
      </li>
      <li class="sentence">
        <ul>
          <li class="leftName">智能例句</li>
          <li>
            <span class="leftIcon" style="background-image:url(../assets/img/hearing.png);"></span>
            <span class="name">例句听力</span>
          </li>
          <li>
            <span class="leftIcon" style="background-image:url(../assets/img/translation.png);"></span>
            <span class="name">例句翻译</span>
          </li>
          <li>
            <span class="leftIcon" style="background-image:url(../assets/img/example-write.png);"></span>
            <span class="name">例句默写</span>
          </li>
        </ul>
      </li>
      <li class="expand">
        <ul>
          <li class="leftName">拓展学习</li>
          <li>
            <span class="leftIcon" style="background-image:url(../assets/img/voice.png);"></span>
            <span class="name">智能语音</span>
          </li>
          <li>
            <span class="leftIcon" style="background-image:url(../assets/img/reading.png);"></span>
            <span class="name">智能阅读</span>
          </li>
          <li>
            <span class="leftIcon" style="background-image:url(../assets/img/spoken.png);"></span>
            <span class="name">智能口语</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'home-course-center',
    props:{
      showCourse:{
        type: Boolean
      }
    },
    components: {},
    data() {
      return {

      }
    },
    methods: {},
    mounted() {

    }
  }
</script>

<style scoped>
  .courseCon {
    width: 1000px;
    height: 620px;
    padding: 100px 80px;
    box-sizing: border-box;
    border: 1px solid #666;
    border-top: none;
    background: #fff;
    position: absolute;
    top: 80px;
    left: -198px;
    z-index: 2;
  }

  .courseCon > ul {
    width: 100%;
  }

  .courseCon > ul > li {
    width: 100%;
    height: 120px;
    border-bottom: 1px dashed #999;
  }

  .courseCon > ul > li > ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
  }

  .courseCon > ul > li > ul > li {
    width: 220px;
    height: 80px;
    line-height: 80px;
    background-color: #008c72;
    text-align: center;
    color: #fff;
    margin: 20px 0;
    font-size: 16px;
  }

  .courseCon > ul > li.sentence > ul > li {
    background-color: #31a594;

  }

  .courseCon > ul > li.expand > ul > li {
    background-color: #d6f1f1;
    color: #666;
  }

  .courseCon > ul > li .leftIcon {
    display: inline-block;
    vertical-align: top;
    width: 44px;
    height: 80px;
    background:url(../assets/img/memory.png) no-repeat center;
  }

  .courseCon > ul > li .name {
    display: inline-block;
    vertical-align: top;
  }

  .courseCon > ul > li > ul > li.leftName {
    width: 120px;
    height: 80px;
    background: #fff;
    color: #999;
    font-size: 16px;
    line-height: 80px;
    padding: 0;
    margin-left: 0;
  }
</style>
