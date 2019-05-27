import axios from "axios"

export default {
  // GET Methods
  get() {
    return axios
      .get("/public/projects")
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })
  },

  // POST Methods
  add(token, project) {
    const images = imagesStringToArray(project.images)

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
        "images": images,
        "active": ("active" in project && project.active) ? true : false
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
  update(token, project) {
    const projectId = project.id
    const images = imagesStringToArray(project.images)

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
        "images": images,
        "active": ("active" in project && project.active) ? true : false
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
    .catch(err => {
      return err.response
    })
  }
}

function imagesStringToArray(imagesStr) {
  if(typeof imagesStr == "undefined") {
    return []
  }

  return imagesStr.split(",").filter(i => {
    if(i === "") {
      return false
    }
    return true
  }).map(i => parseInt(i.trim()))
}
