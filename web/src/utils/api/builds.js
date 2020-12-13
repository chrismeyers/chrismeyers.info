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
        .get(`/public/builds${queryString}`)
        .then((response) => resolve(response))
        .catch((error) => reject(ErrorHandler.handle(error)));
    });
  },

  getById(id, params = {}) {
    const queryString = qs.stringify(params, {
      addQueryPrefix: true,
      strictNullHandling: true,
    });

    return new Promise((resolve, reject) => {
      return axios
        .get(`/public/builds/${id}${queryString}`)
        .then((response) => resolve(response))
        .catch((error) => reject(ErrorHandler.handle(error)));
    });
  },

  // POST Methods
  add(token, build) {
    return new Promise((resolve, reject) => {
      return axios({
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
      })
        .then((response) => resolve(response))
        .catch((error) => reject(ErrorHandler.handle(error)));
    });
  },

  // PUT Methods
  update(token, build) {
    return new Promise((resolve, reject) => {
      return axios({
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
      })
        .then((response) => resolve(response))
        .catch((error) => reject(ErrorHandler.handle(error)));
    });
  },

  // DELETE Methods
  delete(token, build) {
    return new Promise((resolve, reject) => {
      return axios({
        method: 'delete',
        url: `/admin/builds/${build.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => resolve(response))
        .catch((error) => reject(ErrorHandler.handle(error)));
    });
  },
};
