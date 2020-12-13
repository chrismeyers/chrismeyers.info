<template>
  <div class="content">
    <div class="section-header section-header-size">About</div>

    <div class="content-text">
      <span
        >Hey, my name is Chris Meyers and I am a software engineer and
        technology enthusiast. Here are some things you should know about
        me:</span
      >

      <ul>
        <li>
          I studied computer science at
          <a class="fancytxt" href="https://www.rowan.edu">Rowan University</a>
          in Glassboro, NJ and earned a Bachelor of Science in Computer Science
        </li>
        <li v-if="employed">
          Currently, I am employed as a
          {{ mostRecentJob.title }} at
          <a class="fancytxt" :href="mostRecentJob.url">{{
            mostRecentJob.company
          }}</a>
        </li>
        <li>
          Some of my hobbies include:
          <ul>
            <li>
              <a class="fancytxt" href="https://www.goodreads.com/chrismeyers"
                >Reading</a
              >
            </li>
            <li>Photography</li>
            <li>
              <router-link class="fancytxt" to="/builds"
                >Building custom computers</router-link
              >
            </li>
            <li>Playing video games</li>
          </ul>
        </li>
        <li>
          I am the owner of this
          <a class="fancytxt" @click="showImage('clarkImg')">majestic beast</a>
        </li>
        <img
          v-img
          ref="clarkImg"
          alt="Clark the Corgi"
          src="/images/clark/DSC_1564-6.jpg"
          style="display: none"
        />
      </ul>

      <p>
        Over the years, I've gained experience with the following programming
        languages and frameworks:
      </p>

      <ul>
        <li>
          Desktop and CLI applications:
          <ul>
            <li
              v-for="language in languages.desktop"
              :key="`${language}-dt-li`"
            >
              {{ language }}
            </li>
          </ul>
        </li>
        <li>
          Websites, Web Apps, and APIs:
          <ul>
            <li v-for="language in languages.web" :key="`${language}-web-li`">
              {{ language }}
            </li>
          </ul>
        </li>
      </ul>

      <span
        >As a professional software engineer, I strive to write clean, modular,
        and maintainable code. My primary goal is to create innovative and
        usable applications that solve problems. If you have any questions,
        comments, or would like to work together on a project, please
        <a
          class="fancytxt"
          :href="MAILTO_HREF"
          target="_blank"
          rel="noopener noreferrer"
          >send me a message</a
        >.</span
      >
    </div>
  </div>
</template>

<script>
import ResumeAPI from '@/utils/api/resume';
import ConnectionError from '@/utils/errors/types/connection';
import ModalsMixin from '@/mixins/Modals';
import { MAILTO_HREF } from '@/store/constants';

export default {
  name: 'about-page',
  mixins: [ModalsMixin],
  data() {
    return {
      MAILTO_HREF,
      languages: {},
      mostRecentJob: {},
      employed: false,
    };
  },
  async beforeRouteEnter(to, from, next) {
    await ResumeAPI.getSummary((summary, error) =>
      next((vm) => vm.setData(summary, error)),
    );
  },
  methods: {
    showImage(which) {
      const img = this.$refs[which];
      img.click();
    },
    setData(summary, error) {
      if (error) {
        if (error instanceof ConnectionError) {
          this.showDialog(error.message, error.title, { capitalized: true });
        } else {
          this.showDialog(error.data.error, error.statusText, {
            capitalized: true,
          });
        }
      } else {
        this.languages = summary.data.languages;
        this.mostRecentJob = summary.data.mostRecentJob;
        this.employed = summary.data.mostRecentJob.employed;
      }
    },
  },
};
</script>
