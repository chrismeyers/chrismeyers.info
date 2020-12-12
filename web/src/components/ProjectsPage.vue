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
import ConnectionError from '@/utils/errors/types/connection';
import ModalsMixin from '@/mixins/Modals';

export default {
  name: 'projects-page',
  mixins: [ModalsMixin],
  data() {
    return {
      projects: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    ProjectsAPI.get().then((projects) => {
      next((vm) => vm.setData(projects));
    });
  },
  methods: {
    setData(projects) {
      if (projects instanceof ConnectionError) {
        this.showDialog(projects.message, projects.title, {
          capitalized: true,
        });
      } else if (projects.status === 200) {
        this.projects = projects.data.items;
      } else {
        this.showDialog(projects.data.error, projects.statusText, {
          capitalized: true,
        });
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
