export default {
  methods: {
    showIEDialog() {
      this.$modal.show("dialog", {
        title: "Internet Explorer Detected",
        text: "For a better browsing experience, please visit this website " +
              "on a different browser, if possible.<br/><br/><i>Some functionality may " +
              "not work as expected on Internet Explorer.</i>",
        buttons: [
          {
            title: "Proceed",
            handler: () => {
              this.$modal.hide("dialog")
            }
          }
        ]
      })
    },
    showErrorDialog(title, error) {
      this.$modal.show("dialog", {
        title: title,
        text: error.charAt(0).toUpperCase() + error.slice(1),
        buttons: [
          {
            title: "Proceed",
            handler: () => {
              this.$modal.hide("dialog")
            }
          }
        ]
      })
    }
  }
}
