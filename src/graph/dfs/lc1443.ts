function minTime(n: number, edges: number[][], hasApple: boolean[]): number {
  const g = Array.from({ length: n }, () => [] as number[]);
  for (const [x, y] of edges) {
    g[x].push(y);
    g[y].push(x);
  }
  const nums = Array.from({ length: n }, (_val, idx) =>
    hasApple[idx] ? 1 : 0,
  );
  const getNum = (i: number, pa: number) => {
    for (const child of g[i]) {
      if (child === pa) {
        continue;
      }
      nums[i] += getNum(child, i);
    }
    return nums[i];
  };
  getNum(0, -1);
  let ans = 0;
  const dfs = (i: number, pa: number) => {
    for (const child of g[i]) {
      if (child === pa) {
        continue;
      }
      if (nums[child]) {
        ans += 2;
        dfs(child, i);
      }
    }
  };
  dfs(0, -1);
  return ans;
}

export default minTime;
