const solutions = {
  /**
   * @param {number[]} matchsticks
   * @return {boolean}
   */
  makesquareBacktrack: function (matchsticks) {
    const totalLen = matchsticks.reduce((acc, cur) => {
      console.log(acc, cur);
      return acc + cur;
    });

    if (totalLen % 4 !== 0) {
      return false;
    }

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

        if (edges[i] <= totalLen / 4 && dfs(idx + 1)) {
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
  },
};

var makesquare = solutions.makesquareBacktrack;

makesquare([1, 1, 2, 2, 2]);
