function maxProfit(prices: number[]): number {
  const memo = Array.from({ length: 4 }, () =>
    new Array<number>(prices.length).fill(-1),
  );
  // 0 未买入
  // 1 第一次买入
  // 2 第一次卖出
  // 3 第二次买入
  // 4 第二次卖出
  const dfs = (cnt: number, idx: number): number => {
    if (cnt == 4 || idx == prices.length) {
      return 0;
    }
    if (memo[cnt][idx] !== -1) {
      return memo[cnt][idx];
    }
    if (cnt === 0 || cnt == 2) {
      const res = Math.max(
        dfs(cnt, idx + 1),
        -prices[idx] + dfs(cnt + 1, idx + 1),
      );
      memo[cnt][idx] = res;
      return res;
    }
    if (cnt === 1 || cnt == 3) {
      const res = Math.max(
        dfs(cnt, idx + 1),
        prices[idx] + dfs(cnt + 1, idx + 1),
      );
      memo[cnt][idx] = res;
      return res;
    }
    return NaN;
  };
  return dfs(0, 0);
}

export default maxProfit;
