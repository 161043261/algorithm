#include <functional>
#include <string>
#include <vector>

using namespace std;

class Solution {
 public:
  int findMaxForm(vector<string>& strs, int m, int n) {
    auto cnt0 = vector<int>(strs.size());
    for (auto i = 0; i < strs.size(); i++) {
      for (auto chr : strs[i]) {
        if (chr == '0') {
          cnt0[i]++;
        }
      }
    }

    auto memo = vector<vector<vector<int>>>(
        strs.size(), vector<vector<int>>(m + 1, vector<int>(n + 1, -1)));
    function<int(int, int, int)> dfs;
    dfs = [&](int i, int j, int k) -> int {
      if (i < 0) {
        return 0;
      }
      if (memo[i][j][k] != -1) {
        return memo[i][j][k];
      }
      auto ret = dfs(i - 1, j, k);
      auto cnt1 = strs[i].size() - cnt0[i];
      if (j >= cnt0[i] && k >= cnt1) {
        ret = max(ret, dfs(i - 1, j - cnt0[i], k - cnt1) + 1);
      }
      memo[i][j][k] = ret;
      return ret;
    };
    return dfs(strs.size() - 1, m, n);
  }
};
