<template>
  <div class="content">
    <div class="section-header section-header-size">About</div>

    <div class="content-text">
      <span>My name is Chris Meyers and I am a Software Developer and technology enthusiast. Here's a quick list of things you should know about me:</span>

      <ul>
        <li>I studied Computer Science at <a class="fancytxt" href="https://www.rowan.edu/" target="_blank">Rowan University</a> in Glassboro, NJ and earned a Bachelor of Science in Computer Science.</li>
        <li v-if="employed">Currently, I am employed as a {{ mostRecentJob ? mostRecentJob.title : "" }} at <a class="fancytxt" :href="mostRecentJob ? mostRecentJob.url : ''" target="_blank">{{ mostRecentJob ? mostRecentJob.company : "" }}</a>.</li>
        <li>Some of my professional interests include:
          <ul>
            <li>Software Development, Web Development, Computer Networking</li>
          </ul>
        </li>
        <li>My hobbies include:
          <ul>
            <li>Photography, reading, <router-link class="fancytxt" to="/builds">building custom computers</router-link>, playing video games</li>
          </ul>
        </li>
        <li>I am the owner of this <a class="fancytxt" @click="showClarkImage()">majestic beast</a>.</li>
        <img v-img
             ref="clarkImg"
             alt="Clark the Corgi"
             src="/images/clark/DSC_1564-6.jpg"
             style="display:none;">
      </ul>

      <p>Over the years, I've gained experience with the following programming languages and frameworks:</p>

      <ul>
        <li>Desktop and CLI applications:
          <ul>
            <li>{{ languages ? languages.desktop : "" }}</li>
          </ul>
        </li>
        <li>Websites, Web Apps, and APIs:
          <ul>
            <li>{{ languages ? languages.web : "" }}</li>
          </ul>
        </li>
      </ul>

      <span>I have spent my entire professional programming career striving to write clean, modular, and maintainable code. I am always up for the challenge of
      learning new languages and frameworks. If a language or framework that I'm unfamiliar with is the best choice for a project, I have no hesitation in
      breaking away from my comfort zones to explore new options. My primary goal is to create innovative and usable applications that solve problems.</span>

      <p>
        <a class="fancytxt"
           v-tooltip.bottom="copyMessageOptions"
           v-clipboard:copy="email"
           v-clipboard:success="onCopyEmail"
           @mouseleave="resetCopyMessage" >Send me a message</a> if you have any questions, comments, or would like to work together on a project.
      </p>

    </div>
  </div>
</template>

<script>
import ResumeAPI from "@/utils/api/resume"
import ConnectionError from "@/utils/errors/types/connection"
import EmailTooltipMixin from "@/mixins/EmailTooltip"
import ModalsMixin from "@/mixins/Modals"

export default {
  name: "About",
  mixins: [EmailTooltipMixin, ModalsMixin],
  data() {
    return {
      languages: {},
      mostRecentJob: {},
      employed: false
    }
  },
  beforeRouteEnter(to, from, next) {
    ResumeAPI.getSummary().then(
      summary => {
        next(vm => vm.setData(summary))
      }
    )
  },
  methods: {
    showClarkImage() {
      this.$refs.clarkImg.click()
    },
    setData(summary) {
      if(summary instanceof ConnectionError) {
        this.showDialog(summary.title, summary.message)
      }
      else if(summary.status === 200) {
        this.languages = summary.data.languages
        this.mostRecentJob = summary.data.mostRecentJob
        this.employed = summary.data.mostRecentJob.employed
      }
      else {
        this.showDialog(summary.statusText, summary.data.error)
      }
    }
  }
}
</script>
