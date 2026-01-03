#include <functional>
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
  TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
    function<TreeNode*(vector<int> & inorder, vector<int> & postorder)> f;

    f = [&](vector<int>& inorder, vector<int>& postorder) -> TreeNode* {
      if (inorder.size() == 0) {
        return nullptr;
      }
      auto nodeVal = postorder[postorder.size() - 1];
      auto div = 0;
      for (; inorder[div] != nodeVal; div++);
      auto leftSize = div;
      auto rightSize = inorder.size() - 1 - leftSize;
      auto lInorder = vector<int>(inorder.begin(), inorder.begin() + leftSize);
      auto rInorder = vector<int>(inorder.end() - rightSize, inorder.end());
      auto lPostorder =
          vector<int>(postorder.begin(), postorder.begin() + leftSize);
      auto rPostorder = vector<int>(postorder.begin() + leftSize,
                                    postorder.begin() + leftSize + rightSize);
      auto leftNode = f(lInorder, lPostorder);
      auto rightNode = f(rInorder, rPostorder);
      auto node = new TreeNode(nodeVal, leftNode, rightNode);
      return node;
    };

    return f(inorder, postorder);
  }
};
