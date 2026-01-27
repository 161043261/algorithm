function groupAnagrams(strs: string[]): string[][] {
  const s2ss: Record<string, string[]> = {};
  for (const str of strs) {
    const ss = str.split("");
    ss.sort();
    const s = ss.join("");
    if (!s2ss[s]) {
      s2ss[s] = [];
    }
    s2ss[s].push(str);
  }
  const ans: string[][] = [];
  for (const key in s2ss) {
    ans.push(s2ss[key]);
  }
  return ans;
}

export default groupAnagrams;
