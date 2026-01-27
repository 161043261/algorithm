import { largestRectangleArea } from "./lc84.js";

function maximalRectangle(matrix: string[][]): number {
  let heights = matrix[0].map((item) => Number.parseInt(item));
  let ans = 0;
  for (let i = 0; i < matrix.length; i++) {
    if (i === 0) {
      ans = largestRectangleArea(heights);
      continue;
    }
    heights = heights.map((val, j) => {
      if (Number.parseInt(matrix[i][j]) === 0) {
        return 0;
      }
      return val + 1;
    });
    ans = Math.max(ans, largestRectangleArea(heights));
  }
  return ans;
}

maximalRectangle([
  ["1", "0", "1", "0", "0"],
  ["1", "0", "1", "1", "1"],
  ["1", "1", "1", "1", "1"],
  ["1", "0", "0", "1", "0"],
]);
