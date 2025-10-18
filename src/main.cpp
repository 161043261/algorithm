#include <array>
#include <climits>
#include <functional>
#include <vector>

using namespace std;

class Solution {
 public:
  int maxProfit(int k, vector<int>& prices) {
    auto n = prices.size();

    function<int(int, int, bool)> dfs;
    auto memo = vector<vector<array<int, 2>>>(
        n, vector<array<int, 2>>(k + 1, array<int, 2>{-1, -1}));
    dfs = [&](int i, int j, bool hold) -> int {
      if (j < 0) {
        return INT_MIN;
      }
      if (i < 0) {
        return hold ? INT_MIN : 0;
      }
      if (memo[i][j][hold ? 1 : 0] != -1) {
        return memo[i][j][hold ? 1 : 0];
      }
      auto ret = -1;
      if (hold) {
        ret = max(dfs(i - 1, j, true), dfs(i - 1, j, false) - prices[i]);
      } else {
        ret = max(dfs(i - 1, j, false), dfs(i - 1, j - 1, true) + prices[i]);
      }
      memo[i][j][hold ? 1 : 0] = ret;
      return ret;
    };

    return dfs(n - 1, k, false);
  }

  int maxProfit2(int k, vector<int>& prices) {
    auto n = prices.size();

    auto dp = vector<vector<array<int, 2>>>(
        n + 1, vector<array<int, 2>>(k + 2, array<int, 2>{INT_MIN, INT_MIN}));

    for (auto j = 1; j <= k + 1; j++) {
      dp[0][j][0] = 0;
    }

    for (auto i = 0; i < n; i++) {
      for (auto j = 1; j <= k + 1; j++) {
        dp[i + 1][j][0] = max(dp[i][j][0], dp[i][j - 1][1] + prices[i]);
        dp[i + 1][j][1] = max(dp[i][j][1], dp[i][j][0] - prices[i]);
      }
    }

    return dp[n][k + 1][0];
  }
};
