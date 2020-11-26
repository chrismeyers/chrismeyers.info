export default {
  methods: {
    showIEDialog() {
      const title = 'Internet Explorer Detected';
      const text = `For a better browsing experience, please visit this website on
        a different browser, if possible.<br/><br/><i>Some functionality
        may not work as expected on Internet Explorer.</i>`;

      this.showDialog(text, title);
    },
    showDialog(text, title = null, args = {}) {
      const options = {
        title: title,
        text: args.capitalized
          ? text.charAt(0).toUpperCase() + text.slice(1)
          : text,
        buttons: [
          {
            title: 'Proceed',
            handler: () => {
              this.$modal.hide('dialog');
            },
          },
        ],
      };

      if (title) {
        options.title = title;
      }

      this.$modal.show('dialog', options);
    },
    showConfirm(text, handler, title = null) {
      const options = {
        text: text,
        buttons: [
          {
            title: 'No',
            class: ['vue-dialog-button', 'negate'],
            default: true,
          },
          {
            title: 'Yes',
            class: ['vue-dialog-button', 'confirm'],
            handler: () => {
              this.$modal.hide('dialog');
              handler();
            },
          },
        ],
      };

      if (title) {
        options.title = title;
      }

      this.$modal.show('dialog', options);
    },
  },
};
