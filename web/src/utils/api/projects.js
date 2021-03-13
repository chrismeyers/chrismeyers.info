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
        .get(`/projects${queryString}`)
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
        .get(`/projects/${id}${queryString}`)
        .then((response) => resolve(response))
        .catch((error) => reject(handleAxiosError(error)));
    });
  },
};
