
import Vue from 'vue';
import Vuex from 'vuex';
// import mutations from './mutations';
// import actions from './actions';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userId: 1, // 用户ID
    typeId: 1, // 模块类型 1智能记忆，2智能听写，3智能默写,4例句听力，5例句翻译，6例句默写
    courseNum: 0, // 课程下总单词量
    versionId: 1, // 版本id
    textbookId: 1, // 课程id
    unitId: 1, // 单元id
    versionBoxTitle: '选择版本', // 版本+课程名
    unitBoxTitle: '选择单元', // 单元名
    deviceBoxTitle: '智能记忆', // 模块名
    unitList: [], // 课程下单元列表
  },
  mutations: {
    // 设置用户ID
    updateUserId(state, userid_) {
      state.userId = userid_;
      console.log('store用户ID: ' + state.userId);
    },
    // 更新模块类型的值
    updateTypeId(state, val_) {
      state.typeId = val_;
      console.log('store模块类型: ' + state.typeId);
    },
    // 更新选择版本标题
    updateVersionBoxTitle(state, val_) {
      state.versionBoxTitle = val_;
      console.log('store版本名: ' + state.versionBoxTitle);
    },
    // 更新选择单元标题
    updateUnitBoxTitle(state, val_) {
      state.unitBoxTitle = val_;
      console.log('store单元名: ' + state.unitBoxTitle);
    },
    // 更新选择模块标题
    updateDeviceBoxTitle(state, val_) {
      state.deviceBoxTitle = val_;
      console.log('store模块名: ' + state.deviceBoxTitle);
    },
    // 更新版本ID
    updateVersionId(state, val_) {
      state.versionId = val_;
      console.log('store版本ID: ' + state.versionId);
    },
    // 更新课程ID
    updateTextbookId(state, val_) {
      state.textbookId = val_;
      console.log('store课程ID: ' + state.textbookId);
    },
    // 更新单元ID
    updateUnitId(state, val_) {
      state.unitId = val_;
      console.log('store单元ID: ' + state.unitId);
    },
    // 修改课程下的总单词量
    updateCourseNum(state, val_) {
      state.courseNum = val_;
      console.log('store课程总单词量: ' + state.courseNum);
    },
    // 修改课程下的单元列表
    updateUnitList(state, arr_) {
      state.unitList = arr_;
      console.log('更新store：课程下单元列表');
    }
  },
  actions: {

  }
});

export default store;
