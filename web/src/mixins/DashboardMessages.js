export default {
  methods: {
    determineActions() {
      if(Object.keys(this.lastResponse).length === 0) {
        return {present: "N/A", past: "N/A"}
      }
      else if(this.lastResponse.config.method === "post") {
        return {present: "Add", past: "Added"}
      }
      else if(this.lastResponse.config.method === "put") {
        return {present: "Update", past: "Updated"}
      }
      else if(this.lastResponse.config.method === "delete") {
        return {present: "Delete", past: "Deleted"}
      }
    },
    success(type, showId = true) {
      let actions = this.determineActions()
      let item = showId ? `${type} ${this.lastResponse.data.id}` : type

      return {title: "Success", body: `${actions.past} ${item}`}
    },
    retrievalError(type, showId = true) {
      let item = showId ? `${type} ${this.lastResponse.data.id}` : type

      return {title: "Error", body: `Unable to retrieve ${item}`}
    },
    modificationError(type, showId = true) {
      let actions = this.determineActions()
      let error = this.lastResponse.data.error || null
      let detail = this.lastResponse.data.detail || null

      let item = (showId && (actions.present !== "Add")) ? `${type} ${this.selected.id}` : type
      let msg = `Unable to ${actions.present.toLowerCase()} ${item}`

      if(error && detail) {
        msg += `<ul><li>Error: ${error}</li><li>Detail: ${detail}</li></ul>`
      }

      return {title: "Error", body: msg}
    }
  }
}
