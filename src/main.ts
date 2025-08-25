function countSquares(matrix: number[][]): number {
  let ans = 0;
  const cnts = Array.from({ length: matrix.length }, (_, y) =>
    Array.from(
      {
        length: matrix[0].length,
      },
      (_, x) => {
        ans += matrix[y][x];
        return matrix[y][x];
      },
    ),
  );

  for (let cur = 2; cur <= Math.min(matrix.length, matrix[0].length); cur++) {
    for (let y = 0; y < matrix.length; y++) {
      tag: for (let x = 0; x < matrix[0].length; x++) {
        if (cnts[y][x] === 0) {
          continue;
        }

        const maxY = y + cur - 1;
        const maxX = x + cur - 1;
        if (maxY >= matrix.length || maxX >= matrix[0].length) {
          cnts[y][x] = 0;
          continue;
        }

        for (let curX = x; curX <= maxX; curX++) {
          if (matrix[maxY][curX] === 0) {
            cnts[y][x] = 0;
            continue tag;
          }
        }

        for (let curY = y; curY <= maxY; curY++) {
          if (matrix[curY][maxX] === 0) {
            cnts[y][x] = 0;
            continue tag;
          }
        }
        ans++;
      }
    }
  }
  return ans;
}

countSquares([
  [0, 1, 1, 1],
  [1, 1, 1, 1],
  [0, 1, 1, 1],
]);
