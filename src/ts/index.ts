function lengthAfterTransformations(s: string, t: number): number {
  const MOD = 1_000_000_007;
  const LEN = 26;

  let cnt = new Array(LEN).fill(0);
  for (const ch of s) {
    cnt[ch.charCodeAt(0) - "a".charCodeAt(0)]++;
  }

  for (let i = 0; i < t; i++) {
    const nextCnt = new Array(LEN).fill(0);
    nextCnt[0] = cnt[LEN - 1];
    nextCnt[1] = (cnt[LEN - 1] + cnt[0]) % MOD;
    for (let i = 2; i < 26; i++) {
      nextCnt[i] = cnt[i - 1];
    }
    cnt = nextCnt;
  }
  let ans = 0;
  for (let i = 0; i < LEN; i++) {
    ans = (ans + cnt[i]) % MOD;
  }
  return ans;
}

const ans = lengthAfterTransformations("jqktcurgdvlibczdsvnsg", 7517);
console.log(ans);
