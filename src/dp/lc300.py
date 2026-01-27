from typing import List, Union
from math import inf
from functools import cache


class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        @cache
        def dfs(preVal: Union[float, int], idx: int) -> int:
            if idx >= len(nums):
                return 0
            if nums[idx] > preVal:
                return max(1 + dfs(nums[idx], idx + 1), dfs(preVal, idx + 1))
            else:
                return int(max(preVal, idx + 1))

        return dfs(-inf, 0)
