from typing import List, Optional


class TreeNode:
    def __init__(
        self,
        val: int = 0,
        left: Optional["TreeNode"] = None,
        right: Optional["TreeNode"] = None,
    ):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def largestValues(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []

        ans: List[int] = []
        q: List[TreeNode] = [root]
        while q:
            levelSize = len(q)
            maxVal = float("-inf")
            for _ in range(levelSize):
                node = q.pop(0)
                maxVal = max(maxVal, node.val)
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
            ans.append(int(maxVal))

        return ans
