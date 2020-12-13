import axios from 'axios';
import { handleAxiosError } from '../errors/handler';

export default {
  // PUT Methods
  updatePassword(token, password) {
    return new Promise((resolve, reject) => {
      return axios({
        method: 'put',
        url: '/account/password',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          password: password,
        },
      })
        .then((response) => resolve(response))
        .catch((error) => reject(handleAxiosError(error)));
    });
  },
};
