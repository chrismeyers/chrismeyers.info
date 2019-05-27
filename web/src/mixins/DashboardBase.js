export default {
  data () {
    return {
      whichButton: "",
      items: [],
      fields: [],
      selected: {},
      lastResponse: {},
      ignoredFields: ["id", "active"]
    }
  },
  methods: {
    setData(items) {
      this.ignoredFields = [...this.ignoredFields, ...this.componentIgnoredFields]
      this.items = this.flattenData(items)

      for(const field of Object.keys(this.items[0])) {
        if(!this.ignoredFields.includes(field)) {
          this.fields.push(field)
        }
      }

      this.selected = this.items[0]
    },
    flattenData(items) {
      return [this.createBlankEntry(items.data[0]), ...items.data]
    },
    createBlankEntry(template) {
      // Adds a blank entry as a placeholder for new items.
      let blank = {id: -1}
      for(const field of Object.keys(template)) {
        if(!this.ignoredFields.includes(field)) {
          blank[field] = null
        }
      }

      return blank
    },
    requiredField(field) {
      // These are the nullable fields.
      if(this.optionalFields.includes(field)) {
        return false
      }

      return true
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
