import axios from 'axios';
import qs from 'qs';

axios.defaults.timeout = 30000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = 'http://192.168.2.127:8091';
axios.defaults.baseURL = 'http://192.168.2.11:4001';

// POST传参序列化 http request 拦截器
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  console.log('错误的传参');
  return Promise.reject(error);
});

// code状态码200判断http response 拦截器
axios.interceptors.response.use((res) => {
  if (res.status !== 200) {
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  console.log(error);
  console.log('网络异常');
  return Promise.reject(error);
});

export default axios;
