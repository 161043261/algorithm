function findContentChildren(g: number[], s: number[]): number {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let sIdx = 0;
  let ans = 0;
  for (const child of g) {
    while (sIdx < s.length && child > s[sIdx]) {
      sIdx++;
    }
    if (sIdx < s.length) {
      ans++;
      sIdx++;
    } else {
      break;
    }
  }

  return ans;
}

export default findContentChildren;
