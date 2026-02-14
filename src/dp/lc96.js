/**
 * @param {number} n
 * @return {number}
 */
function numTrees(n) {
  const f = Array.from({ length: n + 1 }, () => 0);
  f[0] = 1;
  f[1] = 1;
  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      f[i] += f[j] * f[i - 1 - j];
    }
  }

  return f[n];
}

export default numTrees;
