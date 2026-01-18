#include <algorithm>
#include <functional>
#include <unordered_map>
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

using namespace std;

class Solution {
 public:
  int rob(TreeNode* root) {
    auto parentIdxs = vector<int>();
    auto trueMap = unordered_map<TreeNode*, int>();
    auto falseMap = unordered_map<TreeNode*, int>();
    function<int(TreeNode * cur, bool useParent)> dfs;
    dfs = [&](TreeNode* cur, bool useParent) -> int {
      if (cur == nullptr) {
        return 0;
      }
      if (useParent) {
        if (trueMap.find(cur) != trueMap.end()) {
          return trueMap[cur];
        }
        auto res = dfs(cur->left, false) + dfs(cur->right, false);
        trueMap[cur] = res;
        return res;
      } else {
        if (falseMap.find(cur) != falseMap.end()) {
          return falseMap[cur];
        }
        auto res = max(cur->val + dfs(cur->left, true) + dfs(cur->right, true),
                       dfs(cur->left, false) + dfs(cur->right, false));
        falseMap[cur] = res;
        return res;
      };
    };
    return dfs(root, false);
  }
};
