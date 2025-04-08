/* eslint-disable @typescript-eslint/no-unused-vars */

//! 704
function search(nums: number[], target: number): number {
  let [l, r] = [0, nums.length - 1];
  while (l <= r) {
    const m = Math.floor(l + r);
    if (nums[m] === target) {
      return m;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    nums[m] > target ? (r = m - 1) : (l = m + 1);
  }
  return -1;
}

//! 35
function searchInsert(nums: number[], target: number): number {
  let [l, r] = [0, nums.length - 1];
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (nums[m] === target) {
      return m;
    }
    if (nums[m] > target) {
      r = m;
    } else {
      l = m + 1;
    }
  }
  return nums[r] >= target ? r : r + 1;
}

//! 744
function nextGreatestLetter(letters: string[], target: string): string {
    
};
