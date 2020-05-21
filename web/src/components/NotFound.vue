<template>
  <div class="content">
    <div class="section-header section-header-size">404 Page not found</div>

    <div class="content-text">
      <p class="center">The path <pre class="path">{{ path }}</pre> does not exist.</p>
      <p class="center">Go back <router-link class="fancytxt" to="/">home</router-link>!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data () {
    return {
      path: ""
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => vm.setPath(to.path))
  },
  methods: {
    setPath (path) {
      this.path = path
    }
  }
}
</script>

<style>
.center {
  text-align: center;
}

.path {
  display: inline;
  background: var(--page-not-found-path-bg);
  padding: 3px;
}
</style>
