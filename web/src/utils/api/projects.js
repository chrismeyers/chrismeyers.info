import axios from "axios"
import qs from "qs"
import ErrorHandler from "../errors/handler"

export default {
  // GET Methods
  get(params = {}) {
    let queryString = qs.stringify(params, {
      addQueryPrefix: true,
      strictNullHandling: true
    })
    return axios
      .get(`/public/projects${queryString}`)
      .then(response => {
        return response
      })
      .catch(error => {
        return ErrorHandler.handle(error)
      })
  },

  // POST Methods
  add(token, project) {
    return axios({
      method: "post",
      url: "/admin/projects",
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        title: project.title,
        webUrl: project.webUrl === "" ? null : project.webUrl,
        codeUrl: project.codeUrl,
        displayDate: project.displayDate,
        startedDate: `${project.startedDate}T00:00:00.000Z`,
        lang: project.lang,
        info: project.info,
        role: project.role,
        stat: project.stat,
        images: project.images,
        active: "active" in project && project.active ? true : false
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
  update(token, project) {
    return axios({
      method: "put",
      url: `/admin/projects/${project.id}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        title: project.title,
        webUrl: project.webUrl === "" ? null : project.webUrl,
        codeUrl: project.codeUrl,
        displayDate: project.displayDate,
        startedDate: `${project.startedDate}T00:00:00.000Z`,
        lang: project.lang,
        info: project.info,
        role: project.role,
        stat: project.stat,
        images: project.images,
        active: "active" in project && project.active ? true : false
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
  delete(token, project) {
    return axios({
      method: "delete",
      url: `/admin/projects/${project.id}`,
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
  }
}
