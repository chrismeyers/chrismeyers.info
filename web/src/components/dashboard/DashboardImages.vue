<template>
  <div>
    <select class="dropdown-mod dashboard-dropdown" v-model="selected">
      <option :value="{}">Add new image</option>
      <option v-for="image in items" :key="image.id" :value="image">Edit {{ image.id }}: {{ image.path }}</option>
    </select>

    <br />

    <template v-if="selected.id">
      <img :src="selected.path" class="img-preview">
    </template>

    <form @submit.prevent="routeFormSubmission">
      <template v-for="(field, index) in fields">
        <span :key="index + '-span'"><b>{{ field }}:</b></span><span :key="index + '-req'" v-if="requiredField(field)" class="required-star"></span>
        <input class="inputbox-mod dashboard-text" type="text" v-model="selected[field]" :placeholder="field" :key="index + '-input'" required>
      </template>

      <div class="dashboard-buttons">
        <input class="submit-button dashboard-button" type="submit" @click="whichButton = 'addUpdate'" :value="selected.id ? 'Update' : 'Add'">
        <input class="submit-button delete-button" type="submit" @click="whichButton = 'delete'" v-if="selected.id" value="Delete">
      </div>
    </form>
  </div>
</template>

<script>
import ImagesAPI from "@/utils/api/images"
import DashboardBaseMixin from "@/mixins/DashboardBase"
import DashboardAlertsMixin from "@/mixins/DashboardAlerts"

export default {
  name: "Dashboard-Images",
  mixins: [DashboardBaseMixin, DashboardAlertsMixin],
  data() {
    return {
      componentIgnoredFields: ["build", "project"],
      optionalFields: [],
      type: {singular: "image", plural: "images"},
      api: ImagesAPI
    }
  },
  beforeRouteEnter(to, from, next) {
    ImagesAPI.get().then(
      images => {
        next(vm => vm.setData(images))
      }
    )
  },
  methods: {}
}
</script>

<style scoped>
.img-preview {
  width: 20%;
  height: 20%;
}
</style>
