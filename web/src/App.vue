<template>
  <div id="app">
    <v-dialog />
    <vue-progress-bar />
    <div class="container">
      <template>
        <app-mobile-nav v-if="isMobile" :path="path" />
        <app-full-nav v-else :path="path" />
      </template>
      <router-view />
      <app-footer />
    </div>
    <keep-alive>
      <app-prompt v-if="!isMobile" />
    </keep-alive>
  </div>
</template>

<script>
import AppFullNav from '@/components/AppFullNav';
import AppMobileNav from '@/components/AppMobileNav';
import AppFooter from '@/components/AppFooter';
import AppPrompt from '@/components/AppPrompt';
import ModalsMixin from '@/mixins/Modals';
import { MOBILE_BREAKPOINT } from '@/store/constants';
import _throttle from 'lodash/throttle';

export default {
  name: 'App',
  mixins: [ModalsMixin],
  components: {
    AppFullNav,
    AppMobileNav,
    AppFooter,
    AppPrompt,
  },
  data() {
    return {
      isMobile: true,
      path: '',
      throttledResizeFn: null,
    };
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      this.setPath(to.path);
    },
  },
  created() {
    // [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start();
    // hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      // does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        const meta = to.meta.progress;
        // parse meta tags
        this.$Progress.parseMeta(meta);
      }
      // start the progress bar
      this.$Progress.start();
      // continue to next page
      next();
    });
    // hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach(() => {
      // finish the progress bar
      this.$Progress.finish();
    });
  },
  mounted() {
    this.$store.commit('applyTheme');

    // [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish();

    if (this.$store.state.isIE) {
      this.showIEDialog();
    }

    this.onResize();
    this.throttledResizeFn = _throttle(this.onResize, 50);
    window.addEventListener('resize', this.throttledResizeFn);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.throttledResizeFn);
  },
  methods: {
    onResize() {
      const width = window.innerWidth;
      this.isMobile = width < MOBILE_BREAKPOINT;
    },
    setPath(rawPath) {
      const cleanedPath = rawPath.replace(/\//g, '');
      this.path = cleanedPath === '' ? 'about' : cleanedPath;
    },
  },
};
</script>

<style>
/********************* GENERAL *********************/
:root {
  --main-theme-color: rgb(91, 183, 91);
  --warning-color: #d9534f;

  --font-color: #444444;
  --bg-color: #f7f7f7;
  --border-color: rgba(0, 0, 0, 0.1);
  --hamburgers-color: #000000;
  --icon-color: #000000;
  --modal-bg-color: #ffffff;
  --modal-button-text-color: #ffffff;
  --page-not-found-path-bg: #eaeaea;
}

[data-theme='dark'] {
  --font-color: #e9e9e9;
  --bg-color: #202020;
  --border-color: rgba(255, 255, 255, 0.3);
  --hamburgers-color: #e9e9e9;
  --icon-color: #e9e9e9;
  --modal-bg-color: #303030;
  --modal-button-text-color: #ffffff;
  --page-not-found-path-bg: #444444;
}

#app {
  font-family: 'Open Sans', sans-serif;
  flex: 1;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: var(--bg-color);
  color: var(--font-color);
}

img {
  border: 0; /* Remove IE img link border */
}

hr {
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

input,
textarea {
  border-radius: 0;
  -webkit-border-radius: 0;
  -webkit-appearance: none;
}

h2.top {
  margin-top: 0px;
}

.container {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.fancytxt {
  color: var(--font-color);
  text-decoration: underline;
  cursor: pointer;
}

.fancytxt:hover {
  color: var(--main-theme-color);
  cursor: pointer;
}

.no-decoration {
  text-decoration: none !important;
}

.no-outline {
  outline: none !important;
}

.li-filled {
  list-style-type: disc;
}

.timestamp,
.faded {
  font-style: italic;
  font-size: 0.75em;
  color: #a9a9a9;
}

.link-image {
  fill: var(--icon-color);
}

.link-image.small {
  height: 16px;
  width: 16px;
}

.link-image.large {
  height: 24px;
  width: 20px;
}

.link-image.xlarge {
  height: 80px;
  width: 80px;
}

.jump-anchor {
  cursor: pointer;
}

.jump-anchor:hover {
  fill: var(--main-theme-color);
}

.center {
  text-align: center;
}

.path {
  display: inline;
  background: var(--page-not-found-path-bg);
  padding: 3px;
}

/******************** COMMON NAV *******************/
.banner img {
  width: 100%;
  display: inline-block;
  padding-top: 10px;
}

.nav-link {
  color: var(--font-color);
  text-decoration: none;
}

.nav-selected {
  color: var(--main-theme-color);
}

/********************* CONTENT *********************/
.section-header {
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  border-bottom: 1px solid var(--border-color);
}

.content {
  -webkit-flex: 1;
  flex: 1;
  -webkit-margin-bottom-collapse: separate; /* Fixes margin-bottom for non-chrome browsers */
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
}

.content-text {
  padding: 10px 15px;
  max-width: 800px;
  margin: 0 auto;
}

.dt-mod {
  margin-top: 15px;
}

.dt-links {
  margin-bottom: 5px;
}

.first-header {
  margin-top: 0px;
}

.section-header-size {
  height: 90px;
  line-height: 90px;
  font-size: 40px;
  text-align: center;
  margin-left: 1px;
}

.dropdown-mod {
  height: 25px;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 13px;
  border: 1px solid #000000;
  font-family: 'Open Sans', sans-serif;
  background-color: #ffffff;
  border-radius: 0;
}
.dropdown-mod:focus {
  outline: none;
  border-color: var(--main-theme-color);
}

input.inputbox-mod[type='text'],
input.inputbox-mod[type='password'],
input.inputbox-mod[type='url'],
input.inputbox-mod[type='number'],
input.inputbox-mod[type='date'],
textarea.textarea-mod,
select.select-scroll-mod,
select.select-mod {
  height: 25px;
  width: calc(
    100% - 5px - 5px - 2px
  ); /* 100% - padding-left - padding-right - (2 * border size) */
  padding-left: 5px;
  padding-right: 5px;
  font-size: 13px;
  border: 1px solid #000000;
  font-family: 'Open Sans', sans-serif;
}
input.inputbox-mod:focus[type='text'],
input.inputbox-mod:focus[type='password'],
input.inputbox-mod:focus[type='url'],
input.inputbox-mod:focus[type='number'],
textarea.textarea-mod:focus,
select.select-scroll-mod:focus {
  outline: none;
  border-color: var(--main-theme-color);
}

input.inputbox-mod[type='checkbox'] {
  display: block;
}

textarea.textarea-mod {
  resize: vertical;
  height: 100px;
}

select.select-scroll-mod {
  width: 100%;
  height: 192px;
  padding: 0px;
  display: block;
}

select.select-mod {
  width: 100%;
  height: 27px;
  display: block;
  background-color: white;
}

/* This button was generated using CSSButtonGenerator.com */
.submit-button {
  background-color: #ffffff;
  color: #000000;
  text-indent: 0;
  border: 1px solid #000000;
  display: inline-block;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  height: 40px;
  line-height: 30px;
  width: 100px;
  text-decoration: none;
  text-align: center;
}
.submit-button:hover {
  background-color: var(--main-theme-color);
  color: #ffffff;
  cursor: pointer;
}
.submit-button:active {
  position: relative;
  top: 1px;
}
.submit-button:focus {
  outline: 0;
}
.delete-button:hover,
.reset-button:hover {
  background-color: var(--warning-color);
}

/******************* hamburgers overrides ******************/
.hamburger:hover {
  opacity: 1;
}

.hamburger-inner,
.hamburger-inner:after,
.hamburger-inner:before {
  background-color: var(--hamburgers-color);
}

/****************** vue-js-modal overrides *****************/
.v--modal {
  background-color: var(--modal-bg-color) !important;
  box-shadow: none !important;
}

.vue-dialog .vue-dialog-buttons {
  border-top: 1px solid var(--border-color) !important;
}

.vue-dialog-button:not(:first-of-type) {
  border-left: 1px solid var(--border-color) !important;
}

.vue-dialog-button.confirm:hover {
  color: var(--modal-button-text-color);
  background-color: var(--warning-color);
}

/********************* v-img overrides *********************/
.title-v-img,
.count-v-img,
.buttons-v-img,
.prev-v-img,
.next-v-img {
  font-family: 'Open Sans', sans-serif !important;
}

.fullscreen-v-img {
  touch-action: pinch-zoom pan-x pan-y !important;
}

@media screen and (max-width: 969px) {
  body {
    /* TODO: this causes savedPosition in scrollBehavior to always be 0, 0! */
    display: flex;
  }

  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: auto;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }

  .content-text {
    padding: 10px;
  }

  .section-header-size {
    height: 60px;
    line-height: 60px;
    font-size: 35px;
  }

  /******************** v-img overrides ********************/
  .title-v-img {
    font-size: 14px !important;
  }

  .header-v-img {
    height: auto !important;
    padding: 5px !important;
  }
}

@media print {
  html {
    font-family: 'Open Sans', sans-serif;
  }

  nav,
  footer {
    display: none;
  }

  .content {
    font-size: 12px;
  }

  .content-text > hr {
    /* Use this when using page-break-after's */
    display: none;
  }
}
</style>
