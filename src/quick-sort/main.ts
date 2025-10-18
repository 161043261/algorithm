function quickSort(nums: number[], l: number, r: number) {
  if (l >= r) {
    return;
  }

  const partition = () => {
    let i = l,
      j = r;
    while (i < j) {
      //! 先右
      while (i < j && nums[j] >= nums[l]) {
        j--;
      }
      //! 后左
      while (i < j && nums[i] <= nums[l]) {
        i++;
      }
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    [nums[l], nums[i]] = [nums[i], nums[l]];
    return i;
  };
  const div = partition();

  quickSort(nums, l, div - 1);
  quickSort(nums, div + 1, r);
}

const nums = [3, 4, 1, 5, 2];
quickSort(nums, 0, nums.length - 1);

console.log(nums);
