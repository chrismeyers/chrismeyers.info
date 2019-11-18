<template>
  <div>
    <div>
      <h3>Change Password</h3>
      <p v-if="error !== null" style="color: red">{{ error }}</p>
      <form @submit.prevent="updatePassword">
        <input class="inputbox-mod dashboard-text" type="password" v-model="passwords['initial']" placeholder="New Password"><br />
        <input class="inputbox-mod dashboard-text" type="password" v-model="passwords['confirm']" placeholder="Confirm Password">

        <div class="dashboard-buttons">
          <input class="submit-button dashboard-button" type="submit" value="Update">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import AccountAPI from "@/utils/api/account"
  import DashboardMessagesMixin from "@/mixins/DashboardMessages"
  import ModalsMixin from "@/mixins/Modals"

  export default {
    name: "Dashboard-Account",
    mixins: [DashboardMessagesMixin, ModalsMixin],
    data() {
      return {
        passwords: {
          "initial": "",
          "confirm": ""
        },
        error: null,
        lastResponse: {}
      }
    },
    methods: {
      async updatePassword() {
        if(this.passwords["initial"] !== this.passwords["confirm"]) {
          this.error = "Passwords do not match"
        } else if(this.passwords["initial"] !== "" && this.passwords["confirm"] !== "") {
          this.error = null
          this.lastResponse = await AccountAPI.updatePassword(
            this.$cookie.get(this.$store.state.tokenKey),
            this.passwords["initial"]
          )

          let result = {}
          if(this.lastResponse.status === 200) {
            result = this.success("password", false)
          }
          else {
            result = this.modificationError("password", false)
          }

          // Prevent closing the dialog by pressing enter to submit form.
          setTimeout(() => this.showDialog(result.title, result.body), 100)
        }

        this.passwords = {
          "initial": "",
          "confirm": ""
        }
      }
    }
  }
</script>

<style scoped>
.inputbox-mod {
  width: calc(50% - 5px - 5px - 2px);
}
</style>
