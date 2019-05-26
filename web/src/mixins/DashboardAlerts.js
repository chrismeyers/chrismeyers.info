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
      alert(actions.past + " " + type + id)
    },
    retrievalError(type) {
      alert("[ERROR] Unable to retrieve " + type)
    },
    addUpdateError(type, showId = true) {
      let actions = this.determineActions()
      let error = this.lastResponse.data.error || null
      let detail = this.lastResponse.data.detail || null
      if(error && detail) {
        alert("[ERROR] " + actions.present + " " + type + " error\n"
          + "  Error: " + error + "\n"
          + "  Detail: " + detail
        )
      }
      else {
        let id = (showId && (actions.present === "Update")) ? (" " + this.selected.id) : ""
        alert("[ERROR] Unable to " + actions.present.toLowerCase() + " " + type + id)
      }
    },
    deleteError(type) {
      alert("[ERROR] Unable to delete " + type + " " + this.selected.id)
    }
  }
}
