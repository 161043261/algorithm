from typing import Dict, List, Tuple
from math import inf


class Solution:
    def countTrapezoids(self, points: List[List[int]]) -> int:
        # def getM(i: int, j: int) -> str:
        #     xi, yi = points[i]
        #     xj, yj = points[j]
        #     mx = xi + xj
        #     my = yi + yj
        #     return f"{mx},{my}"

        k2b2cnt: Dict[float, Dict[float, int]] = dict({})
        # m2k2cnt: Dict[str, Dict[float, int]] = dict({})
        m2k2cnt: Dict[Tuple[int, int], Dict[float, int]] = dict({})

        for i in range(len(points) - 1):
            for j in range(i + 1, len(points)):
                xi, yi = points[i]
                xj, yj = points[j]
                dx = xj - xi
                dy = yj - yi
                k = dy / dx if dx else inf
                b = (xj * yi - xi * yj) / (xj - xi) if dx else xi
                # m = getM(i, j)
                m = tuple[int, int]((xi + xj, yi + yj))

                if k not in k2b2cnt:
                    k2b2cnt[k] = dict({})
                if b not in k2b2cnt[k]:
                    k2b2cnt[k][b] = 1
                else:
                    k2b2cnt[k][b] += 1

                if m not in m2k2cnt:
                    m2k2cnt[m] = dict({})
                if k not in m2k2cnt[m]:
                    m2k2cnt[m][k] = 1
                else:
                    m2k2cnt[m][k] += 1

        ans = 0
        for k in k2b2cnt:
            dist2cnt = k2b2cnt[k]
            s = 0
            for dist in dist2cnt:
                cnt = dist2cnt[dist]
                ans += s * cnt
                s += cnt

        for m in m2k2cnt:
            k2cnt = m2k2cnt[m]
            s = 0
            for k in k2cnt:
                cnt = k2cnt[k]
                ans -= s * cnt
                s += cnt
        return ans
