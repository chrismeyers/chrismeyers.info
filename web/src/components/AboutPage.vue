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
          <a class="fancytxt" href="https://www.rowan.edu" target="_blank"
            >Rowan University</a
          >
          in Glassboro, NJ and earned a Bachelor of Science in Computer Science
        </li>
        <li v-if="employed">
          Currently, I am employed as a
          {{ mostRecentJob ? mostRecentJob.title : "" }} at
          <a
            class="fancytxt"
            :href="mostRecentJob ? mostRecentJob.url : ''"
            target="_blank"
            >{{ mostRecentJob ? mostRecentJob.company : "" }}</a
          >
        </li>
        <li>
          Some of my professional interests include:
          <ul>
            <li>Software development</li>
            <li>Web development</li>
            <li>Computer networking</li>
          </ul>
        </li>
        <li>
          Some of my hobbies include:
          <ul>
            <li>
              <a
                class="fancytxt"
                href="https://www.goodreads.com/chrismeyers"
                target="_blank"
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
          <a class="fancytxt" @click="showClarkImage()">majestic beast</a>
        </li>
        <img
          v-img
          ref="clarkImg"
          alt="Clark the Corgi"
          src="/images/clark/DSC_1564-6.jpg"
          style="display:none;"
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
            <li>{{ languages ? languages.desktop : "" }}</li>
          </ul>
        </li>
        <li>
          Websites, Web Apps, and APIs:
          <ul>
            <li>{{ languages ? languages.web : "" }}</li>
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
          v-tooltip.bottom="copyMessageOptions"
          v-clipboard:copy="email"
          v-clipboard:success="onCopyEmail"
          @mouseleave="resetCopyMessage"
          >send me a message.</a
        ></span
      >
    </div>
  </div>
</template>

<script>
import ResumeAPI from "@/utils/api/resume"
import ConnectionError from "@/utils/errors/types/connection"
import EmailTooltipMixin from "@/mixins/EmailTooltip"
import ModalsMixin from "@/mixins/Modals"

export default {
  name: "about-page",
  mixins: [EmailTooltipMixin, ModalsMixin],
  data() {
    return {
      languages: {},
      mostRecentJob: {},
      employed: false
    }
  },
  beforeRouteEnter(to, from, next) {
    ResumeAPI.getSummary().then(summary => {
      next(vm => vm.setData(summary))
    })
  },
  methods: {
    showClarkImage() {
      this.$refs.clarkImg.click()
    },
    setData(summary) {
      if (summary instanceof ConnectionError) {
        this.showDialog(summary.title, summary.message)
      } else if (summary.status === 200) {
        this.languages = summary.data.languages
        this.mostRecentJob = summary.data.mostRecentJob
        this.employed = summary.data.mostRecentJob.employed
      } else {
        this.showDialog(summary.statusText, summary.data.error)
      }
    }
  }
}
</script>
