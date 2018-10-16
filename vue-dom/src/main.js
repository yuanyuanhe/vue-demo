import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import "./assets/css/style.css"
import VueRouter from 'vue-router'
import store from './store';
Vue.use(VueRouter);
Vue.prototype.$http=axios;
import routes from './router.config';
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
//gouwuche

// 请求之前  拦截器，显示loading
axios.interceptors.request.use(function (config) {
  store.dispatch('showLoading');
  console.log("bulalalla 11223")
  return config;

}, function (error) {
  return Promise.reject(error);//交给了catch处理
});
// 请求之后  拦截器，隐藏loading
axios.interceptors.response.use(function (response) {
  store.dispatch('hideLoading');
  console.log("bulalalla ")
  return response;//给axios的then处理
}, function (error) {
  return Promise.reject(error);
});

//引入全局loading组件
import loading from './loading';
Vue.use(loading);

let router = new VueRouter(routes);
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
