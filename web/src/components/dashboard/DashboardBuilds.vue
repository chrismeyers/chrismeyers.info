<template>
  <div>
    <select v-model="selected">
      <option :value="{}">Add new build</option>
      <option v-for="build in builds" :key="build.id" :value="build">Edit {{ build.id }}: {{ build.date }}</option>
    </select>

    <br />

    <form @submit.prevent="routeFormSubmission">
      <template v-for="(field, index) in fields">
        <span :key="index + '-span'">{{ field }}: </span>
        <input v-model="selected[field]" :placeholder="field" :key="index + '-input'" :required="requiredField(field)">
        <br :key="index + '-br'"/>
      </template>

      <input type="submit" @click="whichButton = 'addUpdate'" :value="selected.id ? 'Update' : 'Add'">
      <input type="submit" @click="whichButton = 'delete'" v-if="selected.id" value="Delete">
    </form>
  </div>
</template>

<script>
import BuildsApi from "@/utils/api/builds"

export default {
  name: "DashboardBuilds",
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
    BuildsApi.getBuilds().then(
      builds => {
        next(vm => vm.setData(builds))
      }
    )
  },
  methods: {
    setData(builds) {
      this.builds = this.flattenBuildData(builds)

      for(const field of Object.keys(this.builds[0])) {
        if(field !== "id") {
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
        this.lastResponse = await BuildsApi.updateBuild(this.$cookie.get("chrismeyers_info_apiToken"), this.selected)
      }
      else {
        // Add new (POST)
        this.lastResponse = await BuildsApi.addBuild(this.$cookie.get("chrismeyers_info_apiToken"), this.selected)
      }

      if(this.lastResponse.status === 200) {
        const updatedBuilds = await BuildsApi.getBuilds()
        if(updatedBuilds.status === 200) {
          this.builds = this.flattenBuildData(updatedBuilds)
          let action = (this.lastResponse.config.method === "post") ? "Added" : "Updated"
          alert(action + " build " + this.lastResponse.data.id)
        }
      }
    },
    async deleteEntry() {
      let shouldDelete = confirm("Are you sure you want to delete build " + this.selected.id + "?")

      if(shouldDelete && this.selected.id) {
        this.lastResponse = await BuildsApi.deleteBuild(this.$cookie.get("chrismeyers_info_apiToken"), this.selected)

        if(this.lastResponse.status === 200) {
          const updatedBuilds = await BuildsApi.getBuilds()
          if(updatedBuilds.status === 200) {
            this.builds = this.flattenBuildData(updatedBuilds)
            this.selected = {}
            alert("Deleted build " + this.lastResponse.data.id)
          }
        }
      }
    }
  }
}
</script>
