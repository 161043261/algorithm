function minArraySum(
  nums: number[],
  k: number,
  op1: number,
  op2: number
): number {
  const key2ret = new Map<string, number>();
  const dfs = (idx: number, op1: number, op2: number): number => {
    if (idx < 0) {
      return 0;
    }
    const key = `${idx}-${op1}-${op2}`;
    if (key2ret.has(key)) {
      return key2ret.get(key)!;
    }

    let ret = dfs(idx - 1, op1, op2) + nums[idx];

    if (op1 > 0 && op2 > 0 && nums[idx] >= k) {
      ret = Math.min(
        ret,
        dfs(idx - 1, op1 - 1, op2 - 1) +
          (Math.ceil(nums[idx] / 2) >= k
            ? Math.ceil(nums[idx] / 2) - k
            : Math.ceil((nums[idx] - k) / 2))
      );
    }

    if (op1 > 0) {
      ret = Math.min(
        ret,
        dfs(idx - 1, op1 - 1, op2) + Math.ceil(nums[idx] / 2)
      );
    }

    if (op2 > 0 && nums[idx] >= k) {
      ret = Math.min(ret, dfs(idx - 1, op1, op2 - 1) + nums[idx] - k);
    }
    key2ret.set(key, ret);
    return ret;
  };

  return dfs(nums.length - 1, op1, op2);
}
