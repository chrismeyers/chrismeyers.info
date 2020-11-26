export default {
  methods: {
    determineActions() {
      if (Object.keys(this.lastResponse).length === 0) {
        return { present: 'N/A', past: 'N/A' };
      } else if (this.lastResponse.config.method === 'post') {
        return { present: 'Add', past: 'Added' };
      } else if (this.lastResponse.config.method === 'put') {
        return { present: 'Update', past: 'Updated' };
      } else if (this.lastResponse.config.method === 'delete') {
        return { present: 'Delete', past: 'Deleted' };
      }
    },
    success(type, showId = true) {
      const actions = this.determineActions();
      const item = showId ? `${type} ${this.lastResponse.data.id}` : type;

      return { title: 'Success', body: `${actions.past} ${item}` };
    },
    retrievalError(type, showId = true) {
      const item = showId ? `${type} ${this.lastResponse.data.id}` : type;

      return { title: 'Error', body: `Unable to retrieve ${item}` };
    },
    modificationError(type, showId = true) {
      const actions = this.determineActions();
      const error = this.lastResponse.data.error || null;
      const detail = this.lastResponse.data.detail || null;

      const item =
        showId && actions.present !== 'Add'
          ? `${type} ${this.selected.id}`
          : type;
      let msg = `Unable to ${actions.present.toLowerCase()} ${item}`;

      if (error || detail) {
        msg += '<ul>';

        if (error) {
          msg += `<li>Error: ${error}</li>`;
        }
        if (detail) {
          msg += `<li>Detail: ${detail}</li>`;
        }

        msg += '</ul>';
      }

      return { title: 'Error', body: msg };
    },
  },
};
