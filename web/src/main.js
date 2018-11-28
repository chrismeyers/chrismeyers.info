import "babel-polyfill"
import Vue from "vue"
import router from "./router"
import App from "./App"
import axios from "axios"
import VModal from "vue-js-modal"
import VueProgressBar from "vue-progressbar"
import VueImg from "v-img"
import VTooltip from 'v-tooltip'
import VueClipboard from 'vue-clipboard2'

var VueCookie = require('vue-cookie')

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL

Vue.config.productionTip = false

Vue.use(VModal, {
  dialog: true
})
Vue.use(VueProgressBar, {
  color: "rgb(91, 183, 91)"
})
Vue.use(VueImg, {
  altAsTitle: true,
  openOn: "click",
  thumbnails: true
})
Vue.use(VueCookie);
Vue.use(VTooltip)
Vue.use(VueClipboard)

// See: https://stackoverflow.com/a/9851769/7159369
Vue.prototype.$isIE = /*@cc_on!@*/false || !!document.documentMode

new Vue({
  router,
  render: create => create(App)
}).$mount("#app")
