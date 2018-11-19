<template>
  <nav>
    <div id="full-menu">
      <div class="side-nav-logo">
        <router-link class="nav-link banner" to="/"><img src="@/assets/images/logos/meyers-logo-green.svg" alt="Chris Meyers. Developer, Tech enthusiast." class="banner-img" title="Home"></router-link>
      </div>
      <ul class="side-nav-items">
        <li><router-link class="nav-link" :class="{ 'nav-selected': path == '' }" to="/">About</router-link></li>
        <li><router-link class="nav-link" :class="{ 'nav-selected': path == 'resume' }" to="/resume">Résumé</router-link></li>
        <li><router-link class="nav-link" :class="{ 'nav-selected': path == 'builds' }" to="/builds">Builds</router-link></li>
        <li><router-link class="nav-link" :class="{ 'nav-selected': path == 'projects' }" to="/projects">Projects</router-link></li>
      </ul>
    </div>
    <div id="hamburger-menu">
      <div class="banner-icon">
        <router-link to="/" class="small-nav-logo">
          <img src="@/assets/images/logos/meyers-logo-green.svg" alt="Chris Meyers. Developer, Tech enthusiast." class="banner-img" title="Home">
        </router-link>

        <button style="outline: none;" class="hamburger hamburger--collapse" :class="{ 'is-active': menuDisplayed }" type="button" @click="toggleMenu()">
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>

        <div class="section-title-menu">
          <ul class="menu-dropdown">
            <li>
              <ul class="menu-items">
                <router-link class="nav-link" :class="{ 'nav-selected': path == '' }" tag="a" to="/"><li class="section-title-small-txt">About</li></router-link>
                <router-link class="nav-link" :class="{ 'nav-selected': path == 'resume' }" tag="a" to="/resume"><li class="section-title-small-txt">Résumé</li></router-link>
                <router-link class="nav-link" :class="{ 'nav-selected': path == 'builds' }" tag="a" to="/builds"><li class="section-title-small-txt">Builds</li></router-link>
                <router-link class="nav-link" :class="{ 'nav-selected': path == 'projects' }" tag="a" to="/projects"><li class="section-title-small-txt">Projects</li></router-link>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      path: null,
      menuDisplayed: false
    }
  },
  mounted() {
    let rawPath = this.$route.path
    this.path = this.cleanPath(rawPath)
  },
  watch: {
    '$route.path' (rawPath) {
      this.path = this.cleanPath(rawPath)
      this.menuDisplayed = false
    }
  },
  methods: {
    cleanPath (rawPath) {
      return rawPath.replace(/\//g, "")
    },
    toggleMenu() {
      this.menuDisplayed = !this.menuDisplayed
    }
  }
}
</script>

<style scoped>
nav {
  width: 300px;
}

.nav-link {
  color: #000000;
  text-decoration: none;
}

.nav-selected {
  color: #5bb75b !important;
}

.banner img {
  width:100%;
  display: inline-block;
  padding-top: 10px;
}

#full-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

#hamburger-menu {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #FFFFFF;
  height: 60px;
}

.header-link {
  margin-left: 20px
}

.side-nav-logo {
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  height: 90px;
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

.small-nav-logo img {
  height: 30px;
  width: 113px;
  left: 10px;
  position: absolute;
  padding-top: 15px;
}

.banner-icon {
  float: right;
  margin-right: 0px;
}

.section-title-menu {
  background-color: #FFFFFF;
  display: table-cell;
  color: white;
  font-size: x-large;
  font-family: 'Open Sans', sans-serif;
  text-align: center;
}
.section-title-menu:hover {
  cursor: pointer;
}

.section-title-small-txt {
  border-bottom: 1px solid #DCDCDC;
  line-height: 50px;
  text-align: center;
  vertical-align: middle;
}

.menu-dropdown {
  margin: 0;
  padding: 0;
  list-style: none;
}

.menu-items {
  padding: 0;
  list-style: none;
  position: absolute;
  float: left;
  clear: right;
  left: 0;
  right: 0;
  background: #FFF;
  border-top: 1px solid rgba(0,0,0,.1);
  z-index: 1;
  margin-top: 1px;
}
.overlay {
  display: none;
}

@media screen and (min-width: 970px){
  #hamburger-menu {
    display: none;
  }
}

@media screen and (max-width: 969px) {
  nav {
    position: fixed;
    width: 100%;
    height: 60px;
  }

  #full-menu {
    display: none;
  }
}
</style>
