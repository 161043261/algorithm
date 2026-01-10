#include <functional>
#include <vector>

using namespace std;

class Solution {
 public:
  int rob(vector<int>& nums) {
    if (nums.size() == 1) {
      return nums[0];
    }
    if (nums.size() == 2) {
      return max(nums[0], nums[1]);
    }
    auto rob2 = [&](vector<int>& nums) -> int {
      auto memo = vector<int>(nums.size(), -1);
      function<int(int)> dfs;
      dfs = [&](int idx) -> int {
        if (idx < 0) {
          return 0;
        }
        auto p = &memo[idx];
        if (*p != -1) {
          return *p;
        }
        auto res = max(dfs(idx - 1), nums[idx] + dfs(idx - 2));
        *p = res;
        return res;
      };
      return dfs(nums.size() - 1);
    };
    auto nums1 = vector<int>(nums.begin() + 2, nums.end() - 1);
    auto nums2 = vector<int>(nums.begin() + 1, nums.end());

    return max(nums[0] + rob2(nums1), rob2(nums2));
  }
};
