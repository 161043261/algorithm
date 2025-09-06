from typing import List


class Solution:
    path: List[int]
    ans: List[List[int]]
    candidates: List[int]
    target: int

    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        self.path = []
        self.ans = []
        self.candidates = candidates
        self.target = target
        self.backtrack(0, 0)

        return self.ans

    def backtrack(self, idx: int, sum: int) -> None:
        if sum > self.target:
            return

        if sum == self.target:
            self.ans.append(self.path[:])
            return

        for i in range(idx, len(self.candidates)):
            self.path.append(self.candidates[i])
            self.backtrack(i, sum + self.candidates[i])
            self.path.pop()


solution = Solution()
ans = solution.combinationSum([2, 3], 6)
print(ans)
