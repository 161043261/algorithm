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

    def bfs(y: int, x: int) -> int:
        ret = 0
        queue: List[Tuple[int, int]] = []

        queue.append((y, x))
        # 某节点加入队列时, 立即标记该节点已访问
        visit[y][x] = True
        ret += 1

        while len(queue) > 0:
            head = queue.pop(0)

            headY = head[0]
            headX = head[1]

            for item in step:
                nextY = headY + item[0]
                nextX = headX + item[1]

                if (
                    nextY >= 0
                    and nextY < rowNum
                    and nextX >= 0
                    and nextX < colNum
                    and grid[nextY][nextX] == 1
                    and not visit[nextY][nextX]
                ):
                    queue.append((nextY, nextX))
                    # 某节点加入队列时, 立即标记该节点已访问
                    visit[nextY][nextX] = True
                    ret += 1

        return ret

    for y in range(rowNum):
        for x in range(colNum):
            if grid[y][x] == 1 and not visit[y][x]:
                ret = bfs(y, x)
                ans = max(ans, ret)


main()
print(ans)
