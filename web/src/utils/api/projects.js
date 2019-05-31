import axios from "axios"
import ErrorHandler from "../errors/handler"

export default {
  // GET Methods
  get() {
    return axios
      .get("/public/projects")
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
        "Authorization": "Bearer " + token
      },
      data: {
        "title": project.title,
        "webUrl": (project.webUrl === "") ? null : project.webUrl,
        "codeUrl": project.codeUrl,
        "date": project.date,
        "started": parseInt(project.started),
        "lang": project.lang,
        "info": project.info,
        "role": project.role,
        "stat": project.stat,
        "images": project.images,
        "active": ("active" in project && project.active) ? true : false
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
    const projectId = project.id

    return axios({
      method: "put",
      url: "/admin/projects/" + projectId,
      headers: {
        "Authorization": "Bearer " + token
      },
      data: {
        "title": project.title,
        "webUrl": (project.webUrl === "") ? null : project.webUrl,
        "codeUrl": project.codeUrl,
        "date": project.date,
        "started": parseInt(project.started),
        "lang": project.lang,
        "info": project.info,
        "role": project.role,
        "stat": project.stat,
        "images": project.images,
        "active": ("active" in project && project.active) ? true : false
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
    const projectId = project.id

    return axios({
      method: "delete",
      url: "/admin/projects/" + projectId,
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
