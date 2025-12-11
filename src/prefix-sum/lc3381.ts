function maxSubarraySum(nums: number[], k: number): number {
  let sum = 0;
  const preSumArr = Array.from({ length: nums.length + 1 }, (_val, idx) => {
    if (idx === 0) {
      return sum;
    }
    sum += nums[idx - 1];
    return sum;
  });
  const minSumArr = new Array(k).fill(NaN);
  let ans = -Infinity;
  for (let j = 0; j < preSumArr.length; j++) {
    const preSum = preSumArr[j];
    const i = j % k;
    if (Number.isNaN(minSumArr[i])) {
      minSumArr[i] = preSum;
      continue;
    }
    ans = Math.max(ans, preSum - minSumArr[i]);
    minSumArr[i] = Math.min(minSumArr[i], preSum);
  }
  return ans;
}

export default maxSubarraySum;
