<template>
  <div class="content">
    <div class="section-header section-header-size">Login</div>

    <div class="content-text">
      <p v-if="error">Invalid Username or Password</p>
      <form @submit.prevent="login">
        <input class="inputbox-mod login-text" v-model="username" placeholder="Username" required>
        <input class="inputbox-mod login-text" v-model="password" placeholder="Password" type="password" required>
        <input class="submit-button" type="submit" value="Login">
      </form>
    </div>
  </div>
</template>

<script>
import AuthAPI from "@/utils/api/auth"

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error: false
    }
  },
  methods: {
    login() {
      AuthAPI.login(this.username, this.password).then(
        auth => {
          if(auth.status === 200) {
            this.error = false
            this.$cookie.set("chrismeyers_info_apiToken", auth.data["access_token"], {expires: "1D"})
            this.$router.push({
              path: "/dashboard",
            })
          }
          else {
            this.error = true
          }
        }
      )
    }
  }
}
</script>

<style scoped>
.login-text {
  width: 200px;
  margin-bottom: 10px;
  display: block;
}
</style>
