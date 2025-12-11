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
    def countNodes(self, root: Optional[TreeNode]) -> int:
        lh, rh = 0, 0
        lNode, rNode = root, root

        while lNode is not None:
            lNode = lNode.left
            lh += 1

        while rNode is not None:
            rNode = rNode.right
            rh += 1

        if lh == rh:
            return self.countNodesFull(root)

        else:
            return self.countNodesNormal(root)

    # Normal tree
    def countNodesNormal(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0
        return 1 + self.countNodesNormal(root.left) + self.countNodesNormal(root.right)

    # Full tree
    def countNodesFull(self, root: Optional[TreeNode]) -> int:
        h = 0
        while root is not None:
            root = root.left
            h += 1

        return int(pow(2, h)) - 1
