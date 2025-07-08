function minWindow(s: string, t: string): string {
  let ansLeft = -1;
  let ansRight = s.length;

  // const a: (string | RegExp)[] = [];

  const sa2cnt = new Map<string, number>();
  const ta2cnt = new Map<string, number>();
  for (const a of t) {
    ta2cnt.set(a, (ta2cnt.get(a) ?? 0) + 1);
  }

  const isContained = () => {
    for (const [ta, cnt] of ta2cnt) {
      if (!sa2cnt.has(ta) || (sa2cnt.get(ta) ?? 0) < cnt) {
        return false;
      }
    }
    return true;
  };

  let left = 0;
  for (let right = 0; right < s.length; right++) {
    sa2cnt.set(s[right], (sa2cnt.get(s[right]) ?? 0) + 1);

    while (isContained()) {
      if (right - left < ansRight - ansLeft) {
        [ansLeft, ansRight] = [left, right];
      }
      sa2cnt.set(s[left], sa2cnt.get(s[left])! - 1);
      left++;
    }
  }
  return ansLeft < 0 ? "" : s.slice(ansLeft, ansRight + 1);
}

minWindow("ADOBECODEBANC", "ABC");
