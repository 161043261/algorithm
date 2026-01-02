#include <queue>
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
  vector<vector<int>> levelOrderBottom(TreeNode* root) {
    auto ans = vector<vector<int>>{};
    if (!root) {
      return ans;
    }

    auto q = queue<TreeNode*>{};
    q.push(root);
    while (!q.empty()) {
      auto sz = q.size();
      ans.push_back(vector<int>{});
      for (auto i = 0; i < sz; ++i) {
        auto node = q.front();
        q.pop();
        ans.back().push_back(node->val);
        if (node->left) {
          q.push(node->left);
        }
        if (node->right) {
          q.push(node->right);
        }
      }
    }
    reverse(ans.begin(), ans.end());
    return ans;
  }
};
