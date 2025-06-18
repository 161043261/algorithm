/* eslint-disable @typescript-eslint/no-unused-vars */
class EventBus {
  constructor() {
    /**
     * @type {Map<string, Set<function>>}
     */
    this.eventType2callbacks = new Map();
  }

  // subscribe
  on(eventType, callback) {
    if (!this.eventType2callbacks.has(eventType)) {
      this.eventType2callbacks.set(eventType, new Set());
    }
    this.eventType2callbacks.get(eventType).add(callback);
  }

  // publish
  emit(eventType, ...args) {
    if (!this.eventType2callbacks.has(eventType)) {
      return;
    }
    Array.from(this.eventType2callbacks.get(eventType)).forEach((callback) => {
      callback.call(undefined, ...args);
    });
  }

  // unsubscribe
  off(eventType, callback) {
    if (!this.eventType2callbacks.has(eventType)) {
      return;
    }

    if (!callback) {
      this.eventType2callbacks.delete(eventType);
      return;
    }

    this.eventType2callbacks.get(eventType).delete(callback);
    if (this.eventType2callbacks.get(eventType).size === 0) {
      this.eventType2callbacks.delete(eventType);
    }
  }

  once(eventType, callback) {
    const onceCallback = (...args) => {
      callback.call(undefined, ...args);
      this.off(eventType, onceCallback);
    };
    this.on(eventType, onceCallback);
  }

  // aliases
  subscribe = this.on;
  publish = this.emit;
  unsubscribe = this.off;
}

export default {};
