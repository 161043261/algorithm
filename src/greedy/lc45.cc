#include <functional>
#include <vector>

using namespace std;

class Solution {
 public:
  int jump(vector<int>& nums) {
    auto memo = vector<int>(nums.size(), 0);
    function<int(int pos)> dfs;
    dfs = [&](int pos) -> int {
      if (pos == nums.size() - 1) {
        return 0;
      }
      if (pos >= nums.size()) {
        return int(nums.size());  // Invalid
      }
      if (memo[pos] != 0) {
        return memo[pos];
      }
      auto res = int(nums.size());
      for (auto i = 1; i <= nums[pos]; i++) {
        auto res2 = 1 + dfs(pos + i);
        res = min(res, res2);
      }
      memo[pos] = res;
      return res;
    };
    return dfs(0);
  }
};
