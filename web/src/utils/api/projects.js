import axios from 'axios';
import qs from 'qs';
import ErrorHandler from '../errors/handler';

export default {
  // GET Methods
  async get(cb, params = {}) {
    const queryString = qs.stringify(params, {
      addQueryPrefix: true,
      strictNullHandling: true,
    });

    try {
      const response = await axios.get(`/public/projects${queryString}`);
      return cb(response, null);
    } catch (error) {
      return cb(null, ErrorHandler.handle(error));
    }
  },

  async getById(id, cb, params = {}) {
    const queryString = qs.stringify(params, {
      addQueryPrefix: true,
      strictNullHandling: true,
    });

    try {
      const response = await axios.get(`/public/projects/${id}${queryString}`);
      return cb(response, null);
    } catch (error) {
      return cb(null, ErrorHandler.handle(error));
    }
  },

  // POST Methods
  async add(token, project, cb) {
    try {
      const response = await axios({
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
      });
      return cb(response, null);
    } catch (error) {
      return cb(null, ErrorHandler.handle(error));
    }
  },

  // PUT Methods
  async update(token, project, cb) {
    try {
      const response = await axios({
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
      });
      return cb(response, null);
    } catch (error) {
      return cb(null, ErrorHandler.handle(error));
    }
  },

  // DELETE Methods
  async delete(token, project, cb) {
    try {
      const response = await axios({
        method: 'delete',
        url: `/admin/projects/${project.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return cb(response, null);
    } catch (error) {
      return cb(null, ErrorHandler.handle(error));
    }
  },
};
