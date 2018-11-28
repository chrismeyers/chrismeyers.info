<template>
  <div>
    <router-link to="/dashboard/images">Edit Images</router-link><span>&nbsp;&bull;&nbsp;</span>
    <router-link to="/dashboard/builds">Edit Builds</router-link><span>&nbsp;&bull;&nbsp;</span>
    <router-link to="/dashboard/projects">Edit Projects</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
}
</script>
