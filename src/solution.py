from typing import List


dirs = ((1, 0), (0, 1), (-1, 0), (0, -1))


class Solution:
    def countUnguarded(
        self, m: int, n: int, guards: List[List[int]], walls: List[List[int]]
    ) -> int:
        grid = [[0] * n for _ in range(m)]

        for x, y in guards:
            grid[x][y] = -1
        for x, y in walls:
            grid[x][y] = -1

        for x1, y1 in guards:
            for dx, dy in dirs:
                nx1, ny1 = x1 + dx, y1 + dy
                while 0 <= nx1 < m and 0 <= ny1 < n and grid[nx1][ny1] != -1:
                    grid[nx1][ny1] = 1
                    nx1 += dx
                    ny1 += dy

        return sum(row.count(0) for row in grid)
