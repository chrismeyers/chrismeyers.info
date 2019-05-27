export default {
  data () {
    return {
      whichButton: "",
      items: [],
      schema: [],
      selected: {},
      lastResponse: {}
    }
  },
  methods: {
    setData(response) {
      this.items = this.flattenData(response)
      this.schema = response.data.schema
      this.selected = this.items[0]
    },
    flattenData(response) {
      return [this.createBlankEntry(response.data.items[0]), ...response.data.items]
    },
    createBlankEntry(template) {
      // Adds a blank entry as a placeholder for new items.
      let blank = {id: -1}
      for(const field of Object.keys(template)) {
        blank[field] = null
      }

      return blank
    },
    routeFormSubmission() {
      if(this.whichButton === "addUpdate") {
        this.addUpdateEntry()
      }
      else if(this.whichButton === "delete") {
        this.deleteEntry()
      }
    },
    async addUpdateEntry() {
      if(this.selected.id > 0) {
        // Update existing (PUT)
        this.lastResponse = await this.api.update(this.$cookie.get("chrismeyers_info_apiToken"), this.selected)
      }
      else {
        // Add new (POST)
        this.lastResponse = await this.api.add(this.$cookie.get("chrismeyers_info_apiToken"), this.selected)
      }

      if(this.lastResponse.status === 200) {
        const updated = await this.api.get()
        if(updated.status === 200) {
          this.items = this.flattenData(updated)
          this.selected = (() => {
            for(const [i, item] of this.items.entries()) {
              if(item.id === this.lastResponse.data.id) {
                return this.items[i]
              }
            }
            return this.items[0]
          })()
          this.success(this.type.singular)
        }
        else {
          this.retrievalError(this.type.plural)
        }
      }
      else {
        this.addUpdateError(this.type.singular)
      }
    },
    async deleteEntry() {
      let shouldDelete = confirm("Are you sure you want to delete " + this.type.singular + " " + this.selected.id + "?")

      if(shouldDelete && this.selected.id) {
        this.lastResponse = await this.api.delete(this.$cookie.get("chrismeyers_info_apiToken"), this.selected)

        if(this.lastResponse.status === 200) {
          const updated = await this.api.get()
          if(updated.status === 200) {
            this.items = this.flattenData(updated)
            this.selected = this.items[0]
            this.success(this.type.singular)
          }
          else {
            this.retrievalError(this.type.plural)
          }
        }
        else {
          this.deleteError(this.type.singular)
        }
      }
    }
  }
}
