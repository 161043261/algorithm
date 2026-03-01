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
  vector<double> averageOfLevels(TreeNode* root) {
    auto ans = vector<double>{};
    if (!root) {
      return ans;
    }

    auto q = queue<TreeNode*>{};
    q.push(root);
    while (!q.empty()) {
      auto sz = q.size();
      auto sum = 0.;
      for (auto i = 0; i < sz; ++i) {
        auto node = q.front();
        q.pop();
        sum += node->val;
        if (i == sz - 1) {
          ans.push_back(sum / sz);
        }
        if (node->left) {
          q.push(node->left);
        }
        if (node->right) {
          q.push(node->right);
        }
      }
    }
    return ans;
  }
};
