<template>
  <div>
    <select class="dropdown-mod dashboard-dropdown" v-model="selected">
      <option :value="{}">Add new project</option>
      <option v-for="project in projects" :key="project.id" :value="project">Edit {{ project.id }}: {{ project.title }}</option>
    </select>

    <br />

    <form @submit.prevent="routeFormSubmission">
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
import ProjectsAPI from "@/utils/api/projects"

export default {
  name: "DashboardProjects",
  data() {
    return {
      whichButton: "",
      projects: [],
      fields: [],
      selected: {},
      lastResponse: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    ProjectsAPI.getProjects().then(
      projects => {
        next(vm => vm.setData(projects))
      }
    )
  },
  methods: {
    setData(projects) {
      this.projects = this.flattenProjectData(projects)

      for(const field of Object.keys(this.projects[0])) {
        if(field !== "id") {
          this.fields.push(field)
        }
      }
    },
    flattenProjectData(projects) {
      // The images for each project is an array of objects. Since the API only
      // takes an array of image IDs when creating/updating the images of a
      // project, we can modify the image field of the data we received from
      // the GET to only include an comma separated list of image IDs.
      let flatProjects = []
      for(let project of projects.data) {
        if(project.images) {
          let imageIds = []
          for(let image of project.images) {
            imageIds.push(image.id)
          }
          project.images = imageIds.join()
        }
        flatProjects.push(project)
      }

      return flatProjects
    },
    requiredField(field) {
      // These are the nullable fields.
      if(field === "webUrl" || field === "images") {
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
        this.lastResponse = await ProjectsAPI.updateProject(this.$cookie.get("chrismeyers_info_apiToken"), this.selected)
      }
      else {
        // Add new (POST)
        this.lastResponse = await ProjectsAPI.addProject(this.$cookie.get("chrismeyers_info_apiToken"), this.selected)
      }

      if(this.lastResponse.status === 200) {
        const updatedProjects = await ProjectsAPI.getProjects()
        if(updatedProjects.status === 200) {
          this.projects = this.flattenProjectData(updatedProjects)
          let action = (this.lastResponse.config.method === "post") ? "Added" : "Updated"
          alert(action + " project " + this.lastResponse.data.id)
        }
      }
    },
    async deleteEntry() {
      let shouldDelete = confirm("Are you sure you want to delete project " + this.selected.id + "?")

      if(shouldDelete && this.selected.id) {
        this.lastResponse = await ProjectsAPI.deleteProject(this.$cookie.get("chrismeyers_info_apiToken"), this.selected)

        if(this.lastResponse.status === 200) {
          const updatedProjects = await ProjectsAPI.getProjects()
          if(updatedProjects.status === 200) {
            this.projects = this.flattenProjectData(updatedProjects)
            this.selected = {}
            alert("Deleted project " + this.lastResponse.data.id)
          }
        }
      }
    }
  }
}
</script>
