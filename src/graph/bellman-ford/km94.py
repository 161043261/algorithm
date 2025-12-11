from typing import List, Tuple


vertexNum, edgeNum = map(int, input().strip().split(" "))

edges: List[Tuple[int, int, int]] = []

for _ in range(edgeNum):
    start, end, price = map(int, input().strip().split(" "))
    edges.append((start, end, price))

Infinity = (1 << 31) - 1
minDist = [Infinity for _ in range(vertexNum + 1)]

start = 1
end = vertexNum
minDist[start] = 0

for _ in range(vertexNum - 1):
    updated = False
    for edge in edges:
        start_, end_, price_ = edge

        if minDist[start_] != Infinity and minDist[end_] > minDist[start_] + price_:
            minDist[end_] = minDist[start_] + price_
            updated = True

    if not updated:
        break

if minDist[end] == Infinity:
    print("unconnected")
else:
    print(minDist[end])
