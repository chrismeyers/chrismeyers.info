import axios from 'axios';
import qs from 'qs';
import { handleAxiosError } from '../errors/handler';

export default {
  // GET Methods
  async get(params = {}) {
    const queryString = qs.stringify(params, {
      addQueryPrefix: true,
      strictNullHandling: true,
    });

    try {
      const projects = await axios.get(`/projects${queryString}`);
      return projects;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  async getById(id, params = {}) {
    const queryString = qs.stringify(params, {
      addQueryPrefix: true,
      strictNullHandling: true,
    });

    try {
      const project = await axios.get(`/projects/${id}${queryString}`);
      return project;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
};
