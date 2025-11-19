from typing import List, Optional


class Node:
    def __init__(
        self, val: Optional[int] = None, children: Optional[List["Node"]] = None
    ):
        self.val = val
        self.children = children


class Solution:
    def levelOrder(self, root: "Node") -> List[List[int]]:
        if not root:
            return []

        ans: List[List[int]] = []
        q: List["Node"] = [root]
        while q:
            levelSize = len(q)
            levelVals: List[int] = []
            for _ in range(levelSize):
                node = q.pop(0)
                levelVals.append(node.val or 0)
                if node.children:
                    q.extend(node.children)
            ans.append(levelVals)

        return ans
