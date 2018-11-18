<template>
  <div id="footer" class="footer-size">
    <div class="footer-links">
      <div class="footer-social">
        <a href="https://github.com/chrismeyers"
           target="_blank"
           style="text-decoration: none;"
           alt="GitHub"
           title="GitHub">
        <img src="@/assets/images/social/github-logo.svg">
        </a>
      </div>

      <div class="footer-bullets">&bull;</div>

     <div class="footer-social">
        <a href="https://www.linkedin.com/in/chris-meyers"
           target="_blank"
           style="text-decoration: none;"
           alt="LinkedIn"
           title="LinkedIn">
        <img src="@/assets/images/social/linkedin-logo.svg">
        </a>
      </div>

      <div class="footer-bullets">&bull;</div>

      <div class="footer-social">
        <a href="https://www.facebook.com/meyers42"
           target="_blank"
           style="text-decoration: none;"
           alt="Facebook"
           title="Facebook">
        <img src="@/assets/images/social/facebook-logo.svg">
        </a>
      </div>

      <div class="footer-bullets">&bull;</div>

      <div class="footer-social">
        <a href="mailto:chris@chrismeyers.info"
           target="_blank"
           alt="Send Message"
           title="Send Message">
        <img src="@/assets/images/social/mail-logo.svg">
        </a>
      </div>
    </div>

    <span class="footer-years">Designed and Developed by Chris Meyers, 2013-{{ new Date().getFullYear() }}</span>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
#footer {
  font-size: 13px;
  bottom: 0;
  height: auto;
  left: 0;
  right: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  width: 300px;
  position: fixed;
}

.footer-size {
  width: auto;
  position: absolute;
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

.footer-social, .footer-bullets, .footer-message {
  display: inline-block;
  vertical-align: middle;
}
</style>
