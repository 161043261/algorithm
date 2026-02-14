function countSubstrings(s: string): number {
  const n = s.length;
  let ans = 0;
  for (let i = 0; i < n; i++) {
    let l = i,
      r = i;
    while (l >= 0 && r < n && s[l] === s[r]) {
      l--;
      r++;
      ans++;
    }
  }
  for (let i = 0; i < n - 1; i++) {
    let l = i,
      r = i + 1;
    while (l >= 0 && r < n && s[l] === s[r]) {
      l--;
      r++;
      ans++;
    }
  }
  return ans;
}

export default countSubstrings;
