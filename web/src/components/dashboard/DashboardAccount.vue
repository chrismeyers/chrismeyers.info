<template>
  <div>
    <div>
      <h3>Change Password</h3>
      <p v-if="lastError !== null" style="color: red">{{ lastError }}</p>
      <form @submit.prevent="updatePassword">
        <input
          class="inputbox-mod dashboard-text"
          type="password"
          v-model="passwords['initial']"
          placeholder="New Password"
        /><br />
        <input
          class="inputbox-mod dashboard-text"
          type="password"
          v-model="passwords['confirm']"
          placeholder="Confirm Password"
        />

        <div class="dashboard-buttons">
          <input
            class="submit-button dashboard-button"
            type="submit"
            value="Update"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AccountAPI from '@/utils/api/account';
import DashboardBaseMixin from '@/mixins/DashboardBase';
import { API_TOKEN_KEY } from '@/store/constants';

export default {
  name: 'dashboard-account',
  mixins: [DashboardBaseMixin],
  data() {
    return {
      passwords: {
        initial: '',
        confirm: '',
      },
    };
  },
  methods: {
    async updatePassword() {
      if (this.passwords.initial !== this.passwords.confirm) {
        this.lastError = 'Passwords do not match';
      } else if (
        this.passwords.initial !== '' &&
        this.passwords.confirm !== ''
      ) {
        await AccountAPI.updatePassword(
          this.$cookie.get(API_TOKEN_KEY),
          this.passwords.initial,
          (response, error) => {
            this.lastResponse = response;
            this.lastError = error;
          },
        );

        let result = {};
        if (this.lastError) {
          result = this.modificationError('password', false);
        } else {
          result = this.success('password', false);
        }

        this.displayResult(result, { capitalized: true });
      }

      this.passwords = {
        initial: '',
        confirm: '',
      };
    },
  },
};
</script>

<style scoped>
.inputbox-mod {
  width: calc(50% - 5px - 5px - 2px);
}
</style>
