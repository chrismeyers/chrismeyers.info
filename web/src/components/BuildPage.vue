<template>
  <div class="content">
    <div class="section-header section-header-size">Build Details</div>

    <div class="content-text">
      <template v-if="error">
        <p class="center">
          Build
          <span>
            <pre class="highlighted">{{ $route.params.id }}</pre>
          </span>
          does not exist
        </p>
      </template>
      <template v-else-if="build">
        <div class="build" :key="build.id">
          <h2>{{ build.displayDate }}</h2>
          <div class="build-info">
            <div class="build-specs">
              <dl>
                <dt class="dt-mod"><b>CPU</b></dt>
                <dd>{{ build.cpu }}</dd>
                <template v-if="build.cool !== null">
                  <dt class="dt-mod"><b>Cooling</b></dt>
                  <dd>{{ build.cool }}</dd>
                </template>
                <dt class="dt-mod"><b>Motherboard</b></dt>
                <dd>{{ build.mobo }}</dd>
                <dt class="dt-mod"><b>RAM</b></dt>
                <dd>{{ build.ram }}</dd>
                <dt class="dt-mod"><b>HDD</b></dt>
                <dd>{{ build.hdd }}</dd>
                <template v-if="build.ssd !== null">
                  <dt class="dt-mod"><b>SSD</b></dt>
                  <dd>{{ build.ssd }}</dd>
                </template>
                <dt class="dt-mod"><b>GPU</b></dt>
                <dd>{{ build.gpu }}</dd>
              </dl>
            </div>
            <div v-if="build.image" class="build-pic">
              <img
                v-img
                v-if="build.image"
                :src="build.image.path"
                :class="`build-pic-img-${build.image.orient}`"
                :alt="build.image.title"
                title="Click to enlarge"
              />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import BuildsAPI from '@/utils/api/builds';
import ErrorsMixin from '@/mixins/Errors';
import BuildsMixin from '@/mixins/Builds';
import { DEFAULT_DOCUMENT_TITLE } from '@/store/constants';

export default {
  name: 'build-page',
  mixins: [ErrorsMixin, BuildsMixin],
  data() {
    return {
      build: null,
      error: false,
    };
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const build = await BuildsAPI.getById(to.params.id);
      next((vm) => vm.setData({ build }));
    } catch (error) {
      next((vm) => vm.setData({ error }));
    }
  },
  async beforeRouteUpdate(to, from, next) {
    try {
      const build = await BuildsAPI.getById(to.params.id);
      this.setData({ build });
    } catch (error) {
      this.setData({ error });
    } finally {
      next();
    }
  },
  methods: {
    setData({ build = null, error = null }) {
      if (error) {
        if ([400, 404].includes(error.statusCode)) {
          this.error = true;
        } else {
          this.handleCommonErrors(error);
        }
      } else {
        this.build = build.data;
        this.error = false;
        this.updateDocumentTitle();
      }
    },
    updateDocumentTitle() {
      const cpu = this.cleanCPU(this.build.cpu);
      document.title = `Build Details | ${cpu} | ${DEFAULT_DOCUMENT_TITLE}`;
    },
  },
};
</script>

<style scoped>
.content-text {
  max-width: 1000px;
}

.build {
  margin-bottom: 10px;
}

.build-info {
  margin: 10px;
  padding: 0;
}

.build-pic:hover {
  cursor: pointer;
}

.build-pic-img-land,
.build-pic-img-port {
  border-style: solid;
  border-width: 1px;
  border-color: #707070;
}

@media screen and (min-width: 970px) {
  .build-info {
    display: -webkit-flex;
    display: flex;
  }

  .build-specs {
    -webkit-flex: 3;
    flex: 3;
    padding-right: 20px;
  }

  .build-pic {
    -webkit-flex: 2;
    flex: 2;
  }

  .build-pic-img-land {
    max-width: 100%;
  }

  .build-pic-img-port {
    max-width: 100%;
  }
}

@media screen and (max-width: 969px) {
  .build-info {
    -webkit-flex-flow: column wrap;
    flex-flow: column wrap;
  }

  .build-pic {
    text-align: center;
  }

  .build-pic-img-land,
  .build-pic-img-port {
    height: 100%;
    width: 100%;
  }

  .build-pic-img-port {
    max-height: 525px;
    max-width: 406px;
  }
}

@media print {
  .build {
    page-break-after: always;
  }
  .build > h2 {
    margin-top: 50px;
  }

  .build-pic-img-land {
    height: 100%;
    width: 100%;
  }
  .build-pic-img-port {
    height: 60%;
    width: 60%;
  }
}
</style>
