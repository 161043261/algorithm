function quickSort(nums: number[], l: number, r: number) {
  if (l >= r) {
    return;
  }

  const partition = () => {
    let i = l,
      j = r;
    while (i < j) {
      while (i < j && nums[j] >= nums[l]) {
        j--;
      }
      while (i < j && nums[i] <= nums[l]) {
        i++;
      }
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    [nums[l], nums[i]] = [nums[i], nums[l]];
    return i;
  };
  const _ = partition();

  quickSort(nums, l, _ - 1);
  quickSort(nums, _ + 1, r);
}

export default quickSort;
