class Solution {
  self: Solution;
  static pos0: number[] = [-1];
  static total1 = 0;
  static ans = 0;

  constructor() {
    this.self = this;
  }

  static reset() {
    this.pos0 = [-1];
    this.total1 = 0;
    this.ans = 0;
  }

  static numberOfSubstrings(s: string): number {
    this.reset();
    for (let r = 0; r < s.length; r++) {
      if (s[r] === "0") {
        this.pos0.push(r);
      } else {
        this.total1++;
        this.ans += r - (this.pos0.at(-1) ?? 0);
      }

      const n = this.pos0.length;
      for (let i = n - 1; i > 0 && (n - i) * (n - i) <= this.total1; i--) {
        const p = this.pos0[i - 1];
        const q = this.pos0[i];
        const cnt0 = n - i;
        const cnt1 = r - q + 1 - cnt0;
        this.ans += Math.max(q - Math.max(cnt0 * cnt0 - cnt1, 0) - p, 0);
      }
    }
    return this.ans;
  }
}

const numberOfSubstrings = Solution.numberOfSubstrings.bind(Solution);

export default numberOfSubstrings;
