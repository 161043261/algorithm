/* eslint-disable @typescript-eslint/no-unused-vars */
function maximumGain(s: string, x: number, y: number): number {
  let a = "a",
    b = "b";
  if (x < y) {
    [x, y] = [y, x];
    [a, b] = ["b", "a"];
  }

  let ans = 0;

  for (let i = 0; i < s.length; i++) {
    let cntA = 0,
      cntB = 0;
    for (; (i < s.length && s[i] === a) || s[i] === b; i++) {
      if (s[i] === a) {
        cntA++;
        continue;
      }

      if (cntA > 0) {
        ans += x;
        cntA--;
      } else {
        cntB++;
      }
    }

    ans += Math.min(cntA, cntB) * y;
  }

  return ans;
}
