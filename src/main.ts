function minimumDifference(nums: number[], k: number): number {
  nums.sort((a, b) => a - b);
  let ans = Infinity;
  for (let i = 0; i <= nums.length - k; i++) {
    const minVal = nums[i];
    // nums.length - k + k - 1
    const maxVal = nums[i + k - 1];
    ans = Math.min(ans, maxVal - minVal);
  }
  return ans;
}

export default minimumDifference;
