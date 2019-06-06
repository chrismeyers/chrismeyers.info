export default {
  methods: {
    determineActions() {
      if(Object.keys(this.lastResponse).length === 0) {
        return {"present": "N/A", "past": "N/A"}
      }
      else if(this.lastResponse.config.method === "post") {
        return {"present": "Add", "past": "Added"}
      }
      else if(this.lastResponse.config.method === "put") {
        return {"present": "Update", "past": "Updated"}
      }
      else if(this.lastResponse.config.method === "delete") {
        return {"present": "Delete", "past": "Deleted"}
      }
    },
    success(type, showId = true) {
      let actions = this.determineActions()
      let id = showId ? (" " + this.lastResponse.data.id) : ""

      return {title: "Success", body: actions.past + " " + type + id}
    },
    retrievalError(type) {
      return {title: "Error", body: "Unable to retrieve " + type}
    },
    addUpdateError(type, showId = true) {
      let actions = this.determineActions()
      let error = this.lastResponse.data.error || null
      let detail = this.lastResponse.data.detail || null

      if(error && detail) {
        let msg = actions.present + " " + type + " error\n"
          + "  Error: " + error + "\n"
          + "  Detail: " + detail
        return {title: "Error", body: msg}
      }
      else {
        let id = (showId && (actions.present === "Update")) ? (" " + this.selected.id) : ""
        return {title: "Error", body: "Unable to " + actions.present.toLowerCase() + " " + type + id}
      }
    },
    deleteError(type) {
      return {title: "Error", body: "Unable to delete " + type + " " + this.selected.id}
    }
  }
}
