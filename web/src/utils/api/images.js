import axios from 'axios';
import qs from 'qs';
import ErrorHandler from '../errors/handler';

export default {
  // GET Methods
  async get(cb, params = {}) {
    const queryString = qs.stringify(params, {
      addQueryPrefix: true,
      strictNullHandling: true,
    });

    try {
      const response = await axios.get(`/public/images${queryString}`);
      return cb(response, null);
    } catch (error) {
      return cb(null, ErrorHandler.handle(error));
    }
  },

  // POST Methods
  async add(token, image, cb) {
    try {
      const response = await axios({
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
      });
      return cb(response, null);
    } catch (error) {
      return cb(null, ErrorHandler.handle(error));
    }
  },

  // PUT Methods
  async update(token, image, cb) {
    try {
      const response = await axios({
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
      });
      return cb(response, null);
    } catch (error) {
      return cb(null, ErrorHandler.handle(error));
    }
  },

  // DELETE Methods
  async delete(token, image, cb) {
    try {
      const response = await axios({
        method: 'delete',
        url: `/admin/images/${image.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return cb(response, null);
    } catch (error) {
      return cb(null, ErrorHandler.handle(error));
    }
  },
};
