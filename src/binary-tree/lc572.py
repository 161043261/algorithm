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
    def check(self, node: Optional[TreeNode], subNode: Optional[TreeNode]) -> bool:
        if node is None and subNode is None:
            return True

        if (node is None) or (subNode is None) or (node.val != subNode.val):
            return False

        return self.check(node.left, subNode.left) and self.check(
            node.right, subNode.right
        )

    def dfs(self, node: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        if node is None:
            return False

        return (
            self.check(node, subRoot)
            or self.dfs(node.left, subRoot)
            or self.dfs(node.right, subRoot)
        )

    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        return self.dfs(root, subRoot)
