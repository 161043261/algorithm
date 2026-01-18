from typing import List


class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        f: List[List[int]] = [
            [0] * len(obstacleGrid[0]) for _ in range(len(obstacleGrid))
        ]

        for y in range(len(obstacleGrid)):
            for x in range(len(obstacleGrid[0])):
                if obstacleGrid[y][x] == 1:
                    f[y][x] = 0
                    continue

                if y == 0 and x == 0:
                    f[0][0] = 1
                    continue

                if y == 0:
                    f[y][x] = f[y][x - 1]
                    continue

                if x == 0:
                    f[y][x] = f[y - 1][x]
                    continue

                f[y][x] = f[y - 1][x] + f[y][x - 1]

        return f[-1][-1]
