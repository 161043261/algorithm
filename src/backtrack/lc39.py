from typing import List


class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        self.path: List[int] = []
        self.ans: List[List[int]] = []
        self.candidates: List[int] = candidates
        self.target: int = target
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
