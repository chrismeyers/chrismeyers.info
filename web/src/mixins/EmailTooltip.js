export default {
  data () {
    return {
      email: "chris@chrismeyers.info",
      copyMessage: "Copy email address"
    }
  },
  methods: {
    onCopyEmail () {
      this.copyMessage = "Email address copied!"
    },
    resetCopyMessage () {
      // Wait some time so the user doesn't see the message flash.
      setTimeout(() => this.copyMessage = "Copy email address", 100)
    }
  },
  computed: {
    copyMessageOptions () {
      return {
        content: this.copyMessage,
        hideOnTargetClick: false
      }
    }
  }
}
