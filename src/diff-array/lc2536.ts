function rangeAddQueries(n: number, queries: number[][]): number[][] {
  const diffArr = Array.from({ length: n + 2 }, () =>
    Array.from({ length: n + 2 }, () => 0),
  );
  for (const [r1, c1, r2, c2] of queries) {
    diffArr[r1 + 1][c1 + 1]++;
    diffArr[r1 + 1][c2 + 2]--;
    diffArr[r2 + 2][c1 + 1]--;
    diffArr[r2 + 2][c2 + 2]++;
  }

  const ans = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => 0),
  );
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      diffArr[i + 1][j + 1] +=
        diffArr[i + 1][j] + diffArr[i][j + 1] - diffArr[i][j];
      ans[i][j] = diffArr[i + 1][j + 1];
    }
  }
  return ans;
}

export default rangeAddQueries;
