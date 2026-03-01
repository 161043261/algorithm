from typing import Dict, List
from collections import defaultdict


class Solution:
    def maxFrequency(self, nums: List[int], k: int, numOperations: int) -> int:
        num2cnt: defaultdict[int, int] = defaultdict(int)
        val2diff: defaultdict[int, int] = defaultdict(int)

        for num in nums:
            num2cnt[num] += 1
            val2diff[num]
            val2diff[num - k] += 1
            val2diff[num + k + 1] -= 1

        ans = sumDiff = 0
        for val, diff in sorted(val2diff.items()):
            sumDiff += diff
            ans = max(ans, min(sumDiff, num2cnt[val] + numOperations))
        return ans

    def maxFrequency2(self, nums: List[int], k: int, numOperations: int) -> int:
        num2cnt: Dict[int, int] = dict({})
        val2diff: Dict[int, int] = dict({})

        for num in nums:
            # if num in num2cnt:
            #     num2cnt[num] += 1
            # else:
            #     num2cnt[num] = 1
            num2cnt[num] = num2cnt.get(num, 0) + 1

            if num not in val2diff:
                val2diff[num] = 0

            # if num - k in val2diff:
            #     val2diff[num - k] += 1
            # else:
            #     val2diff[num - k] = 1
            val2diff[num - k] = val2diff.get(num - k, 0) + 1

            # if num + k + 1 in val2diff:
            #     val2diff[num + k + 1] -= 1
            # else:
            #     val2diff[num + k + 1] = -1
            val2diff[num + k + 1] = val2diff.get(num + k + 1, 0) - 1

        ans = sumDiff = 0
        for val, diff in sorted(val2diff.items()):
            sumDiff += diff
            ans = max(
                ans,
                min(sumDiff, num2cnt.get(val, 0) + numOperations),
            )
        return ans
