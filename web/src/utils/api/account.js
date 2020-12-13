import axios from 'axios';
import ErrorHandler from '../errors/handler';

export default {
  // PUT Methods
  async updatePassword(token, password, cb) {
    try {
      const response = await axios({
        method: 'put',
        url: '/account/password',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          password: password,
        },
      });
      return cb(response, null);
    } catch (error) {
      return cb(null, ErrorHandler.handle(error));
    }
  },
};
