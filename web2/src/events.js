export const EVENT_MENU_CLOSE = 'menuClose';

// Taken from https://lolahef.medium.com/react-event-emitter-9a3bb0c719
const EventEmitter = {
  _events: {},
  dispatch(event, data) {
    if (!this._events[event]) return;
    this._events[event].forEach((callback) => callback(data));
  },
  subscribe(event, callback) {
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(callback);
  },
  unsubscribe(event) {
    if (!this._events[event]) return;
    delete this._events[event];
  },
};

export default EventEmitter;
