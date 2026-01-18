function largestMagicSquare(grid: number[][]): number {
  if (grid.length === 1 || grid[0].length === 1) {
    return 1;
  }
  const leftTop2rightBottomPreSum = Array.from<number[], number[]>(
    { length: grid.length },
    () => Array.from({ length: grid[0].length }, () => 0),
  );
  const rightTop2leftBottomPreSum = Array.from<number[], number[]>(
    { length: grid.length },
    () => Array.from({ length: grid[0].length }, () => 0),
  );
  const rowPreSum = Array.from<number[], number[]>(
    { length: grid.length },
    () => Array.from({ length: grid[0].length + 1 }, () => 0),
  );
  const colPreSum = Array.from<number[], number[]>(
    { length: grid.length + 1 },
    () => Array.from({ length: grid[0].length }, () => 0),
  );
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      rowPreSum[y][x + 1] = rowPreSum[y][x] + grid[y][x];
      colPreSum[y + 1][x] = colPreSum[y][x] + grid[y][x];
    }
  }
  for (let x = 0, y = grid.length - 1; y >= 0; y--) {
    let pre = 0;
    for (
      let x2 = x, y2 = y;
      y2 < grid.length && x2 < grid[0].length && y2 >= 0 && x2 >= 0;
      x2++, y2++
    ) {
      leftTop2rightBottomPreSum[y2][x2] = pre + grid[y2][x2];
      pre = leftTop2rightBottomPreSum[y2][x2];
    }
  }
  for (let y = 0, x = 0; x < grid[0].length; x++) {
    let pre = 0;
    for (
      let x2 = x, y2 = y;
      y2 < grid.length && x2 < grid[0].length && y2 >= 0 && x2 >= 0;
      x2++, y2++
    ) {
      leftTop2rightBottomPreSum[y2][x2] = pre + grid[y2][x2];
      pre = leftTop2rightBottomPreSum[y2][x2];
    }
    pre = 0;
    for (
      let x2 = x, y2 = y;
      y2 < grid.length && x2 < grid[0].length && y2 >= 0 && x2 >= 0;
      x2--, y2++
    ) {
      rightTop2leftBottomPreSum[y2][x2] = pre + grid[y2][x2];
      pre = rightTop2leftBottomPreSum[y2][x2];
    }
  }
  for (let x = grid[0].length - 1, y = 0; y < grid.length; y++) {
    let pre = 0;
    for (
      let x2 = x, y2 = y;
      y2 < grid.length && x2 < grid[0].length && y2 >= 0 && x2 >= 0;
      x2--, y2++
    ) {
      rightTop2leftBottomPreSum[y2][x2] = pre + grid[y2][x2];
      pre = rightTop2leftBottomPreSum[y2][x2];
    }
  }
  // console.log(rowPreSum);
  // console.log(colPreSum);
  // console.log(leftTop2rightBottomPreSum);
  // console.log(rightTop2leftBottomPreSum);
  let ans = 1;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const maxE = Math.min(grid.length - y, grid[0].length - x);
      tag: for (let e = 2; e <= maxE; e++) {
        const sum = colPreSum[y + e][x] - colPreSum[y][x];
        for (let x2 = x; x2 <= x + e - 1; x2++) {
          const ySum = colPreSum[y + e][x2] - colPreSum[y][x2];
          if (sum !== ySum) {
            continue tag;
            // break tag;
          }
        }
        for (let y2 = y; y2 <= y + e - 1; y2++) {
          const xSum = rowPreSum[y2][x + e] - rowPreSum[y2][x];
          if (sum !== xSum) {
            continue tag;
            // break tag;
          }
        }
        const leftTop2rightBottomSum =
          leftTop2rightBottomPreSum[y + e - 1][x + e - 1] -
          leftTop2rightBottomPreSum[y][x] +
          grid[y][x];
        const rightTop2leftBottomSum =
          rightTop2leftBottomPreSum[y + e - 1][x] -
          rightTop2leftBottomPreSum[y][x + e - 1] +
          grid[y][x + e - 1];
        if (leftTop2rightBottomSum !== sum || rightTop2leftBottomSum !== sum) {
          continue;
        }
        ans = Math.max(ans, e);
      }
    }
  }
  return ans;
}

const ans = largestMagicSquare([[8, 6, 12, 20, 3, 11, 6, 9, 3, 19, 14, 9, 9], [9, 19, 6, 9, 11, 4, 14, 7, 7, 3, 17, 6, 6], [3, 1, 2, 3, 18, 5, 13, 4, 9, 11, 18, 13, 15], [16, 11, 19, 18, 16, 19, 15, 19, 7, 6, 15, 20, 9], [10, 16, 3, 7, 5, 16, 1, 13, 12, 15, 1, 19, 17], [16, 17, 14, 19, 13, 10, 11, 15, 18, 6, 3, 4, 17], [18, 10, 18, 7, 8, 9, 16, 10, 19, 16, 9, 9, 6], [13, 13, 1, 13, 18, 9, 2, 12, 1, 19, 11, 15, 11], [9, 17, 5, 20, 3, 3, 19, 18, 18, 20, 7, 17, 1], [1, 6, 14, 3, 5, 2, 6, 4, 19, 2, 11, 4, 8], [8, 2, 16, 1, 18, 13, 7, 7, 10, 4, 16, 10, 19]])
console.log(ans)
