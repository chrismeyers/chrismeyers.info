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
            <li
              class="left-column sub-left-column job-title"
              :class="{
                'same-company-spacing': i > 0 && job.info[i - 1].length > 0,
              }"
              :key="secondLine.id"
              v-html="secondLine[0]"
            ></li>
            <li
              class="right-column tenure"
              :class="{
                'same-company-spacing': i > 0 && job.info[i - 1].length > 0,
              }"
              :key="secondLine.id"
              v-html="secondLine[1]"
            ></li>
            <li
              class="remove-bullets"
              v-if="job.info[i].length > 0"
              :key="secondLine.id"
            >
              <ul class="more-info">
                <template v-for="info in job.info[i]">
                  <li class="more-info" :key="info.id" v-html="info"></li>
                </template>
              </ul>
            </li>
          </template>
        </ul>
      </template>

      <br />
      <hr />

      <h2>Education</h2>
      <template v-for="school in education">
        <ul :key="school.id" class="italic-spacer">
          <li class="left-column degree" v-html="school.firstLine[0]"></li>
          <li class="right-column location" v-html="school.firstLine[1]"></li>
          <template v-for="secondLine in school.secondLine">
            <li
              class="left-column sub-left-column school"
              :key="secondLine.id"
              v-html="secondLine[0]"
            ></li>
            <li
              class="right-column tenure"
              :key="secondLine.id"
              v-html="secondLine[1]"
            ></li>
          </template>
        </ul>
      </template>

      <br />
      <hr />

      <h2>Technical Skills</h2>
      <ul>
        <template v-for="skill in skills">
          <li :key="skill.id">
            {{ skill.mainItem }}
            <template v-if="skill.subItems.length > 0">
              <ul>
                <li :key="subItem.id" v-for="subItem in skill.subItems">
                  {{ subItem }}
                </li>
              </ul>
            </template>
          </li>
        </template>
      </ul>

      <a
        class="faded"
        href="https://github.com/chrismeyers/chrismeyers.info/blob/master/resume/LaTeX/Meyers_Chris/Meyers_Chris_Resume.pdf"
        target="_blank"
      >
        View or download the PDF version of my résumé
      </a>
    </div>
  </div>
</template>

<script>
import ResumeAPI from '@/utils/api/resume';
import ConnectionError from '@/utils/errors/types/connection';
import ModalsMixin from '@/mixins/Modals';

export default {
  name: 'resume-page',
  mixins: [ModalsMixin],
  data() {
    return {
      experience: [],
      education: [],
      skills: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    ResumeAPI.get().then((resume) => {
      next((vm) => vm.setData(resume));
    });
  },
  methods: {
    setData(resume) {
      if (resume instanceof ConnectionError) {
        this.showDialog(resume.message, resume.title, { capitalized: true });
      } else if (resume.status === 200) {
        this.experience = resume.data.experience;
        this.education = resume.data.education;
        this.skills = resume.data.skills;
      } else {
        this.showDialog(resume.data.error, resume.statusText, {
          capitalized: true,
        });
      }
    },
  },
};
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

  .company,
  .degree,
  .location {
    font-weight: bold;
  }

  .school,
  .job-title,
  .tenure {
    font-style: italic;
  }

  .same-company-spacing {
    margin-top: 20px;
  }
}

@media screen and (max-width: 911px) {
  .location,
  .school,
  .job-title,
  .tenure {
    list-style-type: none;
  }

  .company,
  .degree,
  .location {
    font-weight: bold;
  }

  .school,
  .job-title,
  .tenure {
    font-style: italic;
  }

  .job-title.same-company-spacing {
    margin-top: 15px;
  }
}
</style>
