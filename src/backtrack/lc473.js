/**
 * @param {number[]} matchsticks
 * @return {boolean}
 */
function makesquare(matchsticks) {
  const totalLen = matchsticks.reduce((acc, cur) => acc + cur);
  if (totalLen % 4 !== 0) {
    return false;
  }
  const len = Math.floor(totalLen / 4);
  const /** @type {number[]} */ edges = Array.of(0, 0, 0, 0);
  matchsticks.sort((a, b) => b - a);

  /**
   *
   * @param {number} idx
   * @return {boolean}
   */
  const dfs = (idx) => {
    if (idx === matchsticks.length) {
      return true;
    }
    for (let i = 0; i < 4; i++) {
      edges[i] += matchsticks[idx];
      if (edges[i] <= len && dfs(idx + 1)) {
        return true;
      }
      edges[i] -= matchsticks[idx];
    }
    return false;
  };
  return dfs(0);
}

export default makesquare;
