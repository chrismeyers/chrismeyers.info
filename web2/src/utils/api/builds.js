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
      const builds = await axios.get(`/builds${queryString}`);
      return builds;
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
      const build = await axios.get(`/builds/${id}${queryString}`);
      return build;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
};
