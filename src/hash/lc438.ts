function findAnagrams(s: string, p: string): number[] {
  if (s.length < p.length) {
    return [];
  }

  const wndChr2cnt: Record<string, number> = {};
  const pChr2cnt: Record<string, number> = {};

  for (let i = 0; i < p.length; i++) {
    const sChar = s[i];
    const pChar = p[i];
    wndChr2cnt[sChar] = (wndChr2cnt[sChar] || 0) + 1;
    pChr2cnt[pChar] = (pChr2cnt[pChar] || 0) + 1;
  }

  const equal = (): boolean => {
    for (const chr in pChr2cnt) {
      if (pChr2cnt[chr] !== (wndChr2cnt[chr] || 0)) {
        return false;
      }
    }
    return true;
  };

  const ans: number[] = [];
  for (let r = p.length; r < s.length; r++) {
    const l = r - p.length;
    if (equal()) {
      ans.push(l);
    }
    const leftChar = s[l];
    const rightChar = s[r];
    wndChr2cnt[leftChar]--;
    wndChr2cnt[rightChar] = (wndChr2cnt[rightChar] || 0) + 1;
  }

  if (equal()) {
    ans.push(s.length - p.length);
  }

  return ans;
}

export default findAnagrams;
