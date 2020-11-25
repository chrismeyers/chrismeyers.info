<template>
  <nav>
    <div id="hamburger-menu">
      <div class="banner-icon">
        <router-link to="/" class="small-nav-logo">
          <img
            src="@/assets/images/logos/meyers-logo-green.svg"
            alt="Chris Meyers. Developer, Tech enthusiast."
            class="banner-img"
            title="Home"
          />
        </router-link>

        <button
          style="outline: none;"
          class="hamburger hamburger--spin"
          :class="{ 'is-active': menuDisplayed }"
          ref="hamburger-button"
          type="button"
          @click="toggleMenu()"
          aria-label="Menu"
          aria-controls="navigation"
        >
          <span class="hamburger-box" style="height: 26px;">
            <span class="hamburger-inner"></span>
          </span>
        </button>

        <div class="menu-overlay" v-show="menuDisplayed"></div>
        <div
          v-click-outside="toggleMenu"
          v-if="menuDisplayed"
          class="section-title-menu"
        >
          <ul class=" menu-dropdown menu-items">
            <router-link
              class="nav-link section-title-small-txt"
              :class="{ 'nav-selected': path == 'about' }"
              tag="li"
              to="/"
              >About</router-link
            >
            <router-link
              class="nav-link section-title-small-txt"
              :class="{ 'nav-selected': path == 'resume' }"
              tag="li"
              to="/resume"
              >Résumé</router-link
            >
            <router-link
              class="nav-link section-title-small-txt"
              :class="{ 'nav-selected': path == 'projects' }"
              tag="li"
              to="/projects"
              >Projects</router-link
            >
            <router-link
              class="nav-link section-title-small-txt"
              :class="{ 'nav-selected': path == 'builds' }"
              tag="li"
              to="/builds"
              >Builds</router-link
            >
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import ClickOutside from "vue-click-outside"

export default {
  name: "app-mobile-nav",
  props: ["path"],
  data() {
    return {
      menuDisplayed: false
    }
  },
  watch: {
    path: function() {
      this.menuDisplayed = false
    }
  },
  mounted() {
    // Prevents click-outside event on specific element
    this.popupItem = this.$refs["hamburger-button"]
  },
  methods: {
    toggleMenu() {
      this.menuDisplayed = !this.menuDisplayed
    }
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped>
nav {
  top: 0;
  position: sticky;
  width: 100%;
}

#hamburger-menu {
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-color);
  height: 60px;
}

.banner-icon {
  float: right;
  margin-right: 0px;
}

.small-nav-logo img {
  height: 30px;
  width: 113px;
  left: 10px;
  position: absolute;
  padding-top: 15px;
}

.section-title-menu {
  background-color: var(--bg-color);
  display: table-cell;
  color: white;
  font-size: x-large;
  font-family: "Open Sans", sans-serif;
  text-align: center;
}
.section-title-menu:hover {
  cursor: pointer;
}

.section-title-small-txt {
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-color);
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
  position: fixed;
  float: left;
  clear: right;
  left: 0;
  right: 0;
  z-index: 1;
}

.menu-overlay {
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
}
</style>
