from typing import List


def removeElement(nums: List[int], val: int) -> int:
    l = 0
    r = len(nums)
    while l < r:
        if nums[l] == val:
            r -= 1
            nums[l], nums[r] = nums[r], nums[l]
        else:
            l += 1
    return l


class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        return removeElement(nums, val)
