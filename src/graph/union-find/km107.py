from typing import List, Tuple


parentIdx: List[int]
edges: List[Tuple[int, int]] = []

nodeNum, edgeNum = map(int, input().strip().split(" "))

for _ in range(edgeNum):
    start, end = map(int, input().strip().split(" "))
    edges.append((start, end))

src, dst = map(int, input().strip().split(" "))

# parentIdx
# 元素的下标, 是每个节点的序号
# 元素的值, 是对应节点的父节点的序号
parentIdx = [idx for idx in range(nodeNum + 1)]

# union 合并


def union(idxA: int, idxB: int) -> None:
    rootA = find(idxA)
    rootB = find(idxB)
    parentIdx[rootA] = rootB


# find 找根节点
def find(idx: int) -> int:
    pIdx = parentIdx[idx]

    if pIdx == idx:
        return idx

    root = find(pIdx)
    # 路径压缩
    parentIdx[idx] = root

    return root


for edge in edges:
    idxA = edge[0]
    idxB = edge[1]

    union(idxA, idxB)

rootSrc = find(src)
rootDst = find(dst)

print(1 if rootSrc == rootDst else 0)
