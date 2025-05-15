from math import sqrt, floor, inf

class Solution:
    def numSquares(self, n: int) -> int:
        dp: list[int] = [0] * (n + 1)
        for i in range(1, n+1):
            minN = inf
            jFloor = floor(sqrt(i))
            for j in range(1, jFloor + 1):
                minN = min(minN, dp[i - j*j])

            dp[i] = minN + 1
        return dp[n]

solution = Solution()
ret = solution.numSquares(12)
print(ret)
