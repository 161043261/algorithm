from typing import List


class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        f = [0] * (len(nums) + 1)
        for i in range(len(nums)):
            f[i + 1] = max(f[i] + nums[i], nums[i])
        return max(f[1:])
