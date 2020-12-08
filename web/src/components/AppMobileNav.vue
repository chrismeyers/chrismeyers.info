<template>
  <nav>
    <div id="mobile-menu">
      <div class="header">
        <div class="logo">
          <router-link to="/" class="small-nav-logo">
            <img
              src="@/assets/images/logos/meyers-logo-green.svg"
              alt="Chris Meyers. Developer, Tech enthusiast."
              class="banner-img"
              title="Home"
            />
          </router-link>
        </div>
        <div class="menu-icon">
          <div>
            <button
              style="outline: none"
              class="hamburger hamburger--spin"
              :class="{ 'is-active': menuDisplayed }"
              ref="hamburger-button"
              type="button"
              @click="toggleMenu()"
              aria-label="Menu"
              aria-controls="navigation"
            >
              <span class="hamburger-box" style="height: 26px">
                <span class="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <div>
        <div
          @touchend.prevent
          class="menu-overlay"
          v-show="menuDisplayed"
        ></div>
        <div v-click-outside="toggleMenu" v-if="menuDisplayed" class="menu">
          <router-link
            class="nav-link menu-item"
            :class="{ 'nav-selected': path === 'about' }"
            tag="div"
            to="/"
            >About</router-link
          >
          <router-link
            class="nav-link menu-item"
            :class="{ 'nav-selected': path === 'resume' }"
            tag="div"
            to="/resume"
            >Résumé</router-link
          >
          <router-link
            class="nav-link menu-item"
            :class="{ 'nav-selected': path.includes('projects') }"
            tag="div"
            to="/projects"
            >Projects</router-link
          >
          <router-link
            class="nav-link menu-item"
            :class="{ 'nav-selected': path.includes('builds') }"
            tag="div"
            to="/builds"
            >Builds</router-link
          >
          <app-footer />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import AppFooter from './AppFooter.vue';
import ClickOutside from 'vue-click-outside';

export default {
  components: {
    AppFooter,
  },
  name: 'app-mobile-nav',
  props: ['path'],
  data() {
    return {
      menuDisplayed: false,
    };
  },
  watch: {
    path: function () {
      this.menuDisplayed = false;
    },
  },
  mounted() {
    // Prevents click-outside event on specific element
    this.popupItem = this.$refs['hamburger-button'];
  },
  methods: {
    toggleMenu() {
      this.menuDisplayed = !this.menuDisplayed;
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style scoped>
nav {
  position: fixed;
  width: 100%;
  height: 60px;
  z-index: 3;
}

footer {
  bottom: 0;
  position: fixed;
  background-color: var(--bg-color);
  color: var(--font-color);
  cursor: auto;
}

#mobile-menu {
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-color);
  height: 60px;
}

.header {
  display: flex;
}

.small-nav-logo img {
  height: 30px;
  width: 113px;
  left: 10px;
  position: absolute;
  padding-top: 15px;
}

.menu-icon {
  margin-left: auto;
}

.menu-overlay {
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
}

.menu {
  background-color: var(--bg-color);
  color: white;
  font-size: x-large;
  position: fixed;
  width: 100%;
}
.menu:hover {
  cursor: pointer;
}

.menu-item {
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-color);
  line-height: 50px;
  text-align: center;
  vertical-align: middle;
}
</style>
