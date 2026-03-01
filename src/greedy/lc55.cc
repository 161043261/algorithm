#include <functional>
#include <vector>

using namespace std;

class Solution {
 public:
  bool canJump(vector<int>& nums) {
    auto memo = vector<int>(nums.size(), 0);
    function<bool(int pos)> dfs;
    dfs = [&](int pos) -> bool {
      if (pos == nums.size() - 1) {
        return true;
      }
      if (pos >= nums.size()) {
        return false;
      }
      if (memo[pos] != 0) {
        return memo[pos] == 1;
      }
      for (auto i = 1; i <= nums[pos]; i++) {
        auto res = dfs(pos + i);
        if (res) {
          memo[pos] = 1;
          return true;
        }
      }
      memo[pos] = -1;
      return false;
    };
    return dfs(0);
  }
};
