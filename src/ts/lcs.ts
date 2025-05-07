// eslint-disable-next-line @typescript-eslint/no-unused-vars
function longestCommonSubsequence(text1: string, text2: string): number {
  const dp = Array.from({ length: text1.length + 1 }, () =>
    new Array<number>(text2.length + 1).fill(0),
  );
  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  let ans = "";
  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (
        dp[i][j] === dp[i - 1][j - 1] + 1 &&
        dp[i][j] > dp[i - 1][j] &&
        dp[i][j] > dp[i][j - 1]
      ) {
        ans += text1[i - 1];
      }
    }
  }
  console.log(ans);
  return dp[text1.length][text2.length];
}
