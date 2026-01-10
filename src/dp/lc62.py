from typing import List


class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        # f: List[List[int]] = [[0] * n for _ in range(m)]
        f: List[List[int]] = [[0 for _ in range(n)] for _ in range(m)]

        for y in range(m):
            for x in range(n):
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

        return f[m - 1][n - 1]
