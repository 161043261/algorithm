import math
from typing import List

n, m = map(int, input().split())

grid: List[List[int]] = []
for _ in range(n):
    line = input().split()
    row = list(map(int, line))
    grid.append(row)

xPreSum = [0] * (m + 1)
for x in range(1, m + 1):
    colSum = 0
    for y in range(n):
        colSum += grid[y][x - 1]
    xPreSum[x] = xPreSum[x - 1] + colSum

yPreSum = [0] * (n + 1)
for y in range(1, n + 1):
    rowSum = 0
    for x in range(m):
        rowSum += grid[y - 1][x]
    yPreSum[y] = yPreSum[y - 1] + rowSum

ans = math.inf

for x in range(1, m):
    cur = xPreSum[m] - 2 * xPreSum[x]
    ans = min(ans, abs(cur))

for y in range(1, n):
    cur = yPreSum[n] - 2 * yPreSum[y]
    ans = min(ans, abs(cur))

print(ans)
