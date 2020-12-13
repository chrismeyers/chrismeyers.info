<template>
  <div class="content">
    <div class="section-header section-header-size">Login</div>

    <div class="content-text">
      <p v-if="error !== ''" style="color: red">{{ error }}</p>
      <form @submit.prevent="login">
        <input
          class="inputbox-mod login-text"
          v-model="username"
          placeholder="Username"
          type="text"
          required
        />
        <input
          class="inputbox-mod login-text"
          v-model="password"
          placeholder="Password"
          type="password"
          required
        />
        <input class="submit-button" type="submit" value="Login" />
      </form>
    </div>
  </div>
</template>

<script>
import AuthAPI from '@/utils/api/auth';
import ConnectionError from '@/utils/errors/types/connection';
import { API_TOKEN_KEY } from '@/store/constants';

export default {
  name: 'login-page',
  data() {
    return {
      username: '',
      password: '',
      error: '',
    };
  },
  methods: {
    login() {
      AuthAPI.login(this.username, this.password)
        .then((response) => {
          this.error = '';
          this.$cookie.set(API_TOKEN_KEY, response.data.access_token, {
            expires: '1D',
          });
          this.$router.push({ path: '/dashboard' });
        })
        .catch((error) => {
          if (error instanceof ConnectionError) {
            this.error = error.message;
          } else if (error.status >= 500) {
            this.error =
              error.data.error.charAt(0).toUpperCase() +
              error.data.error.slice(1);
          } else {
            this.error = 'Invalid Username or Password';
          }
        });
    },
  },
};
</script>

<style scoped>
input.login-text[type='text'],
input.login-text[type='password'] {
  width: 200px;
  margin-bottom: 10px;
  display: block;
}
</style>
