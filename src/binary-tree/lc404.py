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
    def sumOfLeftLeaves(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0

        ans = 0

        def preOrder(node: TreeNode):
            nonlocal ans

            if node.left:
                if node.left.left is None and node.left.right is None:
                    ans += node.left.val
                preOrder(node.left)
            if node.right:
                preOrder(node.right)

        preOrder(root)

        return ans
