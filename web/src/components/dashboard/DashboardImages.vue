<template>
  <div>
    <select class="dropdown-mod dashboard-dropdown" v-model="selected">
      <option :value="{}">Add new image</option>
      <option v-for="image in images" :key="image.id" :value="image">Edit {{ image.id }}: {{ image.path }}</option>
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
import DashboardAlertsMixin from "@/mixins/DashboardAlerts"

export default {
  name: "Dashboard-Images",
  mixins: [DashboardAlertsMixin],
  data() {
    return {
      whichButton: "",
      images: [],
      fields: [],
      selected: {},
      lastResponse: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    ImagesAPI.getImages().then(
      images => {
        next(vm => vm.setData(images))
      }
    )
  },
  methods: {
    setData(images) {
      this.images = images.data

      for(const field of Object.keys(this.images[0])) {
        if(field !== "id" && field !== "build" && field !== "project") {
          this.fields.push(field)
        }
      }
    },
    requiredField(field) {
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
        this.lastResponse = await ImagesAPI.updateImage(this.$cookie.get("chrismeyers_info_apiToken"), this.selected)
      }
      else {
        // Add new (POST)
        this.lastResponse = await ImagesAPI.addImage(this.$cookie.get("chrismeyers_info_apiToken"), this.selected)
      }

      if(this.lastResponse.status === 200) {
        const updatedImages = await ImagesAPI.getImages()
        if(updatedImages.status === 200) {
          this.images = updatedImages.data
          this.success("image")
        }
        else {
          this.retrievalError("images")
        }
      }
      else {
        this.addUpdateError("image")
      }
    },
    async deleteEntry() {
      let shouldDelete = confirm("Are you sure you want to delete image " + this.selected.id + "?")

      if(shouldDelete && this.selected.id) {
        this.lastResponse = await ImagesAPI.deleteImage(this.$cookie.get("chrismeyers_info_apiToken"), this.selected)

        if(this.lastResponse.status === 200) {
          const updatedImages = await ImagesAPI.getImages()
          if(updatedImages.status === 200) {
            this.images = updatedImages.data
            this.selected = {}
            this.success("image")
          }
          else {
            this.retrieveError("images")
          }
        }
        else {
          this.deleteError("image")
        }
      }
    }
  }
}
</script>

<style scoped>
.img-preview {
  width: 20%;
  height: 20%;
}
</style>
