import axios from "axios"
import ErrorHandler from "../errors/handler"

export default {
  // PUT Methods
  updatePassword(token, password) {
    return axios({
      method: "put",
      url: "/account/password",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      data: {
        "password": password
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
