from collections import Counter


class Solution:
    def nextBeautifulNumber(self, n: int) -> int:
        for i in range(n + 1, 1224445):
            numChr2cnt = Counter(str(i))
            if all(numChr2cnt[numChr] == int(numChr) for numChr in numChr2cnt):
                return i
        return 0
