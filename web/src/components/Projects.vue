<template>
  <div class="content">
    <div class="section-header section-header-size">Projects</div>

    <div class="content-text">
      <template v-for="(project, index) in projects">
        <div class="proj" :key="project.id">
          <h2 :class="{ 'first-header': (index == 0) }">{{ project.title }}</h2>
          <h3>{{ project.date }}</h3>
          <div class="projWrapper">
            <div class="projDesc">
              <dl>
                <dt class="dt-mod"><b>Language(s):</b></dt>
                  <dd v-html="project.lang"></dd>

                <dt class="dt-mod"><b>Description:</b></dt>
                  <dd v-html="project.info"></dd>

                <dt class="dt-mod"><b>My Role:</b></dt>
                  <dd>{{ project.role }}</dd>

                <dt class="dt-mod"><b>Status:</b></dt>
                  <dd>{{ project.stat }}</dd>

                <dt class="dt-mod dt-links"><b>Links:</b></dt>
                  <dd v-if="project.webUrl !== null" class="project-link-image"><img src="@/assets/images/icons/link.svg" class="link-image-small">&nbsp;<a :href="project.webUrl" class="fancytxt" target="_blank">Website</a></dd>
                  <dd class="project-link-image"><img src="@/assets/images/social/github-logo.svg" class="link-image-small">&nbsp;<a :href="project.codeUrl" class="fancytxt" target="_blank">Code</a></dd>
              </dl>
            </div>

            <div class="projImages">
              <template v-for="(image, index) in project.images">
                  <template v-if="index == 0">
                    <img v-img="{'group': project.id}"
                         :src="image.path"
                         :class="'projImages-full-img-' + image.orient"
                         v-bind:alt="image.title"
                         title="Click to enlarge"
                         :key="image.id + '-full'">
                    <br :key="image.id + '-br'" />
                  </template>
                  <div v-else class="projImages-small" :key="image.id + '-small'">
                    <img v-img="{'group': project.id}"
                         :src="image.path"
                         :class="'projImages-small-img-' + image.orient"
                         v-bind:alt="image.title"
                         title="Click to enlarge">
                  </div>
              </template>
            </div>
          </div>
        </div>

        <template v-if="index < projects.length - 1">
          <br :key="project.id + '-br'"><hr :key="project.id + '-hr'"/>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import ProjectsAPI from "@/utils/api/projects"

export default {
  name: "Projects",
  data() {
    return {
      projects: null
    }
  },
  beforeRouteEnter(to, from, next) {
    ProjectsAPI.get().then(
      projects => {
        next(vm => vm.setData(projects))
      }
    )
  },
  methods: {
    setData(projects) {
      // Only display projects that are set to active.
      this.projects = projects.data.filter(p => {
        if(p.active) {
          return true
        }
        return false
      })
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

.projImages-full-img-square, .projImages-full-img-land, .projImages-full-img-port  {
  border-style: solid;
  border-width: 1px;
  border-color: #707070;
}

@media screen and (min-width: 970px){
  .projWrapper {
    display: -webkit-flex;
    display: flex;
  }

  .projDesc {
    -webkit-flex: 1;
    flex: 1;
    padding-right: 20px;
  }

  .projImages-full-img-square {
    height: 415px;
    width: 415px;
  }

  .projImages-full-img-land {
    height: 260px;
    width: 415px;
  }

  .projImages-full-img-port {
    height: 415px;
    width: 260px;
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
