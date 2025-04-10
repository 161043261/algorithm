/**
 * @param {string} s
 * @return {number[]}
 */
function partitionLabels(s) {
  /** @type Map<number, number> */
  const item2last = new Map();
  for (let i = s.length - 1; i >= 0; i--) {
    if (!item2last.has(s[i])) {
      item2last.set(s[i], i);
    }
  }
  let cur = 0;
  /** @type number[] */
  const ans = [];
  while (cur < s.length) {
    let last = item2last.get(s[cur]);
    for (let i = cur; i !== last; i++) {
      last = Math.max(last, item2last.get(s[i]));
    }
    ans.push(last - cur + 1);
    cur = last + 1;
  }
  return ans;
}

partitionLabels("ababcbacadefegdehijhklij");
