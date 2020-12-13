<template>
  <div class="content">
    <div class="section-header section-header-size">{{ getTitle() }}</div>

    <div class="content-text">
      <div class="dashboard-nav">
        <router-link class="fancytxt" to="/dashboard/images"
          >Edit Images</router-link
        ><span>&nbsp;&bull;&nbsp;</span>
        <router-link class="fancytxt" to="/dashboard/builds"
          >Edit Builds</router-link
        ><span>&nbsp;&bull;&nbsp;</span>
        <router-link class="fancytxt" to="/dashboard/projects"
          >Edit Projects</router-link
        ><span>&nbsp;&bull;&nbsp;</span>
        <router-link class="fancytxt" to="/dashboard/account"
          >Account</router-link
        ><span>&nbsp;&bull;&nbsp;</span>
        <a class="fancytxt" @click="logout()">Logout</a>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AuthAPI from '@/utils/api/auth';
import ConnectionError from '@/utils/errors/types/connection';
import ModalsMixin from '@/mixins/Modals';
import { API_TOKEN_KEY } from '@/store/constants';

export default {
  name: 'dashboard-home',
  mixins: [ModalsMixin],
  methods: {
    getTitle() {
      return document.title;
    },
    async logout() {
      await AuthAPI.logout(
        this.$cookie.get(API_TOKEN_KEY),
        (response, error) => {
          if (error) {
            if (error instanceof ConnectionError) {
              this.showDialog(error.message, error.title, {
                capitalized: true,
              });
            } else {
              this.showDialog(error.data.error, error.statusText, {
                capitalized: true,
              });
            }
          } else {
            this.$cookie.delete(API_TOKEN_KEY);
            this.$router.push({ path: '/login' });
          }
        },
      );
    },
  },
};
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

input[type='checkbox'] {
  -webkit-appearance: checkbox;
}

.required-star:after {
  content: ' *';
  color: red;
}

.clear-button {
  float: right;
  font-size: 10px;
  margin-top: 5px;
}
</style>
