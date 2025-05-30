function numDecodings(s: string): number {
  const cache = new Array<number>(s.length).fill(-1);
  const bfs = (idx: number): number => {
    if (s[idx] === "0") {
      return 0;
    }
    if (idx >= s.length - 1) {
      return 1;
    }
    if (cache[idx] !== -1) {
      return cache[idx];
    }
    let ret = 0;
    if (Number.parseInt(s[idx] + s[idx + 1]) <= 26) {
      ret = bfs(idx + 1) + bfs(idx + 2);
    } else {
      ret = bfs(idx + 1);
    }
    cache[idx] = ret;
    return ret;
  };
  return bfs(0);
}

const ans = numDecodings("111111111111111111111111111111111111111111111");
console.log(ans);
