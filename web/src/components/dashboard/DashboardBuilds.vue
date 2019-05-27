<template>
  <div>
    <select class="dropdown-mod dashboard-dropdown" v-model="selected">
      <option v-for="build in items" :key="build.id" :value="build">{{ (build.id > 0) ? ("Edit " + build.id + ": " + build.date) : "Add new build" }}</option>
    </select>

    <br />

    <form @submit.prevent="routeFormSubmission">
      <span><b>active:</b></span><br />
      <input type="checkbox" v-model="selected.active"><br />
      <template v-for="(field, index) in schema">
        <span :key="index + '-span'"><b>{{ field.field }}:</b></span><span :key="index + '-req'" v-if="field.required" class="required-star"></span>
        <template v-if="field.tag === 'input'">
          <input class="inputbox-mod dashboard-text" :type="field.type" v-model="selected[field.field]" :placeholder="field.field" :key="index + '-input'" :required="field.required">
        </template>
      </template>

      <div class="dashboard-buttons">
        <input class="submit-button dashboard-button" type="submit" @click="whichButton = 'addUpdate'" :value="(selected.id > 0) ? 'Update' : 'Add'">
        <input class="submit-button delete-button" type="submit" @click="whichButton = 'delete'" v-if="selected.id > 0" value="Delete">
      </div>
    </form>
  </div>
</template>

<script>
import BuildsAPI from "@/utils/api/builds"
import DashboardBaseMixin from "@/mixins/DashboardBase"
import DashboardAlertsMixin from "@/mixins/DashboardAlerts"

export default {
  name: "Dashboard-Builds",
  mixins: [DashboardBaseMixin, DashboardAlertsMixin],
  data() {
    return {
      type: {singular: "build", plural: "builds"},
      api: BuildsAPI
    }
  },
  beforeRouteEnter(to, from, next) {
    BuildsAPI.get().then(
      builds => {
        next(vm => vm.setData(builds))
      }
    )
  },
  methods: {
    flattenData(builds) {
      // The image for each build is an object. Since the API only takes the
      // image ID when creating/updating the image of a build, we can modify
      // the image field of the data we received from the GET to only include
      // the image ID.
      let flatBuilds = []
      for(let build of builds.data.items) {
        if(build.image) {
          build.image = build.image.id
        }
        flatBuilds.push(build)
      }

      return [this.createBlankEntry(builds.data.items[0]), ...flatBuilds]
    }
  }
}
</script>
