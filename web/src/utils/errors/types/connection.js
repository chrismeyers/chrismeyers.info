export default class ConnectionError extends Error {
  constructor(title, message) {
    super(title, message);
    this.title = title || 'Connection Error';
    this.message = message || 'Unable to connect to API';
  }
}
