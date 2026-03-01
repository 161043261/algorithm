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
  vector<int> postorderTraversal(TreeNode* root) {
    auto ans = vector<int>{};
    function<void(TreeNode*)> postOrder;
    postOrder = [&](TreeNode* node) {
      if (node == nullptr) {
        return;
      }
      postOrder(node->left);
      postOrder(node->right);
      ans.push_back(node->val);
    };
    postOrder(root);
    return ans;
  }

  vector<int> postorderTraversal2(TreeNode* root) {
    auto stk = stack<TreeNode*>{};
    auto ans = vector<int>{};
    if (root == nullptr) {
      return ans;
    }
    stk.push(root);
    while (!stk.empty()) {
      auto node = stk.top();
      stk.pop();
      ans.push_back(node->val);
      if (node->left) {
        stk.push(node->left);
      }
      if (node->right) {
        stk.push(node->right);
      }
    }
    reverse(ans.begin(), ans.end());
    return ans;
  }
};
