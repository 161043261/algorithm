#include <functional>
#include <stack>
#include <vector>

using namespace std;

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
  void inorder(TreeNode* root, vector<int>& ans) {
    if (!root) {
      return;
    }
    inorder(root->left, ans);
    ans.push_back(root->val);
    inorder(root->right, ans);
  }
  vector<int> inorderTraversal(TreeNode* root) {
    auto ans = vector<int>{};
    function<void(TreeNode*)> inOrder;
    inOrder = [&](TreeNode* node) {
      if (node == nullptr) {
        return;
      }
      inOrder(node->left);
      ans.push_back(node->val);
      inOrder(node->right);
    };
    inOrder(root);
    return ans;
  }

  vector<int> inorderTraversal2(TreeNode* root) {
    auto stk = stack<TreeNode*>{};
    auto ans = vector<int>{};
    auto cur = root;
    while (cur != nullptr || !stk.empty()) {
      if (cur != nullptr) {
        stk.push(cur);
        cur = cur->left;
      } else {
        cur = stk.top();
        stk.pop();
        ans.push_back(cur->val);
        cur = cur->right;
      }
    }
    return ans;
  }
};
