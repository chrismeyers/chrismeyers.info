import axios from 'axios';
import qs from 'qs';
import ErrorHandler from '../errors/handler';

export default {
  // GET Methods
  get(params = {}) {
    const queryString = qs.stringify(params, {
      addQueryPrefix: true,
      strictNullHandling: true,
    });

    return new Promise((resolve, reject) => {
      return axios
        .get(`/public/images${queryString}`)
        .then((response) => resolve(response))
        .catch((error) => reject(ErrorHandler.handle(error)));
    });
  },

  // POST Methods
  add(token, image) {
    return new Promise((resolve, reject) => {
      return axios({
        method: 'post',
        url: '/admin/images',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          path: image.path,
          thumbnail: image.thumbnail === '' ? null : image.thumbnail,
          title: image.title,
          pos: parseInt(image.pos),
          orient: image.orient,
        },
      })
        .then((response) => resolve(response))
        .catch((error) => reject(ErrorHandler.handle(error)));
    });
  },

  // PUT Methods
  update(token, image) {
    return new Promise((resolve, reject) => {
      return axios({
        method: 'put',
        url: `/admin/images/${image.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          path: image.path,
          thumbnail: image.thumbnail === '' ? null : image.thumbnail,
          title: image.title,
          pos: parseInt(image.pos),
          orient: image.orient,
        },
      })
        .then((response) => resolve(response))
        .catch((error) => reject(ErrorHandler.handle(error)));
    });
  },

  // DELETE Methods
  delete(token, image) {
    return new Promise((resolve, reject) => {
      return axios({
        method: 'delete',
        url: `/admin/images/${image.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => resolve(response))
        .catch((error) => reject(ErrorHandler.handle(error)));
    });
  },
};
