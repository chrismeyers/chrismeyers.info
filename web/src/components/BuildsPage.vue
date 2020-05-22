<template>
  <div class="content">
    <div class="section-header section-header-size">Builds</div>

    <div class="content-text">
      <template v-for="(build, index) in builds">
        <div class="build" :key="build.id">
          <h2 :class="{ 'first-header': index == 0 }">{{ build.date }}</h2>
          <div class="build-info">
            <div class="build-specs">
              <dl>
                <dt class="dt-mod"><b>Processor:</b></dt>
                <dd>{{ build.cpu }}</dd>
                <template v-if="build.cool !== null">
                  <dt class="dt-mod"><b>Cooling:</b></dt>
                  <dd>{{ build.cool }}</dd>
                </template>
                <dt class="dt-mod"><b>Mobo:</b></dt>
                <dd>{{ build.mobo }}</dd>
                <dt class="dt-mod"><b>Memory:</b></dt>
                <dd>{{ build.ram }}</dd>
                <dt class="dt-mod"><b>HDD:</b></dt>
                <dd>{{ build.hdd }}</dd>
                <template v-if="build.ssd !== null">
                  <dt class="dt-mod"><b>SSD:</b></dt>
                  <dd>{{ build.ssd }}</dd>
                </template>
                <dt class="dt-mod"><b>Video Card:</b></dt>
                <dd>{{ build.gpu }}</dd>
              </dl>
            </div>
            <div class="build-pic">
              <img
                v-img
                v-if="build.image"
                :src="build.image.path"
                :class="'build-pic-img-' + build.image.orient"
                v-bind:alt="build.image.title"
                title="Click to enlarge"
              />
            </div>
          </div>
        </div>
        <template v-if="index < builds.length - 1">
          <br :key="build.id + '-br'" />
          <hr :key="build.id + '-hr'" />
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import BuildsAPI from "@/utils/api/builds"
import ConnectionError from "@/utils/errors/types/connection"
import ModalsMixin from "@/mixins/Modals"

export default {
  name: "builds-page",
  mixins: [ModalsMixin],
  data() {
    return {
      builds: null
    }
  },
  beforeRouteEnter(to, from, next) {
    BuildsAPI.get().then(builds => {
      next(vm => vm.setData(builds))
    })
  },
  methods: {
    setData(builds) {
      if (builds instanceof ConnectionError) {
        this.showDialog(builds.title, builds.message)
      } else if (builds.status === 200) {
        // Only display builds that are set to active.
        this.builds = builds.data.items.filter(b => {
          return b.active
        })
      } else {
        this.showDialog(builds.statusText, builds.data.error)
      }
    }
  }
}
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
    -webkit-flex: 1;
    flex: 1;
    padding-right: 10px;
  }

  .build-pic-img-land {
    height: 260px;
    width: 415px;
  }

  .build-pic-img-port {
    height: 450px;
    width: 348px;
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
