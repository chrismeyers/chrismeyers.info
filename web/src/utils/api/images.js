import axios from "axios"

export default {
  // GET Methods
  getImages() {
    return axios
      .get("/public/images")
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })
  },

  // POST Methods
  addImage(token, image) {
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
    .catch(err => {
      return err.response
    })
  },

  // PUT Methods
  updateImage(token, image) {
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
    .catch(err => {
      return err.response
    })
  },

  // DELETE Methods
  deleteImage(token, image) {
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
    .catch(err => {
      return err.response
    })
  }
}
