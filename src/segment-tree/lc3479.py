from typing import List


baseArr: List[int] = []
segmentTree: List[int] = []

NegInfinity = -(1 << 31)


# 对 baseArr 的 [left, right] 区间建立线段树, root 是根节点的下标
def build(left: int, right: int, root: int) -> None:
    if left == right:
        segmentTree[root] = baseArr[left]
        return

    mid = left + ((right - left) // 2)
    build(left, mid, root * 2)
    build(mid + 1, right, root * 2 + 1)

    segmentTree[root] = max(segmentTree[root * 2], segmentTree[root * 2 + 1])


def query(left: int, right: int, queryLeft: int, queryRight: int, node: int) -> int:
    if queryLeft > right or queryRight < left:
        return NegInfinity

    if queryLeft <= left and right <= queryRight:
        print(f"left: {left}, right: {right}")
        print(f"queryLeft: {queryLeft}, queryRight: {queryRight}")
        return segmentTree[node]

    mid = left + ((right - left) // 2)
    return max(
        query(left, mid, queryLeft, queryRight, node * 2),
        query(mid + 1, right, queryLeft, queryRight, node * 2 + 1),
    )


def update(left: int, right: int, idx: int, val: int, root: int) -> None:
    if left == right:
        segmentTree[root] = val
        return

    mid = left + ((right - left) // 2)
    if idx <= mid:
        update(left, mid, idx, val, root * 2)
    else:
        update(mid + 1, right, idx, val, root * 2 + 1)

    segmentTree[root] = max(segmentTree[root * 2], segmentTree[root * 2 + 1])


class Solution:
    def numOfUnplacedFruits(self, fruits: List[int], baskets: List[int]) -> int:
        if len(baskets) == 0:
            return len(fruits)

        global baseArr
        global segmentTree
        baseArr = baskets
        #! len(segmentTree) == 4 * len(baseArr)
        segmentTree = [0 for _ in range(len(baseArr) * 4)]

        # left, right, root
        build(0, len(baseArr) - 1, 1)
        ans = 0

        for i in range(len(fruits)):
            left = 0
            right = len(baseArr) - 1
            res = -1

            while left <= right:
                mid = left + ((right - left) // 2)
                if (
                    query(
                        left=0,
                        right=len(baseArr) - 1,
                        queryLeft=0,
                        queryRight=mid,
                        node=1,
                    )
                    >= fruits[i]
                ):
                    res = mid
                    right = mid - 1
                else:
                    left = mid + 1

            if res != -1 and baseArr[res] >= fruits[i]:
                update(left=0, right=len(baseArr) - 1, idx=res, val=NegInfinity, root=1)
            else:
                ans += 1

        return ans
