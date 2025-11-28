function largestSumAfterKNegations(nums: number[], k: number): number {
  const negNums = nums.filter((item) => item < 0);
  const posNums = nums.filter((item) => item >= 0);
  let restK = 0;
  if (negNums.length < k) {
    restK = k - nums.length;
    k = negNums.length;
  }
  negNums.sort((a, b) => a - b);
  // posNums.sort((a, b) => a - b);
  for (let i = 0; i < k; i++) {
    negNums[i] = -negNums[i];
  }
  nums = [...negNums, ...posNums];
  const sum = nums.reduce((a, b) => a + b);
  return restK % 2 === 0 ? sum : sum - 2 * nums[0];
}
