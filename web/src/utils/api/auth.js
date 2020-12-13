import axios from 'axios';
import qs from 'qs';
import ErrorHandler from '../errors/handler';

export default {
  // POST Methods
  async login(username, password, cb) {
    try {
      const response = await axios({
        method: 'post',
        url: '/auth/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' + btoa(process.env.VUE_APP_API_CLIENT_ID + ':'),
        },
        data: qs.stringify({
          username: username,
          password: password,
          grant_type: 'password',
        }),
      });
      return cb(response, null);
    } catch (error) {
      return cb(null, ErrorHandler.handle(error));
    }
  },

  async logout(token, cb) {
    try {
      const response = await axios({
        method: 'delete',
        url: '/auth/logout',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return cb(response, null);
    } catch (error) {
      return cb(null, ErrorHandler.handle(error));
    }
  },

  // GET Methods
  async checkLoggedIn(token) {
    try {
      const response = await axios({
        method: 'get',
        url: '/auth/authorize',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.logged_in === true) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  },
};
