function getSneakyNumbers(nums: number[]): number[] {
  const numSet = new Set<number>();
  const ans: number[] = []
  for (const num  of nums ) {
    if (numSet.has(num)) {
      ans.push(num);
      if (ans.length === 2) {
        return ans;
      }
    }
    numSet.add(num)
  }
  return ans;
};
