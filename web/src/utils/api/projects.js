import axios from 'axios';
import qs from 'qs';
import { handleAxiosError } from '../errors/handler';

export default {
  // GET Methods
  get(params = {}) {
    const queryString = qs.stringify(params, {
      addQueryPrefix: true,
      strictNullHandling: true,
    });

    return new Promise((resolve, reject) => {
      return axios
        .get(`/public/projects${queryString}`)
        .then((response) => resolve(response))
        .catch((error) => reject(handleAxiosError(error)));
    });
  },

  getById(id, params = {}) {
    const queryString = qs.stringify(params, {
      addQueryPrefix: true,
      strictNullHandling: true,
    });

    return new Promise((resolve, reject) => {
      return axios
        .get(`/public/projects/${id}${queryString}`)
        .then((response) => resolve(response))
        .catch((error) => reject(handleAxiosError(error)));
    });
  },

  // POST Methods
  add(token, project) {
    return new Promise((resolve, reject) => {
      return axios({
        method: 'post',
        url: '/admin/projects',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          title: project.title,
          webUrl: project.webUrl === '' ? null : project.webUrl,
          codeUrl: project.codeUrl,
          displayDate: project.displayDate,
          startedDate: `${project.startedDate}T00:00:00.000Z`,
          lang: project.lang,
          info: project.info,
          role: project.role,
          stat: project.stat,
          images: project.images,
          active: 'active' in project && project.active ? true : false,
        },
      })
        .then((response) => resolve(response))
        .catch((error) => reject(handleAxiosError(error)));
    });
  },

  // PUT Methods
  update(token, project) {
    return new Promise((resolve, reject) => {
      return axios({
        method: 'put',
        url: `/admin/projects/${project.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          title: project.title,
          webUrl: project.webUrl === '' ? null : project.webUrl,
          codeUrl: project.codeUrl,
          displayDate: project.displayDate,
          startedDate: `${project.startedDate}T00:00:00.000Z`,
          lang: project.lang,
          info: project.info,
          role: project.role,
          stat: project.stat,
          images: project.images,
          active: 'active' in project && project.active ? true : false,
        },
      })
        .then((response) => resolve(response))
        .catch((error) => reject(handleAxiosError(error)));
    });
  },

  // DELETE Methods
  delete(token, project) {
    return new Promise((resolve, reject) => {
      return axios({
        method: 'delete',
        url: `/admin/projects/${project.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => resolve(response))
        .catch((error) => reject(handleAxiosError(error)));
    });
  },
};
