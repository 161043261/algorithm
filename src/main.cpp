#include "main.hpp"

using namespace std;

struct TreeNode {
  int val;
  TreeNode *left;
  TreeNode *right;
  TreeNode() : val(0), left(nullptr), right(nullptr) {}
  TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
  TreeNode(int x, TreeNode *left, TreeNode *right)
      : val(x), left(left), right(right) {}
};

class Solution {
 public:
  long long maximumTotalDamage2(vector<int> &power) {
    auto power2cnt = unordered_map<int, int>();
    for (auto p : power) {
      if (power2cnt.find(p) != power2cnt.cend()) {
        power2cnt[p] += 1;
      } else {
        power2cnt.insert(pair<int, int>{p, 1});
      }
    }

    auto powerAndCnt =
        vector<pair<int, int>>(power2cnt.cbegin(), power2cnt.cend());
    sort(powerAndCnt.begin(), powerAndCnt.end(),
         [&](const auto &a, const auto &b) -> bool {
           return a.first < b.first;
         });
    // ranges::sort(powerAndCnt);

    auto n = int(powerAndCnt.size());
    auto memo = vector<long long>(n, -1);

    function<long long(int)> dfs;
    dfs = [&](int i) -> long long {
      if (i < 0) {
        return 0;
      }
      auto ret = memo[i];
      if (ret != -1) {
        return ret;
      }
      auto &[power, cnt] = powerAndCnt[i];
      auto j = i;
      while (j > 0 && powerAndCnt[j - 1].first >= power - 2) {
        j--;
      }

      ret = max(dfs(i - 1), dfs(j - 1) + (long long)(power)*cnt);
      memo[i] = ret;
      return ret;
    };

    return dfs(n - 1);
  }

  long long maximumTotalDamage(vector<int> &power) {
    auto power2cnt = unordered_map<int, int>();
    for (auto p : power) {
      power2cnt[p] += 1;
    }

    auto powerAndCnt =
        vector<pair<int, int>>(power2cnt.cbegin(), power2cnt.cend());
    sort(powerAndCnt.begin(), powerAndCnt.end(),
         [&](const auto &a, const auto &b) -> bool {
           return a.first < b.first;
         });
    // ranges::sort(powerAndCnt);

    auto n = int(powerAndCnt.size());
    auto dp = vector<long long>(n + 1);
    for (auto i = 0, j = 0; i < n; i++) {
      auto &[power, cnt] = powerAndCnt[i];
      while (powerAndCnt[j].first < power - 2) {
        j++;
      }
      dp[i + 1] = max(dp[i], dp[j] + (long long)(power)*cnt);
    }
    return dp[n];
  }
};
