<template>
  <div>
    <select class="dropdown-mod dashboard-dropdown" v-model="selected">
      <option v-for="build in items" :key="build.id" :value="build">{{
        build.id > 0
          ? `Edit ${build.id}: ${build.displayDate}`
          : "Add new build"
      }}</option>
    </select>

    <br />

    <form @submit.prevent="routeFormSubmission">
      <template v-for="(field, index) in schema">
        <span :key="index + '-span'"
          ><b>{{ field.field }}:</b></span
        ><span
          :key="index + '-req'"
          v-if="field.required"
          class="required-star"
        ></span>
        <template v-if="field.tag === 'input'">
          <input
            class="inputbox-mod dashboard-text"
            :type="field.type"
            v-model="selected[field.field]"
            :placeholder="field.field"
            :key="index + '-input'"
            :required="field.required"
          />
        </template>
        <template v-else-if="field.tag === 'select'">
          <a
            class="fancytxt clear-button"
            :key="index - '-clear'"
            @click="selected.image = null"
            >clear</a
          >
          <select
            class="select-scroll-mod"
            size="10"
            :key="index + '-select'"
            :multiple="field.multiple"
            v-model="selected.image"
          >
            <option v-for="image in images" :key="image.id" :value="image.id">{{
              `Image ${image.id}: ${image.path}`
            }}</option>
          </select>
        </template>
      </template>

      <div class="dashboard-buttons">
        <input
          class="submit-button dashboard-button"
          type="submit"
          @click="whichButton = 'addUpdate'"
          :value="selected.id > 0 ? 'Update' : 'Add'"
        />
        <input
          class="submit-button delete-button"
          type="submit"
          @click="whichButton = 'delete'"
          v-if="selected.id > 0"
          value="Delete"
        />
      </div>
    </form>
  </div>
</template>

<script>
import BuildsAPI from "@/utils/api/builds"
import ImagesAPI from "@/utils/api/images"
import DashboardBaseMixin from "@/mixins/DashboardBase"

export default {
  name: "dashboard-builds",
  mixins: [DashboardBaseMixin],
  data() {
    return {
      type: { singular: "build", plural: "builds" },
      api: BuildsAPI
    }
  },
  async beforeRouteEnter(to, from, next) {
    let builds = await BuildsAPI.get({ schema: null })
    let images = await ImagesAPI.get()
    next(vm => {
      vm.setData(builds)
      vm.setImages(images)
    })
  },
  methods: {
    flattenData(builds) {
      // The image for each build is an object. Since the API only takes the
      // image ID when creating/updating the image of a build, we can modify
      // the image field of the data we received from the GET to only include
      // the image ID.
      //
      // The API returns startedDate as a timestamp. The HTML date input type
      // only works if given a date, so the time is trimmed off.
      let flatBuilds = []
      for (let build of builds.data.items) {
        if (build.image) {
          build.image = build.image.id
        }
        build.startedDate = build.startedDate.split("T")[0]
        flatBuilds.push(build)
      }

      return [this.createBlankEntry(builds.data.items[0]), ...flatBuilds]
    }
  }
}
</script>
