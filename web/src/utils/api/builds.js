import axios from "axios"

export default {
  // GET Methods
  get() {
    return axios
      .get("/public/builds")
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })
  },

  // POST Methods
  add(token, build) {
    return axios({
      method: "post",
      url: "/admin/builds",
      headers: {
        "Authorization": "Bearer " + token
      },
      data: {
        "date": build.date,
        "started": parseInt(build.started),
        "cpu": build.cpu,
        "cool": (build.cool === "") ? null : build.cool,
        "mobo": build.mobo,
        "ram": build.ram,
        "hdd": build.hdd,
        "ssd": (build.ssd === "") ? null : build.ssd,
        "gpu": build.gpu,
        "image": (build.image === "") ? null : parseInt(build.image),
        "active": ("active" in build && build.active) ? true : false
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
  update(token, build) {
    const buildId = build.id

    return axios({
      method: "put",
      url: "/admin/builds/" + buildId,
      headers: {
        "Authorization": "Bearer " + token
      },
      data: {
        "date": build.date,
        "started": parseInt(build.started),
        "cpu": build.cpu,
        "cool": (build.cool === "") ? null : build.cool,
        "mobo": build.mobo,
        "ram": build.ram,
        "hdd": build.hdd,
        "ssd": (build.ssd === "") ? null : build.ssd,
        "gpu": build.gpu,
        "image": (build.image === "") ? null : parseInt(build.image),
        "active": ("active" in build && build.active) ? true : false
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
  delete(token, build) {
    const buildId = build.id

    return axios({
      method: "delete",
      url: "/admin/builds/" + buildId,
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
