// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index'
import VueBus from './bus/index'

// 引用API文件
import axios from './api/index'
import url_ from './api/url'
// 将API方法绑定到全局
Vue.prototype.$url = url_;
Vue.prototype.$ajax = axios;

Vue.use(VueBus);
Vue.use(ElementUI);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

