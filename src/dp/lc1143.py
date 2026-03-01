from functools import cache


class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        @cache
        def dfs(idx1: int, idx2: int) -> int:
            if idx1 < 0 or idx2 < 0:
                return 0

            if text1[idx1] != text2[idx2]:
                return max(dfs(idx1 - 1, idx2), dfs(idx1, idx2 - 1))
            else:
                return 1 + dfs(idx1 - 1, idx2 - 1)

        return dfs(len(text1) - 1, len(text2) - 1)

    def longestCommonSubsequenceV2(self, text1: str, text2: str) -> int:
        @cache
        def dfs(idx1: int, idx2: int) -> int:
            if idx1 >= len(text1) or idx2 >= len(text2):
                return 0

            if text1[idx1] != text2[idx2]:
                return max(dfs(idx1 + 1, idx2), dfs(idx1, idx2 + 1))
            else:
                return 1 + dfs(idx1 + 1, idx2 + 1)

        return dfs(0, 0)
