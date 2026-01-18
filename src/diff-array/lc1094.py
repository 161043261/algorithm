from typing import Dict, List


class Solution:
    def carPooling(self, trips: List[List[int]], capacity: int) -> bool:
        diffArr = [0] * 1001
        len = 0
        for n, f, t in trips:
            diffArr[f] += n
            diffArr[t] -= n
            len = max(len, t + 1)

        acc = 0
        for diff in diffArr[:len]:
            acc += diff
            if acc > capacity:
                return False

        return True

    def carPooling2(self, trips: List[List[int]], capacity: int) -> bool:
        diffMap: Dict[int, int] = dict({})
        for n, f, t in trips:
            if f not in diffMap:
                diffMap[f] = 0
            if t not in diffMap:
                diffMap[t] = 0
            diffMap[f] += n
            diffMap[t] -= n
        acc = 0
        for k in sorted(diffMap, key=lambda v: v):
            acc += diffMap[k]
            if acc > capacity:
                return False

        return True
