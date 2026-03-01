function leastInterval(tasks: string[], n: number): number {
  const nums = new Array<number>(26).fill(0);
  for (const task of tasks) {
    nums[task.charCodeAt(0) - "A".charCodeAt(0)]++;
  }
  nums.sort((a, b) => b - a);
  let cnt = 1;
  while (cnt < nums.length && nums[cnt] === nums[0]) {
    cnt++;
  }
  return Math.max(tasks.length, cnt + (n + 1) * (nums[0] - 1));
}

export default leastInterval;
