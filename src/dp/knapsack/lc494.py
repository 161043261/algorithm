from typing import List
from functools import cache


class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        numSum = sum(nums)
        if numSum - abs(target) < 0 or (numSum - abs(target)) % 2 == 1:
            return 0

        cap = (numSum - abs(target)) // 2
        f = [[0 for _ in range(cap + 1)] for _ in range(len(nums) + 1)]
        f[0][0] = 1

        for i in range(1, len(nums) + 1):
            for j in range(0, cap + 1):
                if j < nums[i - 1]:
                    f[i][j] = f[i - 1][j]
                else:
                    f[i][j] = f[i - 1][j] + f[i - 1][j - nums[i - 1]]
        return f[len(nums)][cap]

    def findTargetSumWaysV2(self, nums: List[int], target: int) -> int:
        numSum = sum(nums)
        if numSum - abs(target) < 0 or (numSum - abs(target)) % 2 == 1:
            return 0

        @cache
        def dfs(i: int, size: int) -> int:
            if i < 0:
                return 1 if size == 0 else 0
            if size < nums[i]:
                return dfs(i - 1, size)
            return dfs(i - 1, size) + dfs(i - 1, size - nums[i])

        cap = (numSum - abs(target)) // 2
        return dfs(len(nums) - 1, cap)
