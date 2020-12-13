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
      const response = await axios.get(`/public/builds${queryString}`);
      return cb(response, null);
    } catch (error) {
      return cb(null, ErrorHandler.handle(error));
    }
  },

  async getById(id, cb, params = {}) {
    const queryString = qs.stringify(params, {
      addQueryPrefix: true,
      strictNullHandling: true,
    });

    try {
      const response = await axios.get(`/public/builds/${id}${queryString}`);
      return cb(response, null);
    } catch (error) {
      return cb(null, ErrorHandler.handle(error));
    }
  },

  // POST Methods
  async add(token, build, cb) {
    try {
      const response = await axios({
        method: 'post',
        url: '/admin/builds',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          displayDate: build.displayDate,
          startedDate: `${build.startedDate}T00:00:00.000Z`,
          cpu: build.cpu,
          cool: build.cool === '' ? null : build.cool,
          mobo: build.mobo,
          ram: build.ram,
          hdd: build.hdd,
          ssd: build.ssd === '' ? null : build.ssd,
          gpu: build.gpu,
          image: build.image === '' ? null : parseInt(build.image),
          active: 'active' in build && build.active ? true : false,
        },
      });
      return cb(response, null);
    } catch (error) {
      return cb(null, ErrorHandler.handle(error));
    }
  },

  // PUT Methods
  async update(token, build, cb) {
    try {
      const response = await axios({
        method: 'put',
        url: `/admin/builds/${build.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          displayDate: build.displayDate,
          startedDate: `${build.startedDate}T00:00:00.000Z`,
          cpu: build.cpu,
          cool: build.cool === '' ? null : build.cool,
          mobo: build.mobo,
          ram: build.ram,
          hdd: build.hdd,
          ssd: build.ssd === '' ? null : build.ssd,
          gpu: build.gpu,
          image: build.image === '' ? null : parseInt(build.image),
          active: 'active' in build && build.active ? true : false,
        },
      });
      return cb(response, null);
    } catch (error) {
      return cb(null, ErrorHandler.handle(error));
    }
  },

  // DELETE Methods
  async delete(token, build, cb) {
    try {
      const response = await axios({
        method: 'delete',
        url: `/admin/builds/${build.id}`,
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
