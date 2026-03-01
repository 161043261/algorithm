from typing import Dict


class Solution:
    def minWindow(self, s: str, t: str) -> str:
        tChr2cnt: Dict[str, int] = {}
        for chr in t:
            tChr2cnt[chr] = tChr2cnt.get(chr, 0) + 1
        wndChr2cnt: Dict[str, int] = {}

        def biggerThan() -> bool:
            for chr, cnt in tChr2cnt.items():
                if wndChr2cnt.get(chr, 0) < cnt:
                    return False
            return True

        ansL, ansR = -1, len(s)
        left = 0
        for right, chr in enumerate(s):
            wndChr2cnt[chr] = wndChr2cnt.get(chr, 0) + 1
            while biggerThan() and left <= right:
                if right - left < ansR - ansL:
                    ansL, ansR = left, right
                wndChr2cnt[s[left]] -= 1
                left += 1
        if ansL < 0:
            return ""
        return s[ansL : ansR + 1]
