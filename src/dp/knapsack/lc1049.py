from typing import List


class Solution:
    def lastStoneWeightII(self, stones: List[int]) -> int:
        cap = sum(stones) // 2
        f = [[0 for _ in range(cap + 1)] for _ in range(len(stones) + 1)]
        for i in range(1, len(stones) + 1):  # for range items
            for j in range(0, cap + 1):  # for range capacity
                f[i][j] = max(
                    f[i - 1][j],
                    (
                        f[i - 1][j - stones[i - 1]] + stones[i - 1]
                        if j >= stones[i - 1]
                        else 0
                    ),
                )

        return sum(stones) - 2 * f[len(stones)][cap]
