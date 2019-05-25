import axios from "axios"

export default {
  // PUT Methods
  updatePassword(token, password) {
    return axios({
      method: "put",
      url: "/account/password",
      headers: {
        "Authorization": "Bearer " + token
      },
      data: {
        "password": password
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
