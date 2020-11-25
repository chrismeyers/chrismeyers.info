<template>
  <div class="content">
    <div class="section-header section-header-size">Projects</div>

    <div class="content-text">
      <template v-for="(project, index) in projects">
        <div class="proj" :key="project.id" :id="`project-${project.id}`">
          <h2 :class="{ 'first-header': index == 0 }">
            {{ project.title }}
            <router-link
              :to="`#project-${project.id}`"
              title="Jump directly to this project"
            >
              <svgicon
                name="paragraph"
                class="link-image small jump-anchor"
              ></svgicon>
            </router-link>
          </h2>
          <h3>{{ project.displayDate }}</h3>
          <div class="projWrapper">
            <div class="projDesc">
              <dl>
                <dt class="dt-mod"><b>Language(s)</b></dt>
                <dd v-html="project.lang"></dd>

                <dt class="dt-mod"><b>Description</b></dt>
                <dd v-html="project.info"></dd>

                <dt class="dt-mod"><b>My Role</b></dt>
                <dd>{{ project.role }}</dd>

                <dt class="dt-mod"><b>Status</b></dt>
                <dd>{{ project.stat }}</dd>

                <dt class="dt-mod dt-links"><b>Links</b></dt>
                <dd v-if="project.webUrl !== null" class="project-link-image">
                  <svgicon
                    name="link-external"
                    class="link-image small"
                  ></svgicon
                  >&nbsp;<a
                    :href="project.webUrl"
                    class="fancytxt"
                    target="_blank"
                    >Website</a
                  >
                </dd>
                <dd class="project-link-image">
                  <svgicon name="github" class="link-image small"></svgicon
                  >&nbsp;<a
                    :href="project.codeUrl"
                    class="fancytxt"
                    target="_blank"
                    >Code</a
                  >
                </dd>
              </dl>
            </div>

            <div v-if="project.images.length > 0" class="projImages">
              <template v-for="(image, index) in project.images">
                <template v-if="index == 0">
                  <template v-if="image.path.toLowerCase().endsWith('.gif')">
                    <img
                      v-img
                      :src="image.path"
                      :alt="image.title"
                      :key="`${image.id}-full`"
                      :ref="`project-${project.id}-${index}-gif`"
                      style="display:none;"
                    />
                    <template v-if="image.thumbnail">
                      <div
                        class="gif-overlay"
                        :key="`${image.id}-gif-thumbnail-wrapper`"
                        title="Play GIF"
                      >
                        <img
                          :src="image.thumbnail"
                          :class="`projImages-full-img-${image.orient}`"
                          :key="`${image.id}-gif-thumbnail`"
                          @click="showGIF(`project-${project.id}-${index}-gif`)"
                        />
                        <svgicon
                          name="play"
                          class="link-image xlarge play-overlay"
                          alt="Plays the associated GIF"
                          title="Play GIF"
                          :key="`${image.id}-gif-thumbnail-play`"
                        ></svgicon>
                      </div>
                    </template>
                    <template v-else>
                      <div
                        class="projImages-full-img-land projImages-gif"
                        :key="`${image.id}-missing-gif-thumbnail`"
                        @click="showGIF(`project-${project.id}-${index}-gif`)"
                      >
                        <svgicon
                          name="play"
                          class="link-image xlarge"
                          alt="Plays the associated GIF"
                          title="Play GIF"
                        ></svgicon>
                        <div>Play GIF</div>
                      </div>
                    </template>
                  </template>
                  <template v-else>
                    <img
                      v-img="{ group: project.id }"
                      :src="image.path"
                      :class="`projImages-full-img-${image.orient}`"
                      :alt="image.title"
                      :key="`${image.id}-full`"
                      title="Click to enlarge"
                    />
                  </template>
                  <br :key="`${image.id}-br`" />
                </template>
                <div v-else class="projImages-small" :key="`${image.id}-small`">
                  <img
                    v-img="{ group: project.id }"
                    :src="image.path"
                    :class="`projImages-small-img-${image.orient}`"
                    :alt="image.title"
                    title="Click to enlarge"
                  />
                </div>
              </template>
            </div>
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
import ProjectsAPI from "@/utils/api/projects"
import ConnectionError from "@/utils/errors/types/connection"
import ModalsMixin from "@/mixins/Modals"
import "@/assets/images/icons/generated/github"
import "@/assets/images/icons/generated/paragraph"
import "@/assets/images/icons/generated/link-external"
import "@/assets/images/icons/generated/play"

export default {
  name: "projects-page",
  mixins: [ModalsMixin],
  data() {
    return {
      projects: null
    }
  },
  beforeRouteEnter(to, from, next) {
    ProjectsAPI.get().then(projects => {
      next(vm => vm.setData(projects))
    })
  },
  methods: {
    setData(projects) {
      if (projects instanceof ConnectionError) {
        this.showDialog(projects.title, projects.message)
      } else if (projects.status === 200) {
        // Only display projects that are set to active.
        this.projects = projects.data.items.filter(p => {
          return p.active
        })
      } else {
        this.showDialog(projects.statusText, projects.data.error)
      }
    },
    showGIF(which) {
      const gif = this.$refs[which][0]

      gif.click()

      // Restart the GIF each time it's opened
      setTimeout(() => {
        const img = document.querySelectorAll(".content-v-img > img")[0]
        img.src = gif.src
      }, 100)
    }
  }
}
</script>

<style scoped>
.content-text {
  max-width: 1000px;
}

.project-link-image {
  margin-bottom: 10px;
}

.proj {
  height: auto;
}

.projWrapper {
  margin: 10px;
  padding: 0;
}

.projImages > img,
.projImages > div,
.projImages-small > img {
  cursor: pointer;
}

.projImages-small {
  display: inline-block;
  margin-right: 4px;
}

.projImages-small-img-square {
  height: 44px;
  width: 44px;
  border-style: solid;
  border-width: 1px;
  border-color: #707070;
}

.projImages-small-img-port {
  height: 50px;
  width: 25px;
  border-style: solid;
  border-width: 1px;
  border-color: #707070;
}

.projImages-small-img-land {
  height: 25px;
  width: 60px;
  border-style: solid;
  border-width: 1px;
  border-color: #707070;
}

.projImages-full-img-square,
.projImages-full-img-land,
.projImages-full-img-port {
  border-style: solid;
  border-width: 1px;
  border-color: #707070;
}

.projImages-gif {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-style: none;
}

.link-image.play-overlay {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.gif-overlay {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (min-width: 970px) {
  .projWrapper {
    display: -webkit-flex;
    display: flex;
  }

  .projDesc {
    -webkit-flex: 3;
    flex: 3;
  }

  .projImages {
    -webkit-flex: 2;
    flex: 2;
    padding-left: 20px;
  }

  .projImages-full-img-square {
    max-width: 100%;
  }

  .projImages-full-img-land {
    max-width: 100%;
  }

  .projImages-full-img-port {
    max-width: 100%;
  }
}

@media screen and (max-width: 969px) {
  .projWrapper {
    -webkit-flex-flow: column wrap;
    flex-flow: column wrap;
  }

  .projImages {
    text-align: center;
  }

  .projImages-full-img-square,
  .projImages-full-img-land,
  .projImages-full-img-port {
    height: 100%;
    width: 100%;
  }

  .projImages-full-img-square {
    max-width: 415px;
    max-width: 415px;
  }

  .projImages-small {
    text-decoration: none;
  }
}

@media print {
  .proj,
  .projImages {
    page-break-after: always;
  }
  .proj > h2 {
    margin-top: 50px;
  }

  .projImages-full-img-square,
  .projImages-full-img-land,
  .projImages-full-img-port {
    margin-top: 0;
    height: 80%;
    width: 80%;
  }

  .projImages-small {
    display: inline;
  }

  .projImages-small-img-square {
    height: 200px;
    width: 200px;
    margin-right: 20px;
  }
  .projImages-small-img-land {
    height: 40%;
    width: 40%;
    margin-right: 20px;
  }
  .projImages-small-img-port {
    height: 25%;
    width: 25%;
    margin-right: 20px;
  }

  .proj-link {
    width: 16px;
    height: 16px;
  }
}
</style>
