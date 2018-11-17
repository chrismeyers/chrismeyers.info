<template>
  <div class="nav">
    <div id="full-menu">
      <div class="side-nav-logo">
        <router-link class="nav-link" to="/"><a id="banner-small"><img src="@/assets/images/logos/meyers-logo-green.svg" alt="Chris Meyers. Developer, Tech enthusiast." class="banner-img" title="Home"></a></router-link>
      </div>
      <ul class="side-nav-items">
        <li><router-link class="nav-link" :class="{ 'nav-selected': path == '' }" to="/">About</router-link></li>
        <li><router-link class="nav-link" :class="{ 'nav-selected': path == 'resume' }" to="/resume">Résumé</router-link></li>
        <li><router-link class="nav-link" :class="{ 'nav-selected': path == 'builds' }" to="/builds">Builds</router-link></li>
        <li><router-link class="nav-link" :class="{ 'nav-selected': path == 'projects' }" to="/projects">Projects</router-link></li>
      </ul>

      <div>
        <Footer/>
      </div>
    </div>
  </div>
</template>

<script>
import Footer from '@/components/Footer'

export default {
  name: "Navigation",
  components: {
    /* eslint-disable vue/no-unused-components */
    Footer
  },
  data() {
    return {
      path: null
    }
  },
  mounted() {
    let rawPath = this.$route.path
    this.path = this.cleanPath(rawPath)
  },
  watch: {
    '$route.path' (rawPath) {
      this.path = this.cleanPath(rawPath)
    }
  },
  methods: {
    cleanPath: function(rawPath) {
      return rawPath.replace(/\//g, "")
    }
  }
}
</script>

<style scoped>
.nav-link {
  color: #000000;
  text-decoration: none;
}

.nav-selected {
  color: #5bb75b !important;
}

#banner {
  float: left;
  height: 60px;
}

#banner-small img {
  width:100%;
  display: inline-block;
}

.banner-img-small {
  float: left;
  height: 20px;
  width: 70px;
}

#banner-icon {
  float: right;
  margin-right: 0px;
}

.bannerBar-size {
  height: 60px;
}

.section-title-txt {
  margin-top: 24px;
}

#section-title-menu {
  background-color: #FFFFFF;
  display: table-cell;
  color: white;
  font-size: x-large;
  font-family: 'Open Sans', sans-serif;
  text-align: center;
}
#section-title-menu:hover {
  cursor: pointer;
}

.section-title-small-txt {
  vertical-align: middle;
  line-height: 50px;
  text-align: center;
  border-bottom: 1px solid #DCDCDC;
}
.section-title-small-txt-last {
  vertical-align: middle;
  line-height: 50px;
  text-align: center;
}

#menu-dropdown {
  margin: 0;
  padding: 0;
  list-style: none;
}

#menu-items {
  padding: 0px;
  list-style: none;
  display: none;
  position: absolute;
  float: left; clear: right;
  left: 0px;
  right: 0px;
  background: #FFFFFF;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 1;
}

#menu-items li {
  height: 50px;
  padding: 0px;
}

#menu-items li a {
  display: block;
  height: 100%;
  width: 100%;
}

#menu-toggle {
  width: 25px;
  height: 27px;
  margin-top: 14px;
}

#menu-click {
  height: 60px;
  outline: none;
}

.nav {
  width: 300px;
}

#full-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.header-link {
  margin-left: 20px
}

#banner-icon {
  display: none; /* Hide hamburger menu on desktop */
}

#banner-small img {
  padding-top: 10px;
}

.side-nav-logo {
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}

.side-nav-items {
  list-style: none;
  text-align: right;
  padding-left: 0;
  padding-right: 10px;
  padding-top: 20px;
  margin-top: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.side-nav-items > li {
  height: 70px;
  font-size: 33px;
}
.side-nav-items > li > a:hover {
  color: #5bb75b !important;
}

.overlay {
  display: none;
}
</style>
