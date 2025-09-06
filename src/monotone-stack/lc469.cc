#include <stack>
#include <unordered_map>
#include <vector>

using namespace std;

// 使用 unordered_set
class Solution {
 public:
  vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
    auto num2ToNextGreater = unordered_map<int, int>{};

    auto idxStack = stack<int>{};

    for (auto i = 0; i < nums2.size(); i++) {
      // Set initial value
      num2ToNextGreater[nums2[i]] = -1;

      if (idxStack.empty() || nums2[idxStack.top()] >= nums2[i]) {
        idxStack.push(i);
        continue;
      }

      // !idxStack.empty() && nums[idxStack.top()] < nums2[i]
      while (!idxStack.empty() && nums2[idxStack.top()] < nums2[i]) {
        auto idx = idxStack.top();
        idxStack.pop();
        num2ToNextGreater[nums2[idx]] = nums2[i];
      }

      idxStack.push(i);
    }

    auto ans = vector<int>(nums1.size());
    for (auto i = 0; i < nums1.size(); i++) {
      ans[i] = num2ToNextGreater[nums1[i]];
    }

    return ans;
  };
};
