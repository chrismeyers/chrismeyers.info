import axios from "axios"

export default {
  // GET Methods
  getBuilds() {
    return axios
      .get("/public/builds")
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })
  }
}
