import 'babel-polyfill';
import cssVars from 'css-vars-ponyfill';
import Vue from 'vue';
import Router from './router';
import App from './App';
import { Store } from './store/store';
import Axios from 'axios';
import VModal from 'vue-js-modal';
import VueProgressBar from 'vue-progressbar';
import VueImg from 'v-img';
import SvgIcon from 'vue-svgicon';
import ToggleButton from 'vue-js-toggle-button';

var VueCookie = require('vue-cookie');

Axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

Vue.config.productionTip = false;

Vue.use(VModal, {
  dialog: true,
});
Vue.use(VueProgressBar, {
  color: getComputedStyle(document.documentElement).getPropertyValue(
    '--main-theme-color',
  ),
});
Vue.use(VueImg, {
  altAsTitle: true,
  openOn: 'click',
  thumbnails: true,
  sourceButton: true,
  closeOnScroll: false,
});
Vue.use(VueCookie);
Vue.use(SvgIcon);
Vue.use(ToggleButton);

cssVars();

new Vue({
  router: Router,
  render: (create) => create(App),
  store: Store,
}).$mount('#app');
