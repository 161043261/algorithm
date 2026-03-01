from typing import List, Set


class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        self.path: List[int] = []
        self.ans: List[List[int]] = []
        self.nums: List[int] = nums
        self.usedIdxSet: Set[int] = set()
        self.backtrack()

        return self.ans

    def backtrack(self) -> None:
        if len(self.path) == len(self.nums):
            self.ans.append(self.path[:])
            return

        for i in range(0, len(self.nums)):
            if i in self.usedIdxSet:
                continue

            self.path.append(self.nums[i])
            self.usedIdxSet.add(i)
            self.backtrack()
            self.path.pop()
            self.usedIdxSet.remove(i)
