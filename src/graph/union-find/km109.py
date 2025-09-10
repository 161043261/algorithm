from typing import List, Tuple


nodeNum = int(input().strip())

parentIdx = [idx for idx in range(nodeNum + 1)]


def resetParentIdx() -> None:
    global parentIdx
    parentIdx = [idx for idx in range(nodeNum + 1)]


def union(idxA: int, idxB: int) -> None:
    rootA = find(idxA)
    rootB = find(idxB)
    parentIdx[rootA] = rootB


def find(idx: int) -> int:
    pIdx = parentIdx[idx]
    if pIdx == idx:
        return idx

    root = find(pIdx)
    parentIdx[idx] = root
    return root


def hasSameRoot(idxA: int, idxB: int) -> bool:
    rootA = find(idxA)
    rootB = find(idxB)
    return rootA == rootB


# 入度
inDegree: List[int] = [0 for _ in range(nodeNum + 1)]

edges: List[Tuple[int, int]] = []

for _ in range(nodeNum):
    start, end = map(int, input().strip().split(" "))
    inDegree[end] += 1
    edges.append((start, end))


# inDegree == 2
edgeIdxList: List[int] = []

for i in range(nodeNum - 1, -1, -1):
    if inDegree[edges[i][1]] == 2:
        edgeIdxList.append(i)


def isTreeAfterRemoveEdge(edgeIdx: int) -> bool:
    resetParentIdx()

    for i in range(nodeNum):
        if i == edgeIdx:
            continue

        if hasSameRoot(edges[i][0], edges[i][1]):
            return False

        union(edges[i][0], edges[i][1])

    return True


def getRemoveEdge() -> None:
    resetParentIdx()
    for i in range(nodeNum):
        if hasSameRoot(edges[i][0], edges[i][1]):
            print(edges[i][0], edges[i][1])
            exit(0)
        else:
            union(edges[i][0], edges[i][1])


if len(edgeIdxList) > 0:
    if isTreeAfterRemoveEdge(edgeIdxList[0]):
        print(edges[edgeIdxList[0]][0], edges[edgeIdxList[0]][1])
        exit(0)
    else:
        print(edges[edgeIdxList[1]][0], edges[edgeIdxList[0]][1])
        exit(0)
else:
    getRemoveEdge()
