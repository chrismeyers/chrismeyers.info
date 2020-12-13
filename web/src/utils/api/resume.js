import axios from 'axios';
import ErrorHandler from '../errors/handler';

export default {
  // GET Methods
  get() {
    return new Promise((resolve, reject) => {
      return axios
        .get('/public/resume')
        .then((response) => resolve(response))
        .catch((error) => reject(ErrorHandler.handle(error)));
    });
  },

  getSummary() {
    return new Promise((resolve, reject) => {
      return axios
        .get('/public/resume/summary')
        .then((response) => resolve(response))
        .catch((error) => reject(ErrorHandler.handle(error)));
    });
  },
};
