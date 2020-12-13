<template>
  <div>
    <select class="dropdown-mod dashboard-dropdown" v-model="selected">
      <option v-for="image in items" :key="image.id" :value="image">
        {{ image.id > 0 ? `Edit ${image.id}: ${image.path}` : 'Add new image' }}
      </option>
    </select>

    <br />

    <img v-if="selected.path" :src="selected.path" class="img-preview" />

    <form @submit.prevent="routeFormSubmission">
      <template v-for="(field, index) in schema">
        <span :key="`${index}-span`"
          ><b>{{ field.field }}:</b></span
        ><span
          :key="`${index}-req`"
          v-if="field.required"
          class="required-star"
        ></span>
        <template v-if="field.tag === 'input'">
          <input
            class="inputbox-mod dashboard-text"
            :type="field.type"
            v-model="selected[field.field]"
            :placeholder="field.field"
            :key="`${index}-input`"
            :required="field.required"
          />
        </template>
        <template v-else-if="field.tag === 'select'">
          <select
            class="select-mod"
            v-model="selected[field.field]"
            :placeholder="field.field"
            :key="`${index}-select`"
            :required="field.required"
          >
            <option
              v-for="option in field.options"
              :key="`${option}-option`"
              :value="option"
            >
              {{ option }}
            </option>
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
import ImagesAPI from '@/utils/api/images';
import DashboardBaseMixin from '@/mixins/DashboardBase';

export default {
  name: 'dashboard-images',
  mixins: [DashboardBaseMixin],
  data() {
    return {
      type: { singular: 'image', plural: 'images' },
      api: ImagesAPI,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      ImagesAPI.get({ schema: null })
        .then((response) => vm.setData({ response }))
        .catch((error) => vm.setData({ error }));
    });
  },
  methods: {},
};
</script>

<style scoped>
.img-preview {
  width: 20%;
  height: 20%;
}
</style>
