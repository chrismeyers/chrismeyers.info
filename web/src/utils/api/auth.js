import axios from "axios"
import qs from "qs"
import ErrorHandler from "../errors/handler"

export default {
  // POST Methods
  login(username, password) {
    return axios({
      method: "post",
      url: "/auth/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(process.env.VUE_APP_API_CLIENT_ID + ":")
      },
      data: qs.stringify({
        username: username,
        password: password,
        grant_type: "password"
      })
    })
      .then(response => {
        return response
      })
      .catch(error => {
        return ErrorHandler.handle(error)
      })
  },
  logout(token) {
    return axios({
      method: "post",
      url: "/auth/logout",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response
      })
      .catch(error => {
        return ErrorHandler.handle(error)
      })
  },

  // GET Methods
  checkLoggedIn(token) {
    return axios({
      method: "get",
      url: "/auth/authorize",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.status < 400) {
          return true
        } else {
          return false
        }
      })
      .catch(() => {
        return false
      })
  }
}
