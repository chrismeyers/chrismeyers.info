<template>
  <nav>
    <div id="full-menu">
      <div class="side-nav-logo">
        <router-link class="nav-link banner" to="/"
          ><img
            src="@/assets/images/logos/meyers-logo-green.svg"
            alt="Chris Meyers. Developer, Tech enthusiast."
            class="banner-img"
            title="Home"
        /></router-link>
      </div>
      <ul class="side-nav-items">
        <li>
          <router-link
            class="nav-link"
            :class="{ 'nav-selected': path === '/' }"
            to="/"
            >About</router-link
          >
        </li>
        <li>
          <router-link
            class="nav-link"
            :class="{ 'nav-selected': path === '/resume' }"
            to="/resume"
            >Résumé</router-link
          >
        </li>
        <li>
          <router-link
            class="nav-link"
            :class="{ 'nav-selected': path.startsWith('/projects') }"
            to="/projects"
            >Projects</router-link
          >
        </li>
        <li>
          <router-link
            class="nav-link"
            :class="{ 'nav-selected': path.startsWith('/builds') }"
            to="/builds"
            >Builds</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'app-full-nav',
  props: ['path'],
};
</script>

<style scoped>
nav {
  width: 300px;
}

#full-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  border-right: 1px solid var(--border-color);
}

.header-link {
  margin-left: 20px;
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
  border-top: 1px solid var(--border-color);
}
.side-nav-items > li {
  height: 70px;
  font-size: 33px;
}
.side-nav-items > li > a:hover {
  color: var(--main-theme-color);
}
</style>
