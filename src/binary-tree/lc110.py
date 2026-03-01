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
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        def treeHeight(node: Optional["TreeNode"]) -> int:
            if node is None:
                return 0

            return max(treeHeight(node.left), treeHeight(node.right)) + 1

        if root is None:
            return True

        return (
            abs(treeHeight(root.left) - treeHeight(root.right)) <= 1
            and self.isBalanced(root.left)
            and self.isBalanced(root.right)
        )
