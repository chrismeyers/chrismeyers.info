import axios from 'axios';
import qs from 'qs';
import { handleAxiosError } from '../errors/handler';

export default {
  // POST Methods
  login(username, password) {
    return new Promise((resolve, reject) => {
      return axios({
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
      })
        .then((response) => resolve(response))
        .catch((error) => reject(handleAxiosError(error)));
    });
  },

  logout(token) {
    return new Promise((resolve, reject) => {
      return axios({
        method: 'delete',
        url: '/auth/logout',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => resolve(response))
        .catch((error) => reject(handleAxiosError(error)));
    });
  },

  // GET Methods
  checkLoggedIn(token) {
    return axios({
      method: 'get',
      url: '/auth/authorize',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.data.logged_in === true)
      .catch(() => false);
  },
};
