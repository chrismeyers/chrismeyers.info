import ConnectionError from './types/connection';
import ResponseError from './types/response';

export function handleAxiosError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return new ResponseError(
      error.response.data.error,
      error.response.data.message,
      error.response.data.statusCode,
    );
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return new ConnectionError();
  } else {
    // Something happened in setting up the request that triggered an Error
    return error;
  }
}
