from typing import List


class Solution:
    def countPartitions(self, nums: List[int]) -> int:
        preSum = [0] * (len(nums) + 1)
        ans = 0
        for i in range(1, len(nums) + 1):
            preSum[i] = preSum[i - 1] + nums[i - 1]
        for i in range(1, len(nums)):
            leftSum = preSum[i]
            rightSum = preSum[-1] - preSum[i]
            diff = leftSum - rightSum
            ans += 1 if diff % 2 == 0 else 0
        return ans
