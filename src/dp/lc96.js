/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @param {number} n
 * @return {number}
 */
function numTrees(n) {
  const dp = Array.from({ length: n + 1 }, () => 0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      dp[i] += dp[j] * dp[i - 1 - j];
    }
  }

  return dp[n];
}
