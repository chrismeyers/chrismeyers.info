<template>
  <div class="content">
    <div class="section-header section-header-size">About</div>

    <div class="content-text">
      <span>My name is Chris Meyers and I am a Software Engineer and technology enthusiast. Here's a quick list of things you should know about me:</span>

      <ul>
        <li>I studied Computer Science at <a class="fancytxt" href="https://www.rowan.edu/" target="_blank">Rowan University</a> in Glassboro, NJ and earned a Bachelor of Science in Computer Science.</li>
        <li>Currently, I am employed as a Software Engineer at <a class="fancytxt" href="https://asrcfederal.com/afms" target="_blank">ASRC Federal Mission Solutions</a>.</li>
        <li>Some of my professional interests include:
          <ul>
            <li>Software Development, Web Development, Computer Networking</li>
          </ul>
        </li>
        <li>My hobbies include:
          <ul>
              <li>Photography, reading, <a href="/builds" class="fancytxt">building custom computers</a>, playing video games</li>
          </ul>
        </li>
        <li>I am the owner of this <a @click="openGallery(0)" class="fancytxt">majestic beast</a>.</li>
        <LightBox
          :images='[{"thumb": "/clark/DSC_1564-6.jpg", "src": "/clark/DSC_1564-6.jpg", "caption": "Clark the Corgi"}]'
          v-bind:ref="'lightbox-0'"
          :show-caption="true"
          :show-light-box="false"/>
      </ul>

      <p>Over the years, I've gained experience with the following programming languages and frameworks:</p>

      <ul>
        <li>Desktop and CLI applications:
          <ul>
            <li>{{ langMap ? langMap["desktop"] : "" }}</li>
          </ul>
        </li>
        <li>Websites, Web Apps, and APIs:
          <ul>
            <li>{{ langMap ? langMap["web"] : "" }}</li>
          </ul>
        </li>
      </ul>

      <span>I have spent my entire professional programming career striving to write clean, modular, and maintainable code. I am always up for the challenge of
      learning new languages and frameworks. If a language or framework that I'm unfamiliar with is the best choice for a project, I have no hesitation in
      breaking away from my comfort zones to explore new options. My primary goal is to create innovative and usable applications that solve problems.</span>

      <p><a href="#contact" class="fancytxt">Send me a message</a> if you have any questions, comments, or would like to work together on a project.</p>

    </div>
  </div>
</template>

<script>
import ResumeApi from "@/utils/api/resume";
import LightBox from 'vue-image-lightbox'

export default {
  name: 'About',
  components: {
    LightBox
  },
  data() {
    return {
      langMap: null
    }
  },
  mounted() {
    ResumeApi.getLanguageExperience().then(
      langMap => {
        this.langMap = langMap
      }
    )
  },
  methods: {
    openGallery(id) {
      let lightbox = "lightbox-" + id
      this.$refs[lightbox].showImage(0)
    }
  }
}
</script>
