import "babel-polyfill"
import Vue from "vue"
import Router from "./router"
import App from "./App"
import { Store } from "./store/store"
import Axios from "axios"
import VModal from "vue-js-modal"
import VueProgressBar from "vue-progressbar"
import VueImg from "v-img"
import VTooltip from "v-tooltip"
import VueClipboard from "vue-clipboard2"
import SvgIcon from "vue-svgicon"

var VueCookie = require("vue-cookie")

Axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL

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
  thumbnails: true,
  closeOnScroll: false
})
Vue.use(VueCookie)
Vue.use(VTooltip)
Vue.use(VueClipboard)
Vue.use(SvgIcon)

// See: https://stackoverflow.com/a/9851769/7159369
Vue.prototype.$isIE = /*@cc_on!@*/false || !!document.documentMode

new Vue({
  router: Router,
  render: create => create(App),
  store: Store
}).$mount("#app")
