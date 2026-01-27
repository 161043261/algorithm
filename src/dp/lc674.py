from typing import List


# See also ./lc718.py
class Solution:
    def findLengthOfLCIS(self, nums: List[int]) -> int:
        f = [1] * len(nums)
        ans = 1
        for i in range(1, len(nums)):
            if nums[i] > nums[i - 1]:
                f[i] = f[i - 1] + 1
                ans = max(ans, f[i])
        return ans
