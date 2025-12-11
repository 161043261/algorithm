from typing import Optional


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
    def findBottomLeftValue(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0

        curHeight = 0
        curVal = 0

        def dfs(root: TreeNode, height: int):
            nonlocal curHeight, curVal
            height += 1
            if root.left is not None:
                dfs(root.left, height)
            if root.right is not None:
                dfs(root.right, height)
            if height > curHeight:
                curHeight = height
                curVal = root.val

        dfs(root, 0)
        return curVal
