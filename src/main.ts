function countNegatives(grid: number[][]): number {
  const genFn = function* () {
    for (const item of grid) {
      yield item;
    }
  };
  const gen = genFn();
  let l = 0,
    r = grid[0].length - 1;
  a: for (
    let { value, done } = gen.next();
    !done;
    { value, done } = gen.next()
  ) {
    if (!value) continue;
    l = 0;
    r = value!.length - 1;
    while (l <= r) {
      const m = Math.floor((l + r) / 2);
      if (value[m] >= 0) {
        l = m + 1;
      } else {
        r = m;
        if (l === r) {
          if (value[r] >= 0) return 0;
          break a;
        }
      }
    }
  }
  if (grid.at(-1)![r] >= 0) return 0;
  const gen2 = genFn();
  let ans = 0;
  while (true) {
    const item = gen2.next();
    const { done, value } = item;
    if (done) {
      return ans;
    }
    if (value[r] > 0) continue;
    while (r > 0 && value[r - 1] < 0) {
      r--;
    }
    if (value) ans += value.length - r;
  }
  // return ans;
}
countNegatives([
  [6, 5],
  [5, 0],
  [4, -1],
]);
