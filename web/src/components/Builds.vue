<template>
  <div class="content">
    <div class="section-header section-header-size">Builds</div>

    <div class="content-text">
      <template v-for="(build, index) in builds">
        <div class="build" :key="build.id">
          <h2 :class="{ 'first-header': (index == 0) }">{{ build.date }}</h2>
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
              <img :src="build.image.path"
                   :class="'build-pic-img-' + build.image.orient"
                   v-bind:alt="build.image.title"
                   title="Click to enlarge"
                   @click="openGallery(build.id)">
            </div>
          </div>
        </div>
        <template v-if="index < builds.length - 1">
          <br :key="build.id + '-br'"><hr :key="build.id + '-hr'"/>
        </template>
        <LightBox
          :images="getImageArray(build)"
          v-bind:ref="'lightbox-' + build.id"
          :show-caption="true"
          :show-light-box="false"
          :key="'lightbox-' + build.id"/>
      </template>
    </div>
  </div>
</template>

<script>
import BuildsApi from '@/utils/api/builds'
import LightBox from '@/components/LightBox/LightBox'

export default {
  name: "Builds",
  components: {
    LightBox
  },
  data() {
    return {
      builds: null
    }
  },
  beforeRouteEnter(to, from, next) {
    BuildsApi.getBuilds().then(
      builds => {
        next(vm => vm.setData(builds))
      }
    )
  },
  methods: {
    openGallery(id) {
      let lightbox = "lightbox-" + id
      this.$refs[lightbox][0].showImage(0)
    },
    getImageArray(build) {
      return [{
        "thumb": build.image.path,
        "src": build.image.path,
        "caption": build.image.title
      }]
    },
    setData(builds) {
      this.builds = builds.data
    }
  }
}
</script>

<style scoped>
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

@media screen and (min-width: 970px){
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
