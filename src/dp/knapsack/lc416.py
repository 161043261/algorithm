from typing import List
from functools import cache


class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        numSum = sum(nums)
        if numSum % 2 != 0:
            return False

        @cache
        def dfs(i: int, acc: int) -> bool:
            if acc == numSum // 2:
                return True
            if i == len(nums):
                return False
            return dfs(i + 1, acc) or dfs(i + 1, acc + nums[i])

        return dfs(0, 0)
