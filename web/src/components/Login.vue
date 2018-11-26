<template>
  <div>
    <p v-if="error">Invalid Username or Password</p>
    <input v-model="username" placeholder="Username">
    <br />
    <input v-model="password" placeholder="Password" type="password">
    <br />
    <button @click="login()">Login</button>
  </div>
</template>

<script>
import AuthApi from "@/utils/api/auth"

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
      AuthApi.login(this.username, this.password).then(
        auth => {
          if(auth.status === 200) {
            this.error = false
            this.$cookie.set( "chrismeyers_info_apiToken", auth.data["access_token"], {expires: "1M"})
            this.$router.push({
              path: "/dashboard",
            });
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
