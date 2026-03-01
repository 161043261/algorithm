from typing import List


class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        self.candidates: List[int] = candidates
        self.target: int = target
        self.path: List[int] = []
        self.ans: List[List[int]] = []
        self.backtrack(0, 0)

        return self.ans

    def backtrack(self, idx: int, sum: int) -> None:
        if sum >= self.target:
            if sum == self.target:
                self.ans.append(self.path[:])
            return

        if idx >= len(self.candidates):
            return

        for i in range(idx, len(self.candidates)):
            if i > idx and self.candidates[i] == self.candidates[i - 1]:
                continue

            self.path.append(self.candidates[i])
            self.backtrack(i + 1, sum + self.candidates[i])
            self.path.pop()
