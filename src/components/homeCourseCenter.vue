<template>
  <div class="courseCon" id="courseCon" v-show="showCourse">
    <el-popover
      ref="popover1"
      placement="top-start"
      width="200"
      trigger="hover"
      content="帮你快速实现词汇母语式的记忆效果，40小时牢记3000生词，永久不忘。词汇学习从此无忧！
      难度指数：★">
    </el-popover>
    <el-popover
      ref="popover2"
      placement="top-start"
      width="200"
      trigger="hover"
      content="快速训练你的听读音写单词的能力，具有独创的按照拼音音节抄写单词功能和拼写错误纠正功能。
      难度指数：★★">
    </el-popover>
    <el-popover
      ref="popover3"
      placement="top-start"
      width="200"
      trigger="hover"
      content="这个模块通过智能化记忆引擎自动管理你的记忆，分出生词、夹生词和熟词，实现快速牢记的效果。
      难度指数：★★">
    </el-popover>
    <el-popover
      ref="popover4"
      placement="top-start"
      width="200"
      trigger="hover"
      content="由记忆引擎驱动，通过听音组句训练，快速提高听力，培养语感，并能积累语法知识。
      难度指数：★★★">
    </el-popover>
    <el-popover
      ref="popover5"
      placement="top-start"
      width="200"
      trigger="hover"
      content="由记忆引擎驱动，通过连词成句训练，快速提高翻译能力，为英语写作打下坚实基础。
      难度指数：★★★">
    </el-popover>
    <el-popover
      ref="popover6"
      placement="top-start"
      width="200"
      trigger="hover"
      content="根据中文句意写出对应的英文句子，提高英语书面表达能力，学习这个模块需要有过硬的单词拼写能力、较为完整的句法知识和语法知识，适合英语基础较好的学习者。
      难度指数：★★★★★">
    </el-popover>
    <el-popover
      ref="popover7"
      placement="top-start"
      width="200"
      trigger="hover"
      content="词汇学习第二乐园，完成同步学习的同时扩充你的词汇量，以词汇记忆，听写，默写为主的全方位训练，培养学习者良好的英语学习习惯。">
    </el-popover>
    <el-popover
      ref="popover8"
      placement="top-start"
      width="200"
      trigger="hover"
      content="科学，有趣的英文提速工具，通过它你可以快速消灭生词，改正不良阅读习惯，轻松将阅读速度和效率提高2至5倍。">
    </el-popover>
    <el-popover
      ref="popover9"
      placement="top-start"
      width="200"
      trigger="hover"
      content="课程按场景进行分类，通过学习引擎技术，帮助学习者不断复习、巩固所学内容。先输入再输出，逐步实现自由表达。">
    </el-popover>

    <ul>
      <li class="words">
        <ul>
          <li class="leftName">智能单词</li>
          <li class="item" v-popover:popover1
            @click="fnOpenStudyType(1)">
            <span class="leftIcon" style="background-image:url(../../static/img/memory.png);"></span>
            <span class="name">智能记忆</span>
          </li>
          <li class="item" v-popover:popover2
              @click="fnOpenStudyType(2)">
            <span class="leftIcon" style="background-image:url(../../static/img/dictation-fff.png);"></span>
            <span class="name">智能听写</span>
          </li>
          <li class="item" v-popover:popover3
              @click="fnOpenStudyType(3)">
            <span class="leftIcon" style="background-image:url(../../static/img/write-fff.png);"></span>
            <span class="name">智能默写</span>
          </li>
        </ul>
      </li>
      <li class="sentence">
        <ul>
          <li class="leftName">智能例句</li>
          <li class="item" v-popover:popover4
              @click="fnOpenStudyType(4)">
            <span class="leftIcon" style="background-image:url(../../static/img/hearing.png);"></span>
            <span class="name">例句听力</span>
          </li>
          <li class="item" v-popover:popover5
              @click="fnOpenStudyType(5)">
            <span class="leftIcon" style="background-image:url(../../static/img/translation.png);"></span>
            <span class="name">例句翻译</span>
          </li>
          <li class="item" v-popover:popover6
              @click="fnOpenStudyType(6)">
            <span class="leftIcon" style="background-image:url(../../static/img/example-write.png);"></span>
            <span class="name">例句默写</span>
          </li>
        </ul>
      </li>
      <li class="expand">
        <ul>
          <li class="leftName">拓展学习</li>
          <li class="item" v-popover:popover7
              @click="fnOpenStudyType(7)">
            <span class="leftIcon" style="background-image:url(../../static/img/voice.png);"></span>
            <span class="name">智能语音</span>
          </li>
          <li class="item" v-popover:popover8
              @click="fnOpenStudyType(8)">
            <span class="leftIcon" style="background-image:url(../../static/img/reading.png);"></span>
            <span class="name">智能阅读</span>
          </li>
          <li class="item" v-popover:popover9
              @click="fnOpenStudyType(9)">
            <span class="leftIcon" style="background-image:url(../../static/img/spoken.png);"></span>
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
    props: {
      showCourse: {
        type: Boolean
      }
    },
    components: {},
    data() {
      return {
        contentArr:[
          '帮你快速实现词汇母语式的记忆效果，40小时牢记3000生词，永久不忘。词汇学习从此无忧！\n' +
          '      难度指数：★',
          '快速训练你的听读音写单词的能力，具有独创的按照拼音音节抄写单词功能和拼写错误纠正功能。\n' +
          '      难度指数：★★',
          '这个模块通过智能化记忆引擎自动管理你的记忆，分出生词、夹生词和熟词，实现快速牢记的效果。\n' +
          '      难度指数：★★',
          '由记忆引擎驱动，通过听音组句训练，快速提高听力，培养语感，并能积累语法知识。\n' +
          '      难度指数：★★★',
          '由记忆引擎驱动，通过连词成句训练，快速提高翻译能力，为英语写作打下坚实基础。\n' +
          '      难度指数：★★★',
          '根据中文句意写出对应的英文句子，提高英语书面表达能力，学习这个模块需要有过硬的单词拼写能力、较为完整的句法知识和语法知识，适合英语基础较好的学习者。\n' +
          '      难度指数：★★★★★',
          '词汇学习第二乐园，完成同步学习的同时扩充你的词汇量，以词汇记忆，听写，默写为主的全方位训练，培养学习者良好的英语学习习惯。',
          '科学，有趣的英文提速工具，通过它你可以快速消灭生词，改正不良阅读习惯，轻松将阅读速度和效率提高2至5倍。',
          '课程按场景进行分类，通过学习引擎技术，帮助学习者不断复习、巩固所学内容。先输入再输出，逐步实现自由表达。'
        ]
      }
    },
    methods: {
      fnOpenStudyType(type_) {
        if(type_ <= 6) {
          this.$bus.emit('openStudyType', type_);
        }else {
          this.$alert('智能阅读等模块还在开发中哦: )', '提示', {
            confirmButtonText: '确定',
            callback: () => {
              return
            }
          });
        }
      }
    },
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

  .courseCon > ul  li span.leftIcon {
    display: inline-block;
    vertical-align: top;
    width: 44px;
    height: 80px;
    background:url(../../static/img/memory.png) no-repeat center;
  }

  .courseCon > ul > li.words  li.item:hover{
    background-color: #02987c;
  }
  .courseCon > ul > li.sentence  li.item:hover{
    background-color: #299283;
  }
  .courseCon > ul > li.expand  li.item:hover{
    background-color: #c9e4e4;
  }

  .courseCon > ul  li span.name {
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
