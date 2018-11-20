import 'babel-polyfill'
import Vue from 'vue'
import router from './router'
import App from './App'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL

Vue.config.productionTip = false
Vue.use(VueLazyLoad)

require('vue-image-lightbox/dist/vue-image-lightbox.min.css')

new Vue({
  router,
  render: create => create(App)
}).$mount('#app')
