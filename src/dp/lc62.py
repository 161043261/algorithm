from typing import List


class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        # dp: List[List[int]] = [[0] * n for _ in range(m)]
        dp: List[List[int]] = [[0 for _ in range(n)] for _ in range(m)]

        for y in range(m):
            for x in range(n):
                if y == 0 and x == 0:
                    dp[0][0] = 1
                    continue

                if y == 0:
                    dp[y][x] = dp[y][x - 1]
                    continue

                if x == 0:
                    dp[y][x] = dp[y - 1][x]
                    continue

                dp[y][x] = dp[y - 1][x] + dp[y][x - 1]

        return dp[m - 1][n - 1]
