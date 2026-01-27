from typing import List
from functools import cache


class Solution:
    def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
        @cache
        def dfs(idx: int, cnt0: int, cnt1: int) -> int:
            if idx >= len(strs):
                return 0
            cnt0I, cnt1I = 0, 0
            for chr in strs[idx]:
                if chr == "0":
                    cnt0I += 1
                else:
                    cnt1I += 1
            if cnt0 < cnt0I or cnt1 < cnt1I:
                return 0
            return max(
                1 + dfs(idx + 1, cnt0 - cnt0I, cnt1 - cnt1I), dfs(idx + 1, cnt0, cnt1)
            )

        return dfs(0, m, n)

    def findMaxFormV2(self, strs: List[str], m: int, n: int) -> int:
        cnt0s = [s.count("0") for s in strs]

        @cache
        def dfs(idx: int, cnt0: int, cnt1: int) -> int:
            if idx < 0:
                return 0
            res = dfs(idx - 1, cnt0, cnt1)
            cnt0I, cnt1I = cnt0s[idx], len(strs[idx]) - cnt0s[idx]
            if cnt0 >= cnt0I and cnt1 >= cnt1I:
                res = max(res, 1 + dfs(idx - 1, cnt0 - cnt0I, cnt1 - cnt1I))
            return res

        return dfs(len(strs) - 1, m, n)

    def findMaxFormV3(self, strs: List[str], m: int, n: int) -> int:
        cnt0s = [s.count("0") for s in strs]
        f = [[[0] * (n + 1) for _ in range(m + 1)] for _ in range(len(strs) + 1)]

        for idx in range(1, len(strs) + 1):
            for cnt0 in range(m + 1):
                for cnt1 in range(n + 1):
                    cnt0I = cnt0s[idx - 1]
                    cnt1I = len(strs[idx - 1]) - cnt0I
                    if cnt0 >= cnt0I and cnt1 >= cnt1I:
                        f[idx][cnt0][cnt1] = max(
                            f[idx - 1][cnt0][cnt1],
                            1 + f[idx - 1][cnt0 - cnt0I][cnt1 - cnt1I],
                        )
                    else:
                        f[idx][cnt0][cnt1] = f[idx - 1][cnt0][cnt1]
        return f[len(strs)][m][n]
