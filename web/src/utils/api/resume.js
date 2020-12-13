import axios from 'axios';
import ErrorHandler from '../errors/handler';

export default {
  // GET Methods
  async get(cb) {
    try {
      const response = await axios.get('/public/resume');
      return cb(response, null);
    } catch (error) {
      return cb(null, ErrorHandler.handle(error));
    }
  },

  async getSummary(cb) {
    try {
      const response = await axios.get('/public/resume/summary');
      return cb(response, null);
    } catch (error) {
      return cb(null, ErrorHandler.handle(error));
    }
  },
};
