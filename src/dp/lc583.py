from functools import cache


class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        @cache
        def dfs(idx1: int, idx2: int) -> int:
            if idx1 < 0:
                return idx2 + 1
            if idx2 < 0:
                return idx1 + 1
            if word1[idx1] == word2[idx2]:
                return dfs(idx1 - 1, idx2 - 1)
            else:
                return 1 + min(dfs(idx1 - 1, idx2), dfs(idx1, idx2 - 1))

        return dfs(len(word1) - 1, len(word2) - 1)
