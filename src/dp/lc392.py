from functools import cache


class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        @cache
        def dfs(sIdx: int, tIdx: int) -> bool:
            if sIdx >= len(s):
                return True
            if tIdx >= len(t):
                return False
            if s[sIdx] == t[tIdx]:
                return dfs(sIdx + 1, tIdx + 1)
            else:
                return dfs(sIdx, tIdx + 1)

        return dfs(0, 0)
