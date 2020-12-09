<template>
  <footer>
    <div class="footer-links">
      <div class="footer-social">
        <a href="https://github.com/chrismeyers" class="no-decoration">
          <svgicon
            name="github"
            class="link-image large"
            alt="Find me on GitHub"
            title="GitHub"
          ></svgicon>
        </a>
      </div>

      <div class="footer-bullets">&bull;</div>

      <div class="footer-social">
        <a
          href="https://www.linkedin.com/in/chris-meyers"
          class="no-decoration"
        >
          <svgicon
            name="linkedin"
            class="link-image large"
            alt="Connect with me on LinkedIn"
            title="LinkedIn"
          ></svgicon>
        </a>
      </div>

      <div class="footer-bullets">&bull;</div>

      <div class="footer-social">
        <a
          :href="`mailto:${CONTACT_EMAIL}`"
          title="Send Message"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svgicon name="mail" class="link-image large"></svgicon>
        </a>
      </div>

      <div class="footer-bullets">&bull;</div>

      <div class="footer-theme">
        <toggle-button
          :value="$store.state.theme === THEMES.DARK"
          :labels="{ checked: THEMES.DARK, unchecked: THEMES.LIGHT }"
          :width="55"
          :color="{ checked: mainThemeColor }"
          :sync="true"
          @change="$store.commit('toggleTheme')"
        />
      </div>
    </div>

    <span class="footer-years"
      >Designed and Developed by Chris Meyers, 2013-{{
        new Date().getFullYear()
      }}</span
    >
  </footer>
</template>

<script>
import '@/assets/images/icons/generated/github';
import '@/assets/images/icons/generated/linkedin';
import '@/assets/images/icons/generated/mail';
import { THEMES, CONTACT_EMAIL } from '@/store/constants';

export default {
  name: 'app-footer',
  data() {
    return {
      THEMES,
      CONTACT_EMAIL,
    };
  },
  computed: {
    mainThemeColor: () =>
      getComputedStyle(document.documentElement).getPropertyValue(
        '--main-theme-color',
      ),
  },
};
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

.footer-social,
.footer-bullets,
.footer-message,
.footer-theme {
  display: inline-block;
  vertical-align: middle;
  margin-left: 5px;
}

@media screen and (max-width: 969px) {
  footer {
    width: 100%;
    position: absolute;
  }
}
</style>
