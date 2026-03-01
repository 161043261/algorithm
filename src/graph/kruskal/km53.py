from typing import List


vertexNum, edgeNum = map(int, input().strip().split(" "))


class Edge:
    left: int
    right: int
    val: int

    def __init__(self, left: int, right: int, val: int) -> None:
        self.left = left
        self.right = right
        self.val = val


edges: List[Edge] = []
for _ in range(edgeNum):
    left, right, val = map(int, input().strip().split(" "))
    edges.append(Edge(left, right, val))


parentIdx: List[int] = [idx for idx in range(vertexNum + 1)]


# def resetParentIdx():
#     global parentIdx
#     parentIdx = [idx for idx in range(vertexNum + 1)]


def find(idx: int) -> int:
    pIdx = parentIdx[idx]
    if pIdx == idx:
        return idx

    root = find(pIdx)
    parentIdx[idx] = root
    return root


def union(idxA: int, idxB: int) -> None:
    rootA = find(idxA)
    rootB = find(idxB)
    parentIdx[rootA] = rootB


edges.sort(key=lambda edge: edge.val)

print(edges.__dict__)

ans = 0

for edge in edges:
    rootL = find(edge.left)
    rootR = find(edge.right)

    if rootL != rootR:
        ans += edge.val
        union(rootL, rootR)


print(ans)
