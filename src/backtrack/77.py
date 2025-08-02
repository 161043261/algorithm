from typing import List


class Solution:
    path: List[int]
    ans: List[List[int]]
    n: int
    k: int

    def combine(self, n: int, k: int) -> List[List[int]]:
        self.path = []
        self.ans = []
        self.n = n
        self.k = k
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
