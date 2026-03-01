from typing import List
from functools import cache


class Solution:
    def rob(self, nums: List[int]) -> int:
        @cache
        def dfs(idx: int) -> int:
            if idx < 0:
                return 0
            return max(nums[idx] + dfs(idx - 2), dfs(idx - 1))

        return dfs(len(nums) - 1)

    def robV2(self, nums: List[int]) -> int:
        f = [0 for _ in range(len(nums) + 1)]
        for i in range(1, len(nums) + 1):
            f[i] = max(f[i - 1], (nums[i - 1] + f[i - 2]) if i >= 2 else nums[i - 1])

        return f[len(nums)]
