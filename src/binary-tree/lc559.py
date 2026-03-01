from typing import List, Optional


class Node:
    def __init__(
        self, val: Optional[int] = None, children: Optional[List["Node"]] = None
    ):
        self.val = val
        self.children = children


class Solution:
    def maxDepth(self, root: "Node") -> int:
        if not root:
            return 0
        q: List[Node] = [root]
        q2: List[Node] = []
        depth = 0

        while len(q) > 0:
            depth += 1
            while len(q) > 0:
                head = q.pop(0)

                if head and head.children and len(head.children) > 0:
                    for child in head.children:
                        q2.append(child)

            q, q2 = q2, q
        return depth
