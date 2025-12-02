from typing import Dict, List


class Solution:
    def countTrapezoids(self, points: List[List[int]]) -> int:
        verticalDist2idxList: Dict[int, List[int]] = dict({})
        k2dist2idxList: Dict[float, Dict[float, List[int]]] = dict({})

        for i in range(len(points) - 1):
            for j in range(i + 1, len(points)):
                xi, yi = points[i]
                xj, yj = points[j]
                if xi == xj:
                    if xi not in verticalDist2idxList:
                        verticalDist2idxList[xi] = [i, j]
                    else:
                        verticalDist2idxList[xi].append(i)
                        verticalDist2idxList[xi].append(j)
                    continue
                k = (yj - yi) / (xj - xi)
                if k not in k2dist2idxList:
                    k2dist2idxList[k] = dict({})
                dist = ((xi * yj - xj * yi) ** 2) / ((xj - xi) ** 2 + (yj - yi) ** 2)
                if (xi * yj - xj * yi) * (xi - xj) < 0:
                    dist = -dist
                if dist not in k2dist2idxList[k]:
                    k2dist2idxList[k][dist] = [i, j]
                else:
                    k2dist2idxList[k][dist].append(i)
                    k2dist2idxList[k][dist].append(j)

        ans = 0
        s = 0
        for xi in verticalDist2idxList:
            l = len(verticalDist2idxList[xi])
            cnt = (l * (l - 1)) // 2
            ans += s * cnt
            s += cnt
        for k in k2dist2idxList:
            dist2idxList = k2dist2idxList[k]
            s = 0
            for dist in dist2idxList:
                l = len(dist2idxList[dist])
                cnt = (l * (l - 1)) // 2
                ans += s * cnt
                s += cnt
        return ans
