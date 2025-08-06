from typing import List, Set


class Solution:
    path: List[int]
    ans: List[List[int]]
    nums: List[int]

    def findSubsequences(self, nums: List[int]) -> List[List[int]]:
        self.nums = nums
        self.path = []
        self.ans = []
        self.backtrack(0)

        return self.ans

    def backtrack(self, idx: int) -> None:
        if len(self.path) > 1:
            self.ans.append(self.path[:])

        if idx >= len(self.nums):
            return

        # 对比 46 的 usedNums
        usedNums: Set[int] = set()
        for i in range(idx, len(self.nums)):
            if (len(self.path) > 0 and (self.path[-1] > self.nums[i])) or (
                self.nums[i] in usedNums
            ):
                continue

            self.path.append(self.nums[i])
            usedNums.add(self.nums[i])
            self.backtrack(i + 1)
            self.path.pop()
            # usedNums.remove(self.nums[i])
