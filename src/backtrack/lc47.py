from typing import List, Set


class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        self.nums: List[int] = nums
        self.path: List[int] = []
        self.ans: List[List[int]] = []
        self.branchIdxSet: Set[int] = set()
        self.backtrack()

        return self.ans

    def backtrack(self) -> None:
        if len(self.path) == len(self.nums):
            self.ans.append(self.path[:])
            return

        levelValSet: Set[int] = set()

        for i in range(0, len(self.nums)):
            if i in self.branchIdxSet or self.nums[i] in levelValSet:
                continue

            self.path.append(self.nums[i])
            self.branchIdxSet.add(i)
            levelValSet.add(self.nums[i])
            self.backtrack()
            self.path.pop()
            self.branchIdxSet.remove(i)
