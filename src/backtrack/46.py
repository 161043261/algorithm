from typing import List, Set


class Solution:
    path: List[int]
    ans: List[List[int]]
    nums: List[int]
    # 对比 491 的 usedNums
    usedIdxSet: Set[int]

    def permute(self, nums: List[int]) -> List[List[int]]:
        self.path = []
        self.ans = []
        self.nums = nums
        self.usedIdxSet = set()
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
