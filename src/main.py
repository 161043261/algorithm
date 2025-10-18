class Solution:
    def findLexSmallestString(self, s: str, a: int, b: int) -> str:
        sset = set({})
        ans = s

        def trans(s: str) -> str:
            ret = ""
            for idx, chr in enumerate(s):
                if idx % 2 == 0:
                    ret += chr
                else:
                    nc = (int(chr) + a)
                    ret += str(nc % 10)
            return ret

        def trans2(s: str) -> str:
            b2 = b % len(s)
            return s[-b2:] + s[0:-b2]

        def dfs(curs: str) -> None:
            nonlocal ans

            if curs in sset:
                return
            sset.add(curs)
            if curs < ans:
                ans = curs
            dfs(trans(curs))
            dfs(trans2(curs))

        dfs(s)
        return ans
