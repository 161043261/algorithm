from typing import Dict, List, Set, Tuple


rowNum, colNum = map(int, input().strip().split(" "))

step: List[Tuple[int, int]] = [(1, 0), (0, 1), (-1, 0), (0, -1)]

# visit = [[False for _ in range(colNum)] for _ in range(rowNum)]

grid: List[List[int]] = []

mark: int = 1
allIsland: bool = True

for _ in range(rowNum):
    grid.append(list(map(int, input().strip().split(" "))))

island2size: Dict[int, int] = dict()

size: int = 0


def dfs(y: int, x: int) -> None:
    global size
    size += 1
    grid[y][x] = mark

    for item in step:
        dy, dx = item[0], item[1]
        nextY, nextX = y + dy, x + dx
        if (
            nextY >= 0
            and nextY < rowNum
            and nextX >= 0
            and nextX < colNum
            and grid[nextY][nextX] == 1
        ):
            dfs(nextY, nextX)


for y in range(rowNum):
    for x in range(colNum):
        if grid[y][x] == 1:
            mark += 1
            size = 0
            dfs(y, x)
            island2size[mark] = size
        if grid[y][x] == 0:
            allIsland = False

if allIsland:
    print(rowNum * colNum)
    exit(0)

ans: int = 1

for y in range(rowNum):
    for x in range(colNum):
        if grid[y][x] == 0:
            cur = 1
            neighborMark: Set[int] = set()
            for item in step:
                dy, dx = item
                neighborY = y + dy
                neighborX = x + dx

                if (
                    neighborY >= 0
                    and neighborY < rowNum
                    and neighborX >= 0
                    and neighborX < colNum
                    and grid[neighborY][neighborX] > 1
                ):
                    neighborMark.add(grid[neighborY][neighborX])

            for mark in neighborMark:
                cur += island2size[mark]

            ans = max(ans, cur)

print(ans)
