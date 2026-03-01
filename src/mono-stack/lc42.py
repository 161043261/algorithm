from typing import List


class Solution:
    def trap(self, height: List[int]) -> int:
        ans = 0

        idxStack: List[int] = list[int]()
        for i in range(0, len(height)):
            if len(idxStack) == 0 or height[idxStack[-1]] > height[i]:
                idxStack.append(i)
                continue

            if height[idxStack[-1]] == height[i]:
                idxStack.pop()
                idxStack.append(i)
                continue

            while len(idxStack) > 0 and height[idxStack[-1]] < height[i]:
                midIdx = idxStack.pop()
                if len(idxStack) > 0:
                    h = min(height[idxStack[-1]], height[i]) - height[midIdx]
                    w = i - idxStack[-1] - 1
                    ans += h * w

            idxStack.append(i)

        return ans
