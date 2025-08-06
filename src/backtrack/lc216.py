from typing import List


class Solution:
    path: List[int]
    ans: List[List[int]]
    n: int
    k: int

    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        self.path = []
        self.ans = []
        self.n = n
        self.k = k
        self.backtrack(1, 0)
        return self.ans

    def backtrack(self, cur: int, sum: int) -> None:
        if sum >= self.n:
            if sum == self.n and len(self.path) == self.k:
                self.ans.append(self.path[:])
            return

        if cur > 9 or len(self.path) > self.k:
            return

        self.backtrack(cur + 1, sum)
        self.path.append(cur)
        self.backtrack(cur + 1, sum + cur)
        self.path.pop()


ans = Solution().combinationSum3(k=3, n=7)
print(ans)
