import axios from "axios"

export default {
  // GET Methods
  getProjects() {
    return axios
      .get("/public/projects")
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      })
  }
}
