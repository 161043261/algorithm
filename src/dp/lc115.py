from functools import cache


class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        @cache
        def dfs(sIdx: int, tIdx: int) -> int:
            if sIdx < tIdx:
                return 0
            if tIdx < 0:
                return 1
            if s[sIdx] == t[tIdx]:
                res = dfs(sIdx - 1, tIdx) + dfs(sIdx - 1, tIdx - 1)
            else:
                res = dfs(sIdx - 1, tIdx)
            return res

        return dfs(len(s) - 1, len(t) - 1)
