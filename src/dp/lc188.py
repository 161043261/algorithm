from typing import List
from functools import cache


class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        @cache
        def dfs(cnt: int, idx: int) -> int:
            if cnt > 2 * k or idx >= len(prices):
                return 0
            if cnt % 2 == 0:
                return max(dfs(cnt, idx + 1), -prices[idx] + dfs(cnt + 1, idx + 1))
            else:
                return max(dfs(cnt, idx + 1), prices[idx] + dfs(cnt + 1, idx + 1))

        return dfs(0, 0)
