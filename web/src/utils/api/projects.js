import axios from "axios"

export default {
  // GET Methods
  getProjects() {
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
  addProject(token, project) {
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
        "images": images
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
  updateProject(token, project) {
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
        "images": images
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
  deleteProject(token, project) {
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
  let imagesArr = []

  if(imagesStr && (imagesStr !== "")) {
    for(let i of imagesStr.split(",")) {
      imagesArr.push(parseInt(i))
    }
  }

  return imagesArr
}
