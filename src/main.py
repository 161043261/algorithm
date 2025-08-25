from typing import List


class Solution:
    def backspaceCompare(self, s: str, t: str) -> bool:
        def build(s: str) -> str:
            ret: List[str] = []
            for chr in s:
                if chr != "#":
                    ret.append(chr)
                else:
                    ret.pop()
            return "".join(ret)

        return build(s) == build(t)
