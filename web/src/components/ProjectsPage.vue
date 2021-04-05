<template>
  <div class="content">
    <div class="section-header section-header-size">Projects</div>

    <div class="content-text">
      <template v-for="(project, index) in projects">
        <div class="project" :key="project.id">
          <h2 :class="{ 'first-header': index == 0 }">
            <router-link
              :to="`/projects/${project.id}`"
              :title="`Click for details of ${project.title}`"
              class="fancytxt"
              >{{ project.title }}</router-link
            >
          </h2>
          <h3>{{ project.displayDate }}</h3>
          <div class="project-overview">
            <p v-html="project.info"></p>
            <p class="right">
              <router-link
                :to="`/projects/${project.id}`"
                :title="`Click for details of ${project.title}`"
                class="subtle fancytxt"
                >Project Details &gt;</router-link
              >
            </p>
          </div>
        </div>

        <template v-if="index < projects.length - 1">
          <br :key="`${project.id}-br`" />
          <hr :key="`${project.id}-hr`" />
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import ProjectsAPI from '@/utils/api/projects';
import ErrorsMixin from '@/mixins/Errors';

export default {
  name: 'projects-page',
  mixins: [ErrorsMixin],
  data() {
    return {
      projects: null,
    };
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const projects = await ProjectsAPI.get();
      next((vm) => vm.setData({ projects }));
    } catch (error) {
      next((vm) => vm.setData({ error }));
    }
  },
  methods: {
    setData({ projects = null, error = null }) {
      if (error) {
        this.handleCommonErrors(error);
      } else {
        this.projects = projects.data.items;
      }
    },
  },
};
</script>

<style scoped>
.project {
  height: auto;
}

.project-overview {
  margin-left: 40px;
}
</style>
