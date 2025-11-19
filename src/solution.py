from typing import List


class Solution:
    def findFinalValue(self, nums: List[int], original: int) -> int:
        found = True

        while found:
            found = False
            for num in nums:
                if num == original:
                    found = True
                    original *= 2
                    break
            if not found:
                break

        return original
