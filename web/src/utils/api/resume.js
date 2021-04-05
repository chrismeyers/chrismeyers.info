import axios from 'axios';
import { handleAxiosError } from '../errors/handler';

export default {
  // GET Methods
  async get() {
    try {
      const resume = await axios.get('/resume');
      return resume;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  async summary() {
    try {
      const summary = await axios.get('/resume/summary');
      return summary;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
};
