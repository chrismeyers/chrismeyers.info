<template>
  <footer>
    <div class="footer-links">
      <div class="footer-social">
        <a href="https://github.com/chrismeyers"
           target="_blank"
           style="text-decoration: none;">
          <img alt="Find me on GitHub" title="GitHub" src="@/assets/images/social/github-logo.svg">
        </a>
      </div>

      <div class="footer-bullets">&bull;</div>

     <div class="footer-social">
        <a href="https://www.linkedin.com/in/chris-meyers"
           target="_blank"
           style="text-decoration: none;">
          <img alt="Connect with me on LinkedIn" title="LinkedIn" src="@/assets/images/social/linkedin-logo.svg">
        </a>
      </div>

      <div class="footer-bullets">&bull;</div>

      <div class="footer-social">
        <a>
          <img v-tooltip="copyMessageOptions"
               alt="Send Message"
               src="@/assets/images/social/mail-logo.svg"
               style="cursor: pointer;"
               v-clipboard:copy="email"
               v-clipboard:success="onCopyEmail"
               @mouseleave="resetCopyMessage">
        </a>
      </div>

      <div class="footer-bullets">&bull;</div>

      <div class="footer-theme">
        <a @click="toggleTheme">THEME</a>
      </div>
    </div>

    <span class="footer-years">Designed and Developed by Chris Meyers, 2013-{{ new Date().getFullYear() }}</span>
  </footer>
</template>

<script>
import EmailTooltipMixin from "@/mixins/EmailTooltip"

export default {
  name: "Footer",
  mixins: [EmailTooltipMixin],
  methods: {
    toggleTheme() {
      this.$store.commit('toggleTheme')
    }
  }
}
</script>

<style scoped>
footer {
  font-size: 13px;
  bottom: 0;
  height: auto;
  left: 0;
  right: 0;
  border-top: 1px solid var(--border-color);
  width: 300px;
  position: fixed;
  text-align: center;
}

.footer-links {
  display: block;
  text-align: center;
  margin-bottom: 5px;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 10px;
}

.footer-years {
  display: block;
  text-align: center;
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 10px;
}

.footer-social {
  margin: 0px 3px;
}

.footer-social, .footer-bullets, .footer-message, .footer-theme {
  display: inline-block;
  vertical-align: middle;
}

@media screen and (max-width: 969px) {
  footer {
    width: 100%;
    position: absolute;
  }
}
</style>
