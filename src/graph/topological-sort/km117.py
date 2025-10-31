from typing import Dict, List


vertexNum, edgeNum = map(int, input().strip().split(" "))

# 入度
inDegree: List[int] = [0 for _ in range(vertexNum)]

edges: Dict[int, List[int]] = dict()

idxQueue: List[int] = []
ans: List[int] = []

for _ in range(edgeNum):
    start, end = map(int, input().strip().split(" "))
    inDegree[end] += 1
    if start in edges:
        edges[start].append(end)
    else:
        edges[start] = [end]

for i in range(vertexNum):
    if inDegree[i] == 0:
        idxQueue.append(i)

while len(idxQueue) > 0:
    head = idxQueue.pop(0)
    ans.append(head)

    dst = edges.get(head)
    if dst is not None:
        for item in dst:
            inDegree[item] -= 1
            if inDegree[item] == 0:
                idxQueue.append(item)

if len(ans) == vertexNum:
    print(" ".join(map(str, ans)))
else:
    print(-1)
