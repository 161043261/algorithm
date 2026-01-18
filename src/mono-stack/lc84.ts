function largestRectangleArea(heights: number[]): number {
  const n = heights.length;
  const left = new Array<number>(n).fill(-1);
  const ascStk: number[] = [];
  for (let i = 0; i < heights.length; i++) {
    while (ascStk.length && heights[ascStk[ascStk.length - 1]] >= heights[i]) {
      ascStk.pop();
    }
    if (ascStk.length) {
      left[i] = ascStk[ascStk.length - 1];
    }
    ascStk.push(i);
  }
  const right = new Array<number>(n).fill(n);
  ascStk.length = 0;
  for (let i = n - 1; i >= 0; i--) {
    while (ascStk.length && heights[ascStk[ascStk.length - 1]] >= heights[i]) {
      ascStk.pop();
    }
    if (ascStk.length) {
      right[i] = ascStk[ascStk.length - 1];
    }
    ascStk.push(i);
  }
  let ans = 0;
  for (let i = 0; i < n; i++) {
    ans = Math.max(ans, heights[i] * (right[i] - left[i] - 1));
  }
  return ans;
}

export { largestRectangleArea };
