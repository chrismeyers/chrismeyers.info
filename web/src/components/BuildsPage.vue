<template>
  <div class="content">
    <div class="section-header section-header-size">Builds</div>

    <div class="content-text">
      <template v-for="(build, index) in builds">
        <div class="build" :key="build.id" :id="`build-${build.id}`">
          <h2 :class="{ 'first-header': index == 0 }">
            <router-link
              :to="`/builds/${build.id}`"
              :title="`Click for details of ${build.displayDate}`"
              class="fancytxt"
              >{{ build.displayDate }}</router-link
            >
          </h2>
          <div class="build-overview">
            <p>
              An
              <span class="highlighted">{{ cleanCPU(build.cpu) }}</span>
              based system
            </p>
            <p class="right">
              <router-link
                :to="`/builds/${build.id}`"
                :title="`Click for details of ${build.displayDate}`"
                class="subtle fancytxt"
                >Build Details &gt;</router-link
              >
            </p>
          </div>
        </div>
        <template v-if="index < builds.length - 1">
          <br :key="`${build.id}-br`" />
          <hr :key="`${build.id}-hr`" />
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import BuildsAPI from '@/utils/api/builds';
import ConnectionError from '@/utils/errors/types/connection';
import ModalsMixin from '@/mixins/Modals';

export default {
  name: 'builds-page',
  mixins: [ModalsMixin],
  data() {
    return {
      builds: null,
    };
  },
  async beforeRouteEnter(to, from, next) {
    await BuildsAPI.get((builds, error) =>
      next((vm) => vm.setData(builds, error)),
    );
  },
  methods: {
    setData(builds, error) {
      if (error) {
        if (error instanceof ConnectionError) {
          this.showDialog(error.message, error.title, {
            capitalized: true,
          });
        } else {
          this.showDialog(error.data.error, error.statusText, {
            capitalized: true,
          });
        }
      } else {
        this.builds = builds.data.items;
      }
    },
    cleanCPU(cpu) {
      return cpu.split('@')[0].trim();
    },
  },
};
</script>

<style scoped>
.build {
  margin-bottom: 10px;
}

.build-overview {
  margin-left: 40px;
}
</style>
