import axios from 'axios';
import ErrorHandler from '../errors/handler';

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
        .catch((error) => reject(ErrorHandler.handle(error)));
    });
  },
};
