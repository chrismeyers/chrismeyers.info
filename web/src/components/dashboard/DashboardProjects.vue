<template>
  <div>
    <select class="dropdown-mod dashboard-dropdown" v-model="selected">
      <option v-for="project in items" :key="project.id" :value="project">{{ (project.id > 0) ? ("Edit " + project.id + ": " + project.title) : "Add new project" }}</option>
    </select>

    <br />

    <form @submit.prevent="routeFormSubmission">
      <span><b>active:</b></span><br />
      <input type="checkbox" v-model="selected.active"><br />
      <template v-for="(field, index) in fields">
        <span :key="index + '-span'"><b>{{ field }}:</b></span><span :key="index + '-req'" v-if="requiredField(field)" class="required-star"></span>
        <input class="inputbox-mod dashboard-text" type="text" v-model="selected[field]" :placeholder="field" :key="index + '-input'" :required="requiredField(field)">
      </template>

      <div class="dashboard-buttons">
        <input class="submit-button dashboard-button" type="submit" @click="whichButton = 'addUpdate'" :value="(selected.id > 0) ? 'Update' : 'Add'">
        <input class="submit-button delete-button" type="submit" @click="whichButton = 'delete'" v-if="selected.id > 0" value="Delete">
      </div>
    </form>
  </div>
</template>

<script>
import ProjectsAPI from "@/utils/api/projects"
import DashboardBaseMixin from "@/mixins/DashboardBase"
import DashboardAlertsMixin from "@/mixins/DashboardAlerts"

export default {
  name: "Dashboard-Projects",
  mixins: [DashboardBaseMixin, DashboardAlertsMixin],
  data() {
    return {
      componentIgnoredFields: [],
      optionalFields: ["webUrl", "images"],
      type: {singular: "project", plural: "projects"},
      api: ProjectsAPI
    }
  },
  beforeRouteEnter(to, from, next) {
    ProjectsAPI.get().then(
      projects => {
        next(vm => vm.setData(projects))
      }
    )
  },
  methods: {
    flattenData(projects) {
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

      return [this.createBlankEntry(projects.data[0]), ...flatProjects]
    }
  }
}
</script>
