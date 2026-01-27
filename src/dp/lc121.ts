function maxProfit(prices: number[]): number {
  const memo = Array.from({ length: 2 }, () =>
    new Array<number>(prices.length).fill(-1),
  );
  const dfs = (buy: number, idx: number): number => {
    if (idx == prices.length) {
      return 0;
    }
    if (memo[buy][idx] !== -1) {
      return memo[buy][idx];
    }
    if (!buy) {
      // buy === 0
      const ret = Math.max(-prices[idx] + dfs(1, idx + 1), dfs(0, idx + 1));
      memo[buy][idx] = ret;
      return ret;
    } else {
      // buy === 1
      const ret = Math.max(prices[idx], dfs(1, idx + 1));
      memo[buy][idx] = ret;
      return ret;
    }
  };

  return dfs(0, 0);
}

export default maxProfit;
