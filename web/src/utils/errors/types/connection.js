export default class ConnectionError extends Error {
  constructor(title, message) {
    super(message || 'Unable to connect to API');
    this.name = 'ConnectionError';
    this.title = title || 'Connection Error';
  }
}
