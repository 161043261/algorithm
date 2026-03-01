function intersect(nums1: number[], nums2: number[]): number[] {
  const toMap = (nums: number[]) => {
    const num2cnt = new Map<number, number>();
    nums.forEach((num) => num2cnt.set(num, (num2cnt.get(num) ?? 0) + 1));
    return num2cnt;
  };
  const [num2cnt1, num2cnt2] = [toMap(nums1), toMap(nums2)];
  const ans: number[] = [];
  for (const [num, cnt] of num2cnt1) {
    if (num2cnt2.has(num)) {
      const len = Math.min(cnt, num2cnt2.get(num) ?? 0);
      ans.push(...new Array(len).fill(num));
    }
  }
  return ans;
}

export default intersect;
