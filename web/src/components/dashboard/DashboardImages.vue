<template>
  <div>
    <select v-model="selected">
      <option :value="{}">Add new image</option>
      <option v-for="image in images" :key="image.id" :value="image">Edit {{ image.id }}: {{ image.path }}</option>
    </select>

    <br />

    <template v-if="selected.id">
      <br />
      <img :src="selected.path" class="img-preview">
      <br />
    </template>

    <br />

    <template v-for="(field, index) in fields">
      <span :key="index + '-span'">{{ field }}: </span>
      <input v-model="selected[field]" :placeholder="field" :key="index + '-input'">
      <br :key="index + '-br'"/>
    </template>

    <button @click="submitForm()">{{ selected.id ? 'Update' : 'Add' }}</button>
    <button v-if="selected.id" @click="deleteEntry()">Delete</button>
  </div>
</template>

<script>
import ImagesApi from "@/utils/api/images"

export default {
  name: "DashboardImages",
  data() {
    return {
      images: [],
      fields: [],
      selected: {},
      current: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    ImagesApi.getImages().then(
      images => {
        next(vm => vm.setData(images))
      }
    )
  },
  watch: {
    months: function (newVal) {
      this.gotoMonth(newVal);
    }
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
    async submitForm() {
      if(this.selected.id) {
        // Update existing (PUT)
        this.current = await ImagesApi.updateImage(this.$cookie.get("chrismeyers_info_apiToken"), this.selected)
      }
      else {
        // Add new (POST)
        this.current = await ImagesApi.addImage(this.$cookie.get("chrismeyers_info_apiToken"), this.selected)
      }

      if(this.current.status === 200) {
        const updatedImages = await ImagesApi.getImages()
        if(updatedImages.status === 200) {
          this.images = updatedImages.data
          let action = (this.current.config.method === "post") ? "Added" : "Updated"
          alert(action + " image " + this.current.data.id)
        }
      }
    },
    async deleteEntry() {
      if(this.selected.id) {
        this.current = await ImagesApi.deleteImage(this.$cookie.get("chrismeyers_info_apiToken"), this.selected)

        if(this.current.status === 200) {
          const updatedImages = await ImagesApi.getImages()
          if(updatedImages.status === 200) {
            this.images = updatedImages.data
            this.selected = {}
            alert("Deleted image " + this.current.data.id)
          }
        }
      }
    }
  }
}
</script>

<style>
.img-preview {
  width: 20%;
  height: 20%;
}
</style>
