import axios from "axios"

export default {
  // GET Methods
  getResume() {
    return axios
      .get("/public/resume")
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })
  },
  getLanguageExperience() {
    return axios
      .get("/public/resume")
      .then(response => {
        const skills = response.data.skills
        let langMap = {}

        for(const skill of skills) {
          if(Object.keys(langMap).length == 2) {
            break
          }
          else if(skill.includes("Desktop and CLI")) {
            langMap["desktop"] = skill.split(":")[1].split(".")[0]
          }
          else if(skill.includes("Websites, Web Apps, and APIs")) {
            langMap["web"] = skill.split(":")[1].split(".")[0]
          }
        }

        return langMap
      })
      .catch(err => {
        return err.response
      })
  },
  getCurrentJob() {
    return axios
      .get("/public/resume")
      .then(response => {
        const currentJob = response.data.experience[0]

        return {
          "company": currentJob.firstLine[0],
          "url": currentJob.url,
          "title": currentJob.secondLine[0][0].split(",")[0]
        }
      })
      .catch(err => {
        return err.response
      })
  }
}
