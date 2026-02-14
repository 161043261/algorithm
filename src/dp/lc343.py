from functools import cache


class Solution:
    def integerBreak(self, n: int) -> int:
        @cache
        def dfs(i: int) -> int:
            if i <= 1:
                return 1
            ret = 0
            for j in range(1, i):
                ret = max(ret, j * (i - j), j * dfs(i - j))
            return ret

        return dfs(n)
