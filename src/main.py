from typing import List


class Solution:
    def minPairSum(self, nums: List[int]) -> int:
        nums.sort()
        ans = nums[0] + nums[-1]
        for i in range(0, len(nums) // 2):
            ans = max(ans, nums[i] + nums[-i - 1])
        return ans
