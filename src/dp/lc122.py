from typing import List
from functools import cache


class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        @cache
        def dfs(cnt: int, idx: int) -> int:
            if idx == len(prices):
                return 0
            if cnt == 0:
                return max(dfs(0, idx + 1), -prices[idx] + dfs(1, idx + 1))
            else:
                return max(dfs(1, idx + 1), prices[idx] + dfs(0, idx + 1))

        return dfs(0, 0)
