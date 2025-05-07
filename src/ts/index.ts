function numEquivDominoPairs(dominoes: number[][]): number {
  const kvs = new Map<string, number>();
  for (const dominoe of dominoes) {
    const pre = Math.max(...dominoe);
    const post = Math.min(...dominoe);
    const key = `${pre}-${post}`;
    kvs.set(key, (kvs.get(key) ?? 0) + 1);
  }
  let ans = 0;
  for (const [, val] of kvs.entries()) {
    ans += (val * (val - 1)) / 2;
  }
  return ans;
}

numEquivDominoPairs([
  [1, 2],
  [1, 2],
  [1, 1],
  [1, 2],
  [2, 2],
]);
