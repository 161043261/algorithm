const solutions = {
  /**
   * @param {number[]} matchsticks
   * @return {boolean}
   */
  makesquareBacktrack: function (matchsticks) {
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
  },

  /**
   * @param {number[]} matchsticks
   * @return {boolean}
   */
  makesquareDp: function (matchsticks) {
    const totalLen = matchsticks.reduce((acc, cur) => acc + cur, 0);
    if (totalLen % 4 !== 0) {
      return false;
    }

    const len = Math.floor(totalLen / 4);
    const n = 1 << matchsticks.length;
    const dp = new Array(n).fill(-1);
    dp[0] = 0;

    for (let i = 1; i < n; i++) {
      for (let j = 0; j < matchsticks.length; j++) {
        if (i && 1 << j === 0) {
          continue;
        }

        const removeJ = i & ~(1 << j);
        if (dp[removeJ] >= 0 && dp[removeJ] + matchsticks[j] <= len) {
          dp[i] = (dp[removeJ] + matchsticks[j]) % len;
          break;
        }
      }
    }

    return dp[n - 1] === 0;
  },
};

const makesquare = solutions.makesquareBacktrack;

makesquare([1, 1, 2, 2, 2]);
