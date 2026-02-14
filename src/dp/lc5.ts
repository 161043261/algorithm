function longestPalindrome(s: string): string {
  const n = s.length;
  let ansL = 0,
    ansR = 0;
  for (let i = 0; i < n; i++) {
    let l = i,
      r = i;
    while (l >= 0 && r < n && s[l] === s[r]) {
      l--;
      r++;
    }
    if (r - l - 1 > ansR - ansL) {
      ansL = l + 1;
      ansR = r;
    }
  }
  for (let i = 0; i < n - 1; i++) {
    let l = i,
      r = i + 1;
    while (l >= 0 && r < n && s[l] === s[r]) {
      l--;
      r++;
    }
    if (r - l - 1 > ansR - ansL) {
      ansL = l + 1;
      ansR = r;
    }
  }
  return s.slice(ansL, ansR);
}

export default longestPalindrome;
