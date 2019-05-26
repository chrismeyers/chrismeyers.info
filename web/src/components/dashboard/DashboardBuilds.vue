<template>
  <div>
    <select class="dropdown-mod dashboard-dropdown" v-model="selected">
      <option :value="{}">Add new build</option>
      <option v-for="build in builds" :key="build.id" :value="build">[{{ build.active ? "A" : "I" }}] Edit {{ build.id }}: {{ build.date }}</option>
    </select>

    <br />

    <form @submit.prevent="routeFormSubmission">
      <span><b>active:</b></span><br />
      <input type="checkbox" v-model="selected['active']"><br />
      <template v-for="(field, index) in fields">
        <span :key="index + '-span'"><b>{{ field }}:</b></span>
        <input class="inputbox-mod dashboard-text" type="text" v-model="selected[field]" :placeholder="field" :key="index + '-input'" :required="requiredField(field)">
      </template>

      <div class="dashboard-buttons">
        <input class="submit-button dashboard-button" type="submit" @click="whichButton = 'addUpdate'" :value="selected.id ? 'Update' : 'Add'">
        <input class="submit-button delete-button" type="submit" @click="whichButton = 'delete'" v-if="selected.id" value="Delete">
      </div>
    </form>
  </div>
</template>

<script>
import BuildsAPI from "@/utils/api/builds"
import DashboardAlertsMixin from "@/mixins/DashboardAlerts"

export default {
  name: "Dashboard-Builds",
  mixins: [DashboardAlertsMixin],
  data() {
    return {
      whichButton: "",
      builds: [],
      fields: [],
      selected: {},
      lastResponse: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    BuildsAPI.getBuilds().then(
      builds => {
        next(vm => vm.setData(builds))
      }
    )
  },
  methods: {
    setData(builds) {
      this.builds = this.flattenBuildData(builds)

      for(const field of Object.keys(this.builds[0])) {
        if(field !== "id" && field !== "active") {
          this.fields.push(field)
        }
      }
    },
    flattenBuildData(builds) {
      // The image for each build is an object. Since the API only takes the
      // image ID when creating/updating the image of a build, we can modify
      // the image field of the data we received from the GET to only include
      // the image ID.
      let flatBuilds = []
      for(let build of builds.data) {
        if(build.image) {
          build.image = build.image.id
        }
        flatBuilds.push(build)
      }

      return flatBuilds
    },
    requiredField(field) {
      // These are the nullable fields.
      if(field === "cool" || field === "ssd" || field === "image") {
        return false
      }

      return true
    },
    routeFormSubmission() {
      if(this.whichButton === "addUpdate") {
        this.addUpdateEntry()
      }
      else if(this.whichButton === "delete") {
        this.deleteEntry()
      }
    },
    async addUpdateEntry() {
      if(this.selected.id) {
        // Update existing (PUT)
        this.lastResponse = await BuildsAPI.updateBuild(this.$cookie.get("chrismeyers_info_apiToken"), this.selected)
      }
      else {
        // Add new (POST)
        this.lastResponse = await BuildsAPI.addBuild(this.$cookie.get("chrismeyers_info_apiToken"), this.selected)
      }

      if(this.lastResponse.status === 200) {
        const updatedBuilds = await BuildsAPI.getBuilds()
        if(updatedBuilds.status === 200) {
          this.builds = this.flattenBuildData(updatedBuilds)
          this.success("build")
        }
        else {
          this.retrievalError("builds")
        }
      }
      else {
        this.addUpdateError("build")
      }
    },
    async deleteEntry() {
      let shouldDelete = confirm("Are you sure you want to delete build " + this.selected.id + "?")

      if(shouldDelete && this.selected.id) {
        this.lastResponse = await BuildsAPI.deleteBuild(this.$cookie.get("chrismeyers_info_apiToken"), this.selected)

        if(this.lastResponse.status === 200) {
          const updatedBuilds = await BuildsAPI.getBuilds()
          if(updatedBuilds.status === 200) {
            this.builds = this.flattenBuildData(updatedBuilds)
            this.selected = {}
            this.success("build")
          }
          else {
            this.retrievalError("builds")
          }
        }
        else {
          this.deleteError("build")
        }
      }
    }
  }
}
</script>
