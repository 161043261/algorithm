from typing import List
from functools import cache


class Solution:
    def maxUncrossedLines(self, nums1: List[int], nums2: List[int]) -> int:
        @cache
        def dfs(idx1: int, idx2: int) -> int:
            if idx1 >= len(nums1) or idx2 >= len(nums2):
                return 0
            if nums1[idx1] == nums2[idx2]:
                return 1 + dfs(idx1 + 1, idx2 + 1)
            return max(dfs(idx1 + 1, idx2), dfs(idx1, idx2 + 1))

        return dfs(0, 0)
