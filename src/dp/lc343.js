/**
 * @param {number} n
 * @return {number}
 */
function integerBreak(n) {
  const /** @type {number[]} */ cache = Array.from({ length: n + 1 }, () => -1);
  cache[0] = 0;
  cache[1] = 0;

  /**
   *
   * @param {number} x
   * @return {number}
   */
  const dfs = (x) => {
    if (cache[x] !== -1) {
      return cache[x];
    }

    let ret = 0;
    for (let i = 1; i < x; i++) {
      ret = Math.max(ret, (x - i) * i, dfs(x - i) * i);
    }
    cache[x] = ret;
    return ret;
  };

  return dfs(n);
}

export default integerBreak;
