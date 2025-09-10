from typing import List


class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        self.path: List[int] = []
        self.ans: List[List[int]] = []
        self.n: int = n
        self.k: int = k
        self.backtrack(1)
        return self.ans

    def backtrack(self, cur: int) -> None:
        if len(self.path) == self.k:
            self.ans.append(self.path[:])
            return

        if cur > self.n:
            return

        self.backtrack(cur + 1)

        self.path.append(cur)
        self.backtrack(cur + 1)
        self.path.pop()
