struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode() : val(0), left(nullptr), right(nullptr) {}
  TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
  TreeNode(int x, TreeNode* left, TreeNode* right)
      : val(x), left(left), right(right) {}
};

class Solution {
 public:
  int targetSum;
  bool hasPathSum(TreeNode* root, int targetSum) {
    this->targetSum = targetSum;
    return dfs(root, 0);
  }

  bool dfs(TreeNode* node, int sum) {
    if (node == nullptr) {
      return false;
    }
    if (node->left == nullptr && node->right == nullptr) {
      return sum + node->val == targetSum;
    }
    return dfs(node->left, sum + node->val) ||
           dfs(node->right, sum + node->val);
  }
};
