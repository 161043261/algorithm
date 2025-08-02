from typing import List, Tuple


step: List[Tuple[int, int]] = [(1, 0), (0, 1), (-1, 0), (0, -1)]

grid: List[List[int]] = []
luVisit: List[List[bool]]
rdVisit: List[List[bool]]

rowNum, colNum = map(int, input().strip().split(" "))

for _ in range(rowNum):
    grid.append(list(map(int, input().strip().split(" "))))

luVisit = [[False for _ in range(colNum)] for _ in range(rowNum)]
rdVisit = [[False for _ in range(colNum)] for _ in range(rowNum)]

ans: List[Tuple[int, int]] = []


def rico() -> None:

    def dfs(y: int, x: int, visit: List[List[bool]]) -> None:
        visit[y][x] = True

        for item in step:
            dy, dx = item
            nextY, nextX = y + dy, x + dx
            if (
                nextY >= 0
                and nextY < rowNum
                and nextX >= 0
                and nextX < colNum
                and grid[y][x] <= grid[nextY][nextX]
                and (not visit[nextY][nextX])
            ):
                dfs(nextY, nextX, visit)

    for x in range(colNum):
        dfs(0, x, luVisit)
        dfs(rowNum - 1, x, rdVisit)

    for y in range(rowNum):
        dfs(y, 0, luVisit)
        dfs(y, colNum - 1, rdVisit)

    for y in range(rowNum):
        for x in range(colNum):
            if luVisit[y][x] and rdVisit[y][x]:
                ans.append((y, x))


rico()
for item in ans:
    print(item[0], item[1])
