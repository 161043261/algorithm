from typing import Dict, List


class Solution:
    num2chr: Dict[int, List[str]] = dict(
        {
            2: ["a", "b", "c"],
            3: ["d", "e", "f"],
            4: ["g", "h", "i"],
            5: ["j", "k", "l"],
            6: ["m", "n", "o"],
            7: ["p", "q", "r", "s"],
            8: ["t", "u", "v"],
            9: ["w", "x", "y", "z"],
        }
    )

    def letterCombinations(self, digits: str) -> List[str]:
        if len(digits) == 0:
            return []

        self.path: List[str] = []
        self.ans: List[str] = []
        self.digits: str = digits
        self.backtrack(0)

        return self.ans

    def backtrack(self, idx: int) -> None:
        if idx == len(self.digits):
            self.ans.append("".join(self.path))
            return

        for i in self.num2chr[int(self.digits[idx])]:
            self.path.append(i)
            self.backtrack(idx + 1)
            self.path.pop()
