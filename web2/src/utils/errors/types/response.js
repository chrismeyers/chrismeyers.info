export default class ResponseError extends Error {
  constructor(title, message, code) {
    super(message || 'Unsuccessful response from API');
    this.name = 'ResponseError';
    this.title = title || 'Response Error';
    this.statusCode = code || 0;
  }
}
