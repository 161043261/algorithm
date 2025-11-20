# heapify, heappop, heappush, heappushpop, heapreplace, merge, nlargest, nsmallest
from heapq import heappop, heappush

from typing import List, Tuple


class Edge:
    end: int
    val: int


vertexNum, edgeNum = map(int, input().strip().split(" "))

grid: List[List[Edge]] = [[] for _ in range(vertexNum + 1)]

for _ in range(edgeNum):
    start_, end_, val_ = map(int, input().strip().split(" "))
    edge = Edge()
    edge.end = end_
    edge.val = val_

    grid[start_].append(edge)

start = 1
end = vertexNum

Infinity = (1 << 31) - 1

minDist = [Infinity for _ in range(vertexNum + 1)]
inTree = [False for _ in range(vertexNum + 1)]

# sortKey, vertexIdx, minDist
minHeap: List[Tuple[int, int, int]] = []

heappush(minHeap, (0, start, 0))
minDist[start] = 0

while len(minHeap) > 0:
    vertexIdx_ = heappop(minHeap)[1]

    if inTree[vertexIdx_]:
        continue

    inTree[vertexIdx_] = True

    for edge in grid[vertexIdx_]:
        if not inTree[edge.end] and (
            (minDist[vertexIdx_] + edge.val) < minDist[edge.end]
        ):
            minDist[edge.end] = minDist[vertexIdx_] + edge.val
            heappush(minHeap, (minDist[edge.end], edge.end, minDist[edge.end]))

if minDist[end] == Infinity:
    print(-1)
else:
    print(minDist[end])
