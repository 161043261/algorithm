from typing import List


class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        dp: List[List[int]] = [
            [0] * len(obstacleGrid[0]) for _ in range(len(obstacleGrid))
        ]

        for y in range(len(obstacleGrid)):
            for x in range(len(obstacleGrid[0])):
                if obstacleGrid[y][x] == 1:
                    dp[y][x] = 0
                    continue

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

        return dp[-1][-1]
