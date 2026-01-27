#include <functional>
#include <vector>

using namespace std;

class Solution {
 public:
  int maxProfit(vector<int>& prices) {
    auto memo = vector<vector<int>>(2, vector<int>(prices.size(), -1));
    function<int(bool buy, int day)> dfs;
    dfs = [&](bool buy, int day) -> int {
      if (day >= prices.size()) {
        return 0;
      }
      auto p = &memo[buy ? 1 : 0][day];
      if (*p != -1) {
        return *p;
      }
      if (buy) {
        auto res = prices[day] + dfs(false, day + 1);
        auto res2 = dfs(true, day + 1);
        *p = max(res, res2);
        return *p;
      }
      auto res = -prices[day] + dfs(true, day + 1);
      auto res2 = dfs(false, day + 1);
      *p = max(res, res2);
      return *p;
    };
    return dfs(0, 0);
  }
};
