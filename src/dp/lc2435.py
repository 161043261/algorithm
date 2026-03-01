from typing import List
# from functools import cache


class Solution:
    def numberOfPaths(self, grid: List[List[int]], k: int) -> int:
        mod = 10**9 + 7
        m, n = len(grid), len(grid[0])
        memo = [[[-1] * k for _ in range(n)] for _ in range(m)]

        # @cache
        def dfs(i: int, j: int, s: int) -> int:
            if i < 0 or j < 0:
                return 0
            preS = ((s - grid[i][j]) % k + k) % k
            if i == 0 and j == 0:
                return 1 if preS == 0 else 0
            if memo[i][j][s] != -1:
                return memo[i][j][s]
            memo[i][j][s] = (dfs(i - 1, j, preS) + dfs(i, j - 1, preS)) % mod
            return memo[i][j][s]

        return dfs(m - 1, n - 1, 0)
