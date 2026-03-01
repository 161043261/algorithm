from typing import List, Tuple


nodeNum = int(input().strip())

edges: List[Tuple[int, int]] = []

for _ in range(nodeNum):
    idxA, idxB = map(int, input().strip().split(" "))
    edges.append((idxA, idxB))

parentIdx = [idx for idx in range(nodeNum + 1)]


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


def hasSameRoot(idxA: int, idxB: int) -> bool:
    rootA = find(idxA)
    rootB = find(idxB)
    return rootA == rootB


for edge in edges:
    idxA = edge[0]
    idxB = edge[1]

    if hasSameRoot(idxA, idxB):
        print(idxA, idxB)
        exit(0)
    else:
        union(idxA, idxB)
