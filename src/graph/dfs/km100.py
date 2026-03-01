# dfs 需要递归
from typing import List


ans = 0

step: List[List[int]] = [[0, 1], [1, 0], [0, -1], [-1, 0]]  # y, x

rowNum, colNum = map(int, input().strip().split(" "))

visit: List[List[bool]] = [[False for _ in range(colNum)] for _ in range(rowNum)]

grid: List[List[int]] = []

for _ in range(rowNum):
    item = list(map(int, input().strip().split(" ")))
    grid.append(item)


def main() -> None:
    global ans

    # dfs start
    def dfs(y: int, x: int) -> int:
        visit[y][x] = True
        ret = 1

        for item in step:
            nextY = y + item[0]
            nextX = x + item[1]

            if (
                nextY >= 0
                and nextY < rowNum
                and nextX >= 0
                and nextX < colNum
                and grid[nextY][nextX] == 1
                and not visit[nextY][nextX]
            ):
                ret += dfs(nextY, nextX)

        return ret

    # dfs end

    for y in range(rowNum):
        for x in range(colNum):
            if grid[y][x] == 1 and not visit[y][x]:
                ret = dfs(y, x)
                ans = max(ans, ret)


main()
print(ans)
