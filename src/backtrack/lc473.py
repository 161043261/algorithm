from typing import List, Tuple
from functools import cache


class Solution:
    def makesquare(self, matchsticks: List[int]) -> bool:
        mSum = sum(matchsticks)
        if mSum % 4 != 0:
            return False
        cap = mSum // 4
        matchsticks.sort(reverse=True)
        edges = [0] * 4  # [0, 0, 0, 0]

        def dfs(idx: int) -> bool:
            if idx == len(matchsticks):
                return True
            for i in range(4):
                edges[i] += matchsticks[idx]
                if edges[i] <= cap and dfs(idx + 1):
                    return True
                edges[i] -= matchsticks[idx]
            return False

        return dfs(0)

    # Error
    def makesquareWithCache(self, matchsticks: List[int]) -> bool:
        mSum = sum(matchsticks)
        if mSum % 4 != 0:
            return False
        cap = mSum // 4
        matchsticks.sort(reverse=True)
        edges = [0] * 4  # [0, 0, 0, 0]

        @cache
        def dfs(idx: int) -> bool:
            if idx == len(matchsticks):
                return True
            for i in range(4):
                edges[i] += matchsticks[idx]
                if edges[i] <= cap and dfs(idx + 1):
                    return True
                edges[i] -= matchsticks[idx]
            return False

        return dfs(0)

    def makesquareWithCacheV2(self, matchsticks: List[int]) -> bool:
        mSum = sum(matchsticks)
        if mSum % 4 != 0:
            return False
        cap = mSum // 4
        matchsticks.sort(reverse=True)

        @cache
        def dfs(idx: int, edges: Tuple[int, int, int, int]) -> bool:
            if idx == len(matchsticks):
                return True
            edgesArr = list[int](edges)
            for i in range(4):
                edgesArr[i] += matchsticks[idx]
                if edgesArr[i] <= cap and dfs(idx + 1, tuple(edgesArr)):
                    return True
                edgesArr[i] -= matchsticks[idx]
            return False

        return dfs(0, (0, 0, 0, 0))


_ = Solution()
ans = _.makesquare([5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3])
print(ans)  # print True

ans2 = _.makesquareWithCache([5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3])
print(ans2)  # print False

ans2 = _.makesquareWithCacheV2([5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3])
print(ans2)  # print True
