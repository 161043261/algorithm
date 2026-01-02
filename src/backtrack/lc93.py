from typing import List


class Solution:
    def restoreIpAddresses(self, s: str) -> List[str]:
        self.ans: List[str] = []
        self.path: List[str] = []
        self.s: str = s
        self.backtrack(0)
        return self.ans

    def backtrack(self, idx: int) -> None:
        if idx >= len(self.s):
            if len(self.path) == 4:
                self.ans.append(".".join(self.path))
            return

        if len(self.path) == 4:
            return

        for i in range(idx + 1, len(self.s) + 1):
            substr = self.s[idx:i]
            num = int(substr)

            if (len(substr) > 1 and substr.startswith("0")) or (num > 255):
                break
            self.path.append(substr)
            self.backtrack(i)
            self.path.pop()
