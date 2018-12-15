<template>
  <div class="content">
    <div class="section-header section-header-size">Résumé</div>

    <div class="content-text">
      <h2 class="top">Experience</h2>
      <template v-for="job in experience">
        <ul :key="job.id" class="italic-spacer">
          <li class="left-column company" v-html="job.firstLine[0]"></li>
          <li class="right-column location" v-html="job.firstLine[1]"></li>
          <template v-for="(secondLine, i) in job.secondLine">
            <li class="left-column sub-left-column job-title" :class="{ 'same-company-spacing': i > 0 }" :key="secondLine.id" v-html="secondLine[0]"></li>
            <li class="right-column tenure" :class="{ 'same-company-spacing': i > 0 }" :key="secondLine.id" v-html="secondLine[1]"></li>
            <li class="remove-bullets" :key="secondLine.id">
              <ul class="more-info">
                <template v-for="info in job.info[i]">
                  <li class="more-info" :key="info.id" v-html="info"></li>
                </template>
              </ul>
            </li>
          </template>
        </ul>
      </template>

      <br /> <hr>

      <h2>Education</h2>
      <template v-for="school in education">
        <ul :key="school.id" class="italic-spacer">
            <li class="left-column school" v-html="school.firstLine[0]"></li>
            <li class="right-column location" v-html="school.firstLine[1]"></li>
            <template v-for="secondLine in school.secondLine">
              <li class="left-column sub-left-column degree" :key="secondLine.id" v-html="secondLine[0]"></li>
              <li class="right-column tenure" :key="secondLine.id" v-html="secondLine[1]"></li>
            </template>
        </ul>
      </template>

      <br /> <hr>

      <h2>Technical Skills</h2>
      <ul>
        <template v-for="skill in skills">
          <li :key="skill.id">{{ skill }}</li>
        </template>
      </ul>

      <span class="timestamp">Last updated on: {{ lastModified }}</span>
    </div>
  </div>
</template>

<script>
import ResumeAPI from "@/utils/api/resume"

export default {
  name: "Resume",
  data() {
    return {
      experience: null,
      education: null,
      skills: null,
      lastModified: null
    }
  },
  beforeRouteEnter(to, from, next) {
    ResumeAPI.getResume().then(
      resume => {
        next(vm => vm.setData(resume))
      }
    )
  },
  methods: {
    setData(resume) {
      this.experience = resume.data.experience
      this.education = resume.data.education
      this.skills = resume.data.skills
      this.lastModified = new Date(resume.data.lastModified).toString()
    }
  }
}
</script>

<style scoped>
.remove-bullets {
  list-style-type: none;
}

@media screen and (min-width: 912px) {
  ul {
    overflow: hidden;
  }
  ul.italic-spacer {
    padding-right: 5px;
  }
  ul.more-info {
    padding-top: 10px;
  }

  .left-column {
    width: 70%;
    float: left;
  }

  .sub-left-column {
    list-style-type: none;
  }

  .right-column {
    float: right;
    width: 30%;
    text-align: right;
    list-style-type: none;
  }

  .company, .school, .location {
    font-weight: bold;
  }

  .degree, .job-title, .tenure {
    font-style: italic;
  }

  .same-company-spacing {
    margin-top: 20px;
  }
}

@media screen and (max-width: 911px) {
  .company, .school {
    font-weight: bold;
  }

  .location, .degree {
    font-weight: normal;
  }

  .location, .degree, .job-title, .tenure {
    list-style-type: none;
  }
  .location:before, .degree:before, .job-title:before, .tenure:before {
    content: "- ";
  }
}
</style>
