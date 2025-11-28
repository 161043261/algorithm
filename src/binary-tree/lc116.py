from typing import Optional


class Node:
    def __init__(
        self,
        val: int = 0,
        left: Optional["Node"] = None,
        right: Optional["Node"] = None,
        next: Optional["Node"] = None,
    ):
        self.val = val
        self.left = left
        self.right = right
        self.next = next


class Solution:
    def connect(self, root: "Optional[Node]") -> "Optional[Node]":
        if not root:
            return None
        level = [root]
        while level:
            levelSize = len(level)
            for i in range(levelSize):
                node = level.pop(0)
                if i < levelSize - 1:
                    node.next = level[0]
                if node.left:
                    level.append(node.left)
                if node.right:
                    level.append(node.right)
        return root
