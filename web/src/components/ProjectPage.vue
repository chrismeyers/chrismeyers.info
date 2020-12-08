<template>
  <div class="content">
    <div class="section-header section-header-size">Project Details</div>

    <div class="content-text">
      <template v-if="error">
        <p class="center">
          Project
          <span>
            <pre class="highlighted">{{ $route.params.id }}</pre>
          </span>
          does not exist
        </p>
      </template>
      <template v-else-if="project">
        <div class="project" :key="project.id">
          <h2>{{ project.title }}</h2>
          <h3>{{ project.displayDate }}</h3>
          <div class="project-wrapper">
            <div class="project-description">
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

            <div v-if="project.images.length > 0" class="project-images">
              <template v-for="(image, index) in project.images">
                <template v-if="index == 0">
                  <template v-if="image.path.toLowerCase().endsWith('.gif')">
                    <img
                      v-img
                      :src="image.path"
                      :alt="image.title"
                      :key="`${image.id}-full`"
                      :ref="`project-${project.id}-${index}-gif`"
                      style="display: none"
                    />
                    <template v-if="image.thumbnail">
                      <div
                        class="gif-overlay"
                        :key="`${image.id}-gif-thumbnail-wrapper`"
                        title="Play GIF"
                      >
                        <img
                          :src="image.thumbnail"
                          :class="`project-images-full-img-${image.orient}`"
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
                        class="project-images-full-img-land project-images-gif"
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
                      :class="`project-images-full-img-${image.orient}`"
                      :alt="image.title"
                      :key="`${image.id}-full`"
                      title="Click to enlarge"
                    />
                  </template>
                  <br :key="`${image.id}-br`" />
                </template>
                <div
                  v-else
                  class="project-images-small"
                  :key="`${image.id}-small`"
                >
                  <img
                    v-img="{ group: project.id }"
                    :src="image.path"
                    :class="`project-images-small-img-${image.orient}`"
                    :alt="image.title"
                    title="Click to enlarge"
                  />
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ProjectsAPI from '@/utils/api/projects';
import ConnectionError from '@/utils/errors/types/connection';
import ModalsMixin from '@/mixins/Modals';
import '@/assets/images/icons/generated/github';
import '@/assets/images/icons/generated/link-external';
import '@/assets/images/icons/generated/play';

export default {
  name: 'project-page',
  mixins: [ModalsMixin],
  data() {
    return {
      project: null,
      error: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    ProjectsAPI.getById(to.params.id).then((project) => {
      next((vm) => vm.setData(project));
    });
  },
  beforeRouteUpdate(to, from, next) {
    ProjectsAPI.getById(to.params.id).then((project) => {
      this.setData(project);
      next();
    });
  },
  methods: {
    setData(project) {
      if (project instanceof ConnectionError) {
        this.showDialog(project.message, project.title, {
          capitalized: true,
        });
      } else if (project.status === 200) {
        this.project = project.data;
        this.error = false;
      } else if ([400, 404].includes(project.status)) {
        this.error = true;
      } else {
        this.showDialog(project.data.error, project.statusText, {
          capitalized: true,
        });
      }
    },
    showGIF(which) {
      const gif = this.$refs[which][0];

      gif.click();

      // Restart the GIF each time it's opened
      setTimeout(() => {
        const img = document.querySelectorAll('.content-v-img > img')[0];
        img.src = gif.src;
      }, 100);
    },
  },
};
</script>

<style scoped>
.content-text {
  max-width: 1000px;
}

.project-link-image {
  margin-bottom: 10px;
}

.project {
  height: auto;
}

.project-wrapper {
  margin: 10px;
  padding: 0;
}

.project-images > img,
.project-images > div,
.project-images-small > img {
  cursor: pointer;
}

.project-images-small {
  display: inline-block;
  margin-right: 4px;
}

.project-images-small-img-square {
  height: 44px;
  width: 44px;
  border-style: solid;
  border-width: 1px;
  border-color: #707070;
}

.project-images-small-img-port {
  height: 50px;
  width: 25px;
  border-style: solid;
  border-width: 1px;
  border-color: #707070;
}

.project-images-small-img-land {
  height: 25px;
  width: 60px;
  border-style: solid;
  border-width: 1px;
  border-color: #707070;
}

.project-images-full-img-square,
.project-images-full-img-land,
.project-images-full-img-port {
  border-style: solid;
  border-width: 1px;
  border-color: #707070;
}

.project-images-gif {
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
  pointer-events: none;
}

.gif-overlay {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (min-width: 970px) {
  .project-wrapper {
    display: -webkit-flex;
    display: flex;
  }

  .project-description {
    -webkit-flex: 3;
    flex: 3;
  }

  .project-images {
    -webkit-flex: 2;
    flex: 2;
    padding-left: 20px;
  }

  .project-images-full-img-square {
    max-width: 100%;
  }

  .project-images-full-img-land {
    max-width: 100%;
  }

  .project-images-full-img-port {
    max-width: 100%;
  }
}

@media screen and (max-width: 969px) {
  .project-wrapper {
    -webkit-flex-flow: column wrap;
    flex-flow: column wrap;
  }

  .project-images {
    text-align: center;
  }

  .project-images-full-img-square,
  .project-images-full-img-land,
  .project-images-full-img-port {
    height: 100%;
    width: 100%;
  }

  .project-images-full-img-square {
    max-width: 415px;
    max-width: 415px;
  }

  .project-images-small {
    text-decoration: none;
  }
}

@media print {
  .project,
  .project-images {
    page-break-after: always;
  }
  .project > h2 {
    margin-top: 50px;
  }

  .project-images-full-img-square,
  .project-images-full-img-land,
  .project-images-full-img-port {
    margin-top: 0;
    height: 80%;
    width: 80%;
  }

  .project-images-small {
    display: inline;
  }

  .project-images-small-img-square {
    height: 200px;
    width: 200px;
    margin-right: 20px;
  }
  .project-images-small-img-land {
    height: 40%;
    width: 40%;
    margin-right: 20px;
  }
  .project-images-small-img-port {
    height: 25%;
    width: 25%;
    margin-right: 20px;
  }

  .project-link {
    width: 16px;
    height: 16px;
  }
}
</style>
