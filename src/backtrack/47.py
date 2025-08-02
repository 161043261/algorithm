from typing import List, Set


class Solution:
    nums: List[int]
    path: List[int]
    ans: List[List[int]]
    branchIdxSet: Set[int]

    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        self.nums = nums
        self.path = []
        self.ans = []
        self.branchIdxSet = set()
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
