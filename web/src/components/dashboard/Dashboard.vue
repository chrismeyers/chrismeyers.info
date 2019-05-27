<template>
  <div class="content">
    <div class="section-header section-header-size">{{ getTitle() }}</div>

    <div class="content-text">
      <div class="dashboard-nav">
        <router-link class="fancytxt" to="/dashboard/images">Edit Images</router-link><span>&nbsp;&bull;&nbsp;</span>
        <router-link class="fancytxt" to="/dashboard/builds">Edit Builds</router-link><span>&nbsp;&bull;&nbsp;</span>
        <router-link class="fancytxt" to="/dashboard/projects">Edit Projects</router-link><span>&nbsp;&bull;&nbsp;</span>
        <router-link class="fancytxt" to="/dashboard/account">Account</router-link><span>&nbsp;&bull;&nbsp;</span>
        <a class="fancytxt" @click="logout()">Logout</a>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  methods: {
    getTitle() {
      return document.title
    },
    logout() {
      this.$cookie.delete("chrismeyers_info_apiToken")
      this.$router.push({
        path: "/login",
      })
    }
  }
}
</script>

<style>
.dashboard-nav {
  margin-bottom: 20px;
}

.dashboard-button {
  margin-right: 10px;
  margin-top: 10px;
}

.dashboard-text {
  margin-bottom: 10px;
}

.dashboard-dropdown {
  margin-bottom: 20px;
}

input[type=checkbox] {
  -webkit-appearance:checkbox;
}

.required-star:after {
  content: ' *';
  color: red;
}
</style>
