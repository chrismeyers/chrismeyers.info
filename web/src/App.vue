<template>
  <div id="app">
    <Navigation/>
    <v-dialog/>
    <vue-progress-bar></vue-progress-bar>
    <router-view/>
    <Footer/>
    <Prompt/>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import Prompt from "@/components/Prompt"
import ModalsMixin from "@/mixins/Modals"

export default {
  name: "App",
  mixins: [ModalsMixin],
  components: {
    Navigation,
    Footer,
    Prompt
  },
  created() {
    // [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start()
    // hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      // does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        // parse meta tags
        this.$Progress.parseMeta(meta)
      }
      // start the progress bar
      this.$Progress.start()
      // continue to next page
      next()
    })
    // hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach(() => {
      // finish the progress bar
      this.$Progress.finish()
    })
  },
  mounted() {
    this.$store.commit('applyTheme')

    // [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish()

    if(this.$isIE) {
      this.showIEDialog()
    }
  }
}
</script>

<style>
/********************* GENERAL *********************/
:root {
  --main-theme-color: rgb(91, 183, 91);
  --font-color: #000000;
  --bg-color: #FFFFFF;
  --border-color: rgba(0, 0, 0, 0.1);
  --tooltip-bg-color: #000000;
  --tooltip-font-color: #FFFFFF;
  --tooltip-border-color: #000000;
  --hamburgers-color: #000000;
  --icon-color: #000000;
}

[data-theme="dark"] {
  --font-color: #FFFFFF;
  --bg-color: #000000;
  --border-color: rgba(255, 255, 255, 0.3);
  --tooltip-bg-color: #FFFFFF;
  --tooltip-font-color: #000000;
  --tooltip-border-color: #FFFFFF;
  --hamburgers-color: #FFFFFF;
  --icon-color: #FFFFFF;
}

#app {
  font-family: "Open Sans", sans-serif;
  display: -webkit-flex;
  display: flex;
}

html {
  position: relative;
  min-height: 100%;
}

body {
  margin: 0;
  padding:0;
  height:100%;
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

.spacer {
  overflow: hidden;
  height: 0px;
  width: 0px;
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

.timestamp {
  font-style: italic;
  font-size: 0.75em;
  color: #A9A9A9;
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

/********************* CONTENT *********************/
.section-header {
  text-align: center;
  font-family: "Open Sans", sans-serif;
  border-bottom: 1px solid var(--border-color);
}

.content {
  -webkit-flex: 1;
  flex: 1;
  -webkit-margin-bottom-collapse: separate; /* Fixes margin-bottom for non-chrome browsers */
  font-family: "Open Sans", sans-serif;
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
}

.dropdown-mod {
  height: 25px;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 13px;
  border: 1px solid #000000;
  font-family: "Open Sans", sans-serif;
  background-color: var(--bg-color);
  border-radius: 0;
}
.dropdown-mod:focus {
  outline: none;
  border-color: #5bb75b;
}

input.inputbox-mod[type="text"],
input.inputbox-mod[type="password"],
input.inputbox-mod[type="url"],
input.inputbox-mod[type="number"],
textarea.textarea-mod,
select.select-scroll-mod {
  height: 25px;
  width: calc(100% - 5px - 5px - 2px); /* 100% - padding-left - padding-right - (2 * border size) */
  padding-left: 5px;
  padding-right: 5px;
  font-size: 13px;
  border: 1px solid #000000;
  font-family: "Open Sans", sans-serif;
}
input.inputbox-mod:focus[type="text"],
input.inputbox-mod:focus[type="password"],
input.inputbox-mod:focus[type="url"],
input.inputbox-mod:focus[type="number"],
textarea.textarea-mod:focus,
select.select-scroll-mod:focus {
  outline: none;
  border-color: #5bb75b;
}

input.inputbox-mod[type="checkbox"] {
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

/* This button was generated using CSSButtonGenerator.com */
.submit-button {
  background-color: #FFFFFF;
  color: #000000;
  text-indent:0;
  border:1px solid #000000;
  display:inline-block;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  height:40px;
  line-height:30px;
  width:100px;
  text-decoration:none;
  text-align:center;
}
.submit-button:hover {
  background-color:#5bb75b;
  color: #FFFFFF;
  cursor: pointer;
}.submit-button:active {
  position:relative;
  top:1px;
}
.submit-button:focus {
  outline: 0;
}
.delete-button:hover,
.reset-button:hover {
  background-color: #d9534f;
}

/******************* hamburgers overrides ******************/
.hamburger:hover{
  opacity: 1;
}

.hamburger-inner,
.hamburger-inner:after,
.hamburger-inner:before {
  background-color: var(--hamburgers-color);
}

/********************* v-img overrides *********************/
.title-v-img,
.count-v-img,
.buttons-v-img,
.prev-v-img,
.next-v-img {
  font-family: "Open Sans", sans-serif !important;
}

.fullscreen-v-img {
  touch-action: pinch-zoom pan-x pan-y !important;
}

/********************* v-tooltip style *********************/
.tooltip {
  font-family: "Open Sans", sans-serif !important;
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: var(--tooltip-bg-color);
  color: var(--tooltip-font-color);
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: var(--tooltip-border-color);
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 15px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, .1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}

@media screen and (max-width: 969px) {
  .content {
    margin: 60px 0px 80px 0px;
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
    font-family: "Open Sans", sans-serif;
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
