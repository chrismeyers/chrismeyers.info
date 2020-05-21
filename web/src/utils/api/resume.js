import axios from "axios"
import ErrorHandler from "../errors/handler"

export default {
  // GET Methods
  get() {
    return axios
      .get("/public/resume")
      .then(response => {
        return response
      })
      .catch(error => {
        return ErrorHandler.handle(error)
      })
  },
  getSummary() {
    return axios
      .get("/public/resume/summary")
      .then(response => {
        return response
      })
      .catch(error => {
        return ErrorHandler.handle(error)
      })
  }
}
