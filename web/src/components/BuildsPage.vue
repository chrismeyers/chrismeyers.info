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
  beforeRouteEnter(to, from, next) {
    BuildsAPI.get().then((builds) => {
      next((vm) => vm.setData(builds));
    });
  },
  methods: {
    setData(builds) {
      if (builds instanceof ConnectionError) {
        this.showDialog(builds.message, builds.title, { capitalized: true });
      } else if (builds.status === 200) {
        this.builds = builds.data.items;
      } else {
        this.showDialog(builds.data.error, builds.statusText, {
          capitalized: true,
        });
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
