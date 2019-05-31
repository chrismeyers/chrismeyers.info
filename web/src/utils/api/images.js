import axios from "axios"
import ErrorHandler from "../errors/handler"

export default {
  // GET Methods
  get() {
    return axios
      .get("/public/images")
      .then(response => {
        return response
      })
      .catch(error => {
        return ErrorHandler.handle(error)
      })
  },

  // POST Methods
  add(token, image) {
    return axios({
      method: "post",
      url: "/admin/images",
      headers: {
        "Authorization": "Bearer " + token
      },
      data: {
        "path": image.path,
        "title": image.title,
        "pos": parseInt(image.pos),
        "orient": image.orient
      }
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return ErrorHandler.handle(error)
    })
  },

  // PUT Methods
  update(token, image) {
    const imageId = image.id

    return axios({
      method: "put",
      url: "/admin/images/" + imageId,
      headers: {
        "Authorization": "Bearer " + token
      },
      data: {
        "path": image.path,
        "title": image.title,
        "pos": parseInt(image.pos),
        "orient": image.orient
      }
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return ErrorHandler.handle(error)
    })
  },

  // DELETE Methods
  delete(token, image) {
    const imageId = image.id

    return axios({
      method: "delete",
      url: "/admin/images/" + imageId,
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return ErrorHandler.handle(error)
    })
  }
}
