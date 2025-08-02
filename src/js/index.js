class TimeLimitedCache {
  /** @type {Map<number, [number, number]>} */
  kvs = new Map();

  constructor() {}
  /**
   * @param {number} key
   * @param {number} value
   * @param {number} duration time until expiration in ms
   * @return {boolean} if un-expired key already existed
   */
  set(key, value, duration) {
    return true;
  }

  /**
   * @param {number} key
   * @return {number} value associated with key
   */
  get(key) {
    return 1;
  }

  /**
   * @return {number} count of non-expired keys
   */
  count() {
    return 1;
  }
}
