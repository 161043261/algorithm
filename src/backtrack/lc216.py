from typing import List


class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        self.path: List[int] = []
        self.ans: List[List[int]] = []
        self.n: int = n
        self.k: int = k
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
