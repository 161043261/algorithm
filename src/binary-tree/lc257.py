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
    def binaryTreePaths(self, root: Optional[TreeNode]) -> List[str]:
        if root is None:
            return []

        ans: List[str] = []

        def dfs(node: TreeNode, path: List[str]):
            if node.left is None and node.right is None:
                ans.append("->".join(path))
                return

            if node.left is not None:
                path.append(str(node.left.val))
                dfs(node.left, path)
                path.pop()

            if node.right is not None:
                path.append(str(node.right.val))
                dfs(node.right, path)
                path.pop()

        dfs(root, [str(root.val)])

        return ans
