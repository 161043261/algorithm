function maximumTotalDamage2(power: number[]): number {
  const power2cnt = new Map<number, number>();
  for (const p of power) {
    power2cnt.set(p, (power2cnt.get(p) ?? 0) + 1);
  }

  const powerAndCnt = Array.from(power2cnt.entries());
  powerAndCnt.sort((a, b) => a[0] - b[0]);

  const n = powerAndCnt.length;
  const memo = Array.from({ length: n }, () => -1);
  const dfs = (i: number): number => {
    if (i < 0) {
      return 0;
    }
    let ret = memo[i];
    if (ret !== -1) {
      return ret;
    }
    const [power, cnt] = powerAndCnt[i];
    let j = i;
    while (j > 0 && powerAndCnt[j - 1][0] >= power - 2) {
      j--;
    }

    ret = Math.max(dfs(i - 1), dfs(j - 1) + power * cnt);
    memo[i] = ret;
    return ret;
  };

  return dfs(n - 1);
}

function maximumTotalDamage(power: number[]): number {
  const power2cnt = new Map<number, number>();
  for (const p of power) {
    power2cnt.set(p, (power2cnt.get(p) ?? 0) + 1);
  }

  const powerAndCnt = Array.from(power2cnt.entries());
  powerAndCnt.sort((a, b) => a[0] - b[0]);

  const n = powerAndCnt.length;
  const dp = Array.from({ length: n + 1 }, () => 0);
  for (let i = 0, j = 0; i < n; i++) {
    const [power, cnt] = powerAndCnt[i];
    while (powerAndCnt[j][0] < power - 2) {
      j++;
    }
    dp[i + 1] = Math.max(dp[i], dp[j] + power * cnt);
  }

  return dp[n];
}
