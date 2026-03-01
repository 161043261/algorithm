#include <functional>
#include <iostream>
#include <vector>

// Dynamic Programming

using namespace std;

class Solution {
 public:
  int wiggleMaxLength(vector<int>& nums) {
    auto memo = vector<vector<vector<int>>>(
        2, vector<vector<int>>(1000, vector<int>(1003, -1)));
    function<int(int preVal, int curIdx, bool asc)> dfs;
    dfs = [&](int preVal, int curIdx, bool asc) -> int {
      if (curIdx >= nums.size()) {
        return 0;
      }
      auto p = &memo[asc ? 1 : 0][curIdx][preVal + 1];
      if (*p != -1) {
        return *p;
      }
      if (asc && nums[curIdx] > preVal) {
        auto res = dfs(preVal, curIdx + 1, true);
        auto res2 = 1 + dfs(nums[curIdx], curIdx + 1, false);
        *p = max(res, res2);
        return *p;
      }
      if (!asc && nums[curIdx] < preVal) {
        auto res = dfs(preVal, curIdx + 1, false);
        auto res2 = 1 + dfs(nums[curIdx], curIdx + 1, true);
        *p = max(res, res2);
        return *p;
      }
      auto res = dfs(preVal, curIdx + 1, asc);
      *p = res;
      return res;
    };
    auto ans = dfs(-1, 0, true);
    auto ans2 = dfs(1001, 0, false);
    return max(ans, ans2);
  }
};

int main() {
  auto nums = vector<int>{1, 7, 4, 9, 2, 5};
  auto ans = Solution{}.wiggleMaxLength(nums);
  cout << ans << endl;
}
