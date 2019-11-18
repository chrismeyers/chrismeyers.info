<template>
  <div class="content">
    <div class="section-header section-header-size">Login</div>

    <div class="content-text">
      <p v-if="error !== ''" style="color: red">{{ error }}</p>
      <form @submit.prevent="login">
        <input class="inputbox-mod login-text" v-model="username" placeholder="Username" type="text" required>
        <input class="inputbox-mod login-text" v-model="password" placeholder="Password" type="password" required>
        <input class="submit-button" type="submit" value="Login">
      </form>
    </div>
  </div>
</template>

<script>
import AuthAPI from "@/utils/api/auth"
import ConnectionError from "@/utils/errors/types/connection"

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error: ""
    }
  },
  methods: {
    login() {
      AuthAPI.login(this.username, this.password).then(
        auth => {
          if(auth instanceof ConnectionError) {
            this.error = auth.message
          }
          else if(auth.status === 200) {
            this.error = ""
            this.$cookie.set(
              this.$store.state.tokenKey,
              auth.data["access_token"],
              {expires: "1D"}
            )
            this.$router.push({
              path: "/dashboard",
            })
          }
          else if(auth.status >= 500) {
            this.error = auth.data.error.charAt(0).toUpperCase() + auth.data.error.slice(1)
          }
          else {
            this.error = "Invalid Username or Password"
          }
        }
      )
    }
  }
}
</script>

<style scoped>
input.login-text[type="text"],
input.login-text[type="password"] {
  width: 200px;
  margin-bottom: 10px;
  display: block;
}
</style>
