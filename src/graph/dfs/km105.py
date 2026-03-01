from typing import Dict, List


nodeNum, edgeNum = map(int, input().strip().split(" "))

graph: Dict[int, List[int]] = dict()

for _ in range(edgeNum):
    start, end = map(int, input().strip().split(" "))
    if start in graph:
        graph[start].append(end)
    else:
        graph[start] = [end]

visit: List[bool] = [False for _ in range(nodeNum + 1)]


def dfs(key: int) -> None:
    visit[key] = True

    if key in graph:
        for sibling in graph[key]:
            if not visit[sibling]:
                dfs(sibling)


dfs(1)
for item in visit[1:]:
    if not item:
        print(-1)
        exit(0)

print(1)
