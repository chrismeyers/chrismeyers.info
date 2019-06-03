<template>
  <div class="content">
    <div class="section-header section-header-size">404 - Page Not Found</div>

    <div class="content-text">
      <h2 class="center">Oh no! The path <pre class="path">{{ path }}</pre> does not exist. Take me <router-link class="fancytxt" to="/">home</router-link>!</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
      path: ""
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.setPath(to.path))
  },
  methods: {
    setPath(path) {
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
  background: whitesmoke;
}
</style>
