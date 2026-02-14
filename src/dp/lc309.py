from typing import List
from functools import cache


class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        @cache
        def dfs(buy: bool, idx: int) -> int:
            if idx >= len(prices):
                return 0
            if buy:
                return max(dfs(True, idx + 1), prices[idx] + dfs(False, idx + 2))
            else:
                return max(dfs(False, idx + 1), -prices[idx] + dfs(True, idx + 1))

        return dfs(False, 0)
