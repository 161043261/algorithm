# dfs 需要递归
from typing import List

grid: List[List[int]] = []

rowNum, colNum = map(int, input().strip().split(" "))

for _ in range(rowNum):
    row = list(map(int, input().strip().split(" ")))
    grid.append(row)

visit: List[List[bool]] = [[False for _ in range(colNum)] for _ in range(rowNum)]

ans: int = 0

step: List[List[int]] = [[0, 1], [1, 0], [0, -1], [-1, 0]]  # y, x


def main() -> None:
    # ret: int = 0
    global ans

    def dfs(y: int, x: int) -> None:
        visit[y][x] = True

        for item in step:
            nextY = y + item[0]
            nextX = x + item[1]

            if (
                nextY >= 0
                and nextY < rowNum
                and nextX >= 0
                and nextX < colNum
                and grid[nextY][nextX] == 1
                and (not visit[nextY][nextX])
            ):
                dfs(nextY, nextX)

    for y in range(0, rowNum):
        for x in range(0, colNum):
            if grid[y][x] == 1 and not visit[y][x]:
                ans += 1
                dfs(y, x)


main()
print(ans)
