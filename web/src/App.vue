<template>
  <div id="app">
    <Navigation/>
    <v-dialog/>
    <vue-progress-bar></vue-progress-bar>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default {
  name: "App",
  components: {
    Navigation,
    // eslint-disable-next-line
    Footer
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
    // [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish()

    if(this.$isIE) {
      this.showIEDialog()
    }
  },
  methods: {
    showIEDialog() {
      this.$modal.show("dialog", {
        title: "Internet Explorer Detected",
        text: "For a better browsing experience, please visit this website " +
              "on a different browser, if possible.<br/><br/><i>Some functionality may " +
              "not work as expected on Internet Explorer.</i>",
        buttons: [
          {
            title: "Proceed",
            handler: () => {
              this.$modal.hide("dialog")
            }
          }
        ]
      })
    }
  }
}
</script>

<style>
/********************* GENERAL *********************/
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
  color: #000000;
  text-decoration: underline;
  cursor: pointer;
}

.fancytxt:hover {
  color: rgb(91, 183, 91);
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

.link-image-small {
    height: 16px;
    width: 16px;
}

/********************* CONTENT *********************/
.section-header {
  text-align: center;
  font-family: "Open Sans", sans-serif;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.content {
  -webkit-margin-bottom-collapse: separate; /* Fixes margin-bottom for non-chrome browsers */
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
}

.content-text {
  padding: 10px 5px 10px 5px;
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

.content {
  -webkit-flex: 1;
  flex: 1;
}

.content-text {
  padding: 10px 15px;
  max-width: 1595px; /* Max width = 1920, adjusted for margins and nav. Does not account for scroll bars. */
  margin: 0 auto; /* Centers content if width is greater than 1920px. */
}

.section-header-size {
  height: 90px;
  line-height: 90px;
  font-size: 40px;
  text-align: center;
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
