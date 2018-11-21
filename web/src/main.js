import Vue from 'vue'
import router from './router'
import App from './App'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import VModal from 'vue-js-modal'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL

Vue.config.productionTip = false
Vue.use(VueLazyLoad)
Vue.use(VModal, { dialog: true })

require('vue-image-lightbox/dist/vue-image-lightbox.min.css')

// See: https://stackoverflow.com/a/9851769/7159369
Vue.prototype.$isIE = /*@cc_on!@*/false || !!document.documentMode

new Vue({
  router,
  render: create => create(App)
}).$mount("#app")
