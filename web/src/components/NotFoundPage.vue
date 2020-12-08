<template>
  <div class="content">
    <div class="section-header section-header-size">404 Page Not Found</div>

    <div class="content-text">
      <p class="center">
        The path
        <span>
          <pre class="path">{{ path }}</pre>
        </span>
        does not exist
      </p>
      <p class="center">
        Go back <router-link class="fancytxt" to="/">home</router-link>!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'not-found-page',
  data() {
    return {
      path: '',
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => vm.setPath(to.path));
  },
  methods: {
    setPath(path) {
      this.path = path;
    },
  },
};
</script>
