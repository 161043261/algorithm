// eslint-disable-next-line @typescript-eslint/no-unused-vars
function maxArea(height: number[]): number {
  let l = 0;
  let r = height.length - 1;
  let ans = 0;

  while (l < r) {
    ans = Math.max(ans, (r - l) * Math.min(height[l], height[r]));
    if (height[l] <= height[r]) {
      l++;
    } else {
      r--;
    }
  }

  return ans;
}
