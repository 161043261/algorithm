class TreeNode:
    def __init__(self, x: int):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def __init__(self) -> None:
        self.ans: int = 0

    def maxSum(self, root: TreeNode) -> int:
        if root.left is None and root.right is None:
            return max(0, root.val)

        if root.left is not None:
            leftSum = self.maxSum(root.left)
            return max(0, root.val, root.val + leftSum)

        if root.right is not None:
            rightSum = self.maxSum(root.right)
            return max(0, root.val, root.val + rightSum)

        return 0
