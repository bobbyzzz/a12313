import Vue from 'vue'
import App from './App.vue'
// 响应式基础js
import base from '../src/statics/js/base.js'
Vue.use(base)
//引入路由
import router from '../src/router/index.js'
//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
// 引入vant内的ImagePreview
// import { ImagePreview } from 'vant';
// Vue.use(ImagePreview);
//引入vue-lazyload
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  error: require('./statics/img/lazyload.gif'),
  loading: require('./statics/img/lazyload.gif'),
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
