function maxFrequency(
  nums: number[],
  k: number,
  numOperations: number,
): number {
  const num2cnt = new Map<number, number>();
  const val2diff = new Map<number, number>();

  for (const num of nums) {
    num2cnt.set(num, (num2cnt.get(num) ?? 0) + 1);
    if (!val2diff.has(num)) {
      val2diff.set(num, 0);
    }
    val2diff.set(num - k, (val2diff.get(num - k) ?? 0) + 1);
    val2diff.set(num + k + 1, (val2diff.get(num + k + 1) ?? 0) - 1);
  }

  let ans = 0;
  let sumDiff = 0;
  const valDiffArr = Array.from<[number, number]>(val2diff.entries()).sort(
    (a, b) => a[0] - b[0],
  );
  for (const [val, diff] of valDiffArr) {
    sumDiff += diff;
    ans = Math.max(
      ans,
      Math.min(sumDiff, (num2cnt.get(val) ?? 0) + numOperations),
    );
  }

  return ans;
}

export default maxFrequency;
