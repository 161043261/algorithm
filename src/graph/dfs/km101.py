from typing import List, Tuple


ans: int = 0

step: List[List[int]] = [[0, 1], [1, 0], [0, -1], [-1, 0]]  # y, x

rowNum, colNum = map(int, input().strip().split(" "))

visit: List[List[bool]] = [[False for _ in range(colNum)] for _ in range(rowNum)]

grid: List[List[int]] = []

for _ in range(rowNum):
    row = list(map(int, input().strip().split(" ")))
    grid.append(row)


def main() -> None:
    global ans

    def dfs(y: int, x: int) -> Tuple[int, bool]:
        ret = 1
        isolated = True
        visit[y][x] = True

        if y == 0 or y == rowNum - 1 or x == 0 or x == colNum - 1:
            isolated = False

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
                r, i = dfs(nextY, nextX)

                ret += r
                isolated = isolated and i

        return (ret, isolated)

    for y in range(rowNum):
        for x in range(colNum):
            if grid[y][x] == 1 and not visit[y][x]:
                ret, isolated = dfs(y, x)
                if isolated:
                    ans += ret


main()
print(ans)
