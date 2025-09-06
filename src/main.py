from typing import List, Tuple
from heapq import heapify, heapreplace


class Solution:
    def maxAverageRatio(self, classes: List[List[int]], extraStudents: int) -> float:
        hpArr: List[Tuple[float, int, int]] = []
        for passNum, totalNum in classes:
            gain = (totalNum - passNum) / (totalNum * (totalNum + 1))
            hpArr.append((-gain, passNum, totalNum))

        heapify(hpArr)

        for _ in range(extraStudents):
            _, passNum, totalNum = hpArr[0]
            passNum += 1
            totalNum += 1

            newGain = (totalNum - passNum) / (totalNum * (totalNum + 1))
            heapreplace(hpArr, (-newGain, passNum, totalNum))

        return sum((passNum / totalNum) for _, passNum, totalNum in hpArr) / len(
            classes
        )
