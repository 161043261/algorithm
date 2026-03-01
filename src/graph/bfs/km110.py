from typing import Dict, List, Set


strListLen = int(input().strip())

beginStr, endStr = input().strip().split(" ")

strList: List[str] = ["" for _ in range(strListLen)]

for i in range(strListLen):
    strList[i] = input().strip()


def diffCnt(a: str, b: str) -> int:
    ret = 0
    for i in range(len(a)):
        if a[i] != b[i]:
            ret += 1

    return ret


# str => visited
str2visited: Dict[str, bool] = dict()  # also {}
str2visited[beginStr] = False
str2visited[endStr] = False

for item in strList:
    str2visited[item] = False

# str => diff1 set
str2diff1set: Dict[str, Set[str]] = dict()  # also {}


for i in range(strListLen):
    for item in [beginStr, endStr]:
        if diffCnt(item, strList[i]) == 1:
            if item in str2diff1set:
                str2diff1set[item].add(strList[i])
            else:
                str2diff1set[item] = set({strList[i]})

            if strList[i] in str2diff1set:
                str2diff1set[strList[i]].add(item)
            else:
                str2diff1set[strList[i]] = set({item})

    for j in range(i + 1, strListLen):
        if diffCnt(strList[i], strList[j]) == 1:
            if strList[i] in str2diff1set:
                str2diff1set[strList[i]].add(strList[j])
            else:
                str2diff1set[strList[i]] = set({strList[j]})

            if strList[j] in str2diff1set:
                str2diff1set[strList[j]].add(strList[i])
            else:
                str2diff1set[strList[j]] = set({strList[i]})

ans = 0


def bfs() -> None:
    global ans

    queue: List[str] = []
    newItemSet: Set[str] = set()

    queue.append(beginStr)
    str2visited[beginStr] = True

    while len(queue) > 0:
        ans += 1
        if ans == 2 + strListLen:
            break

        while len(queue) > 0:
            head = queue.pop()
            if head == endStr:
                print(ans)
                exit(0)
            children = str2diff1set[head]

            for item in children:
                if not str2visited[item]:
                    newItemSet.add(item)
                    str2visited[item] = True

        queue = list(newItemSet)
        newItemSet.clear()


bfs()
print(0 if ans == 2 + strListLen else ans)
