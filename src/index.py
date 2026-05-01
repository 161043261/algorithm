from typing import List

nx = [[0, 1], [0, -1], [1, 0], [-1, 0]]

class Solution:
    def containsCycle(self, grid: List[List[str]]) -> bool:
        m, n = len(grid), len(grid[0])
        visited = [[False] * n for _ in range(m)]

        def dfs(i: int, j: int, prevI: int, prevJ: int) -> bool:
            visited[i][j] = True
            for item in nx:
                ni = i + item[0]
                nj = j + item[1]
                if ni < 0 or ni >= m or nj < 0 or nj >= n or (ni == prevI and nj == prevJ) or grid[ni][nj] != grid[i][j]:
                    continue
                if visited[ni][nj]:
                    return True
                if dfs(ni, nj, i, j):
                    return True
            return False

        for i in range(m):
            for j in range(n):
                if not visited[i][j] and dfs(i, j, -1, -1):
                    return True
        return False

    def minOperations(self, grid: List[List[int]], x:int) -> int:
        a = []

        target = grid[0][0] % x

        for row in grid:
            for v in row:
                if v % x != target:
                    return -1

            a += row # a.extend(row)
            # a.extend(row)  # Extend list by appending elements from the iterable.

        a.sort()
        median = a[len(a) // 2]

        return sum(abs(v - median) for v in a)
