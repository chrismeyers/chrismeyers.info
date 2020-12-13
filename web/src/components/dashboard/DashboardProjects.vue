<template>
  <div>
    <select class="dropdown-mod dashboard-dropdown" v-model="selected">
      <option v-for="project in items" :key="project.id" :value="project">
        {{
          project.id > 0
            ? `Edit ${project.id}: ${project.title}`
            : 'Add new project'
        }}
      </option>
    </select>

    <br />

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
        <template v-else-if="field.tag === 'textarea'">
          <textarea
            class="textarea-mod dashboard-text"
            v-model="selected[field.field]"
            :placeholder="field.field"
            :key="`${index}-textarea`"
            :required="field.required"
          ></textarea>
        </template>
        <template v-else-if="field.tag === 'select'">
          <a
            class="fancytxt clear-button"
            :key="`${index}-clear`"
            @click="selected.images = []"
            >clear</a
          >
          <select
            class="select-scroll-mod"
            size="10"
            :key="`${index}-select`"
            :multiple="field.multiple"
            v-model="selected.images"
          >
            <option v-for="image in images" :key="image.id" :value="image.id">
              {{ `Image ${image.id}: ${image.path}` }}
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
import ProjectsAPI from '@/utils/api/projects';
import ImagesAPI from '@/utils/api/images';
import DashboardBaseMixin from '@/mixins/DashboardBase';

export default {
  name: 'dashboard-projects',
  mixins: [DashboardBaseMixin],
  data() {
    return {
      type: { singular: 'project', plural: 'projects' },
      api: ProjectsAPI,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      ProjectsAPI.get({
        schema: null,
        inactive: null,
      })
        .then((response) => vm.setData({ response }))
        .catch((error) => vm.setData({ error }));

      ImagesAPI.get()
        .then((response) => vm.setImages({ response }))
        .catch((error) => vm.setImages({ error }));
    });
  },
  methods: {
    flattenData(projects) {
      // The images for each project is an array of objects. Since the API only
      // takes an array of image IDs when creating/updating the images of a
      // project, we can modify the image field of the data we received from
      // the GET to only include an comma separated list of image IDs.
      //
      // The API returns startedDate as a timestamp. The HTML date input type
      // only works if given a date, so the time is trimmed off.
      const flatProjects = [];
      for (const project of projects.data.items) {
        if (project.images) {
          const imageIds = [];
          for (const image of project.images) {
            imageIds.push(image.id);
          }
          project.images = imageIds;
        }
        project.startedDate = project.startedDate.split('T')[0];
        flatProjects.push(project);
      }

      // The images select requires the model to be an array, not null
      const blank = this.createBlankEntry(projects.data.items[0]);
      blank.images = [];
      return [blank, ...flatProjects];
    },
  },
};
</script>
