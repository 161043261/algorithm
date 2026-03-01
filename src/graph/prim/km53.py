from typing import List

# constants
Infinity = (1 << 31) - 1

# input
vertexNum, edgeNum = map(int, input().strip().split())

edges: List[List[int]] = [
    [Infinity for _ in range(vertexNum + 1)] for _ in range(vertexNum + 1)
]

for i in range(1, vertexNum + 1):
    edges[i][i] = 0

for _ in range(edgeNum):
    left, right, len = map(int, input().strip().split())
    edges[left][right] = len
    edges[right][left] = len

minDist: List[int] = [Infinity for _ in range(vertexNum + 1)]
inTree: List[bool] = [False for _ in range(vertexNum + 1)]

minDist[1] = 0
# inTree[1] = True

# for i in range(2, vertexNum + 1):
#     if edges[i][1] < minDist[i]:
#         minDist[i] = edges[i][1]


for _ in range(0, vertexNum - 1):
    candidate = -1
    minVal = Infinity

    for j in range(1, vertexNum + 1):
        if not inTree[j] and minDist[j] < minVal:
            candidate = j
            minVal = minDist[j]

    inTree[candidate] = True

    for j in range(1, vertexNum + 1):
        if not inTree[j] and edges[j][candidate] < minDist[j]:
            minDist[j] = edges[j][candidate]

ans: int = 0

for item in minDist[1:]:
    ans += item

print(ans)
