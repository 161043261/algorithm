/**
 * @param {string[]} words
 * @return {number}
 */
var longestPalindrome = function (words) {
  const cnt = Array.from({ length: 26 }, () => new Array(26).fill(0));
  for (const word of words) {
    cnt[word.charCodeAt(0) - "a".charCodeAt(0)][
      word.charCodeAt(1) - "a".charCodeAt(0)
    ]++;
  }

  let ans = 0;
  let odd = 0;
  for (let i = 0; i < 26; i++) {
    const c = cnt[i][i];
    ans += c - c % 2;
    odd |= c % 2;
    for (let j = i + 1; j < 26; j++) {
      ans += Math.min(cnt[i][j], cnt[j][i]) * 2
    }
  }
  return (ans + odd) * 2
};
