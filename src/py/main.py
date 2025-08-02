from typing import List


class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        ans: List[List[int]] = [[] for _ in range(numRows)]
        for i in range(0, numRows):
            # ans[i] = [i for _ in range(i + 1)]
            ans[i] = [0] * (i + 1)
            if i == 0:
                ans[i][0] = 1
                continue
            ans[i][0] = ans[i - 1][0]
            ans[i][-1] = ans[i - 1][-1]
            for j in range(1, len(ans[i - 1])):
                ans[i][j] = ans[i - 1][j - 1] + ans[i - 1][j]

        return ans
