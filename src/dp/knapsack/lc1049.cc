#include <numeric>
#include <vector>

using namespace std;

class Solution {
 public:
  int lastStoneWeightII(vector<int>& stones) {
    auto sum = accumulate(stones.begin(), stones.end(), 0);
    auto target = sum / 2;
    auto dp = vector(stones.size() + 1, vector(target + 1, 0));

    for (auto i = 1; i <= stones.size(); i++) {
      for (auto j = 1; j <= target; j++) {
        if (j < stones[i - 1]) {
          dp[i][j] = dp[i - 1][j];
          continue;
        }

        dp[i][j] =
            max(dp[i - 1][j], dp[i - 1][j - stones[i - 1]] + stones[i - 1]);
      }
    }

    return sum - 2 * dp[stones.size()][target];
  }

  int lastStoneWeightIIPref(vector<int>& stones) {
    auto sum = accumulate(stones.begin(), stones.end(), 0);
    auto target = sum / 2;
    auto dp = vector(target + 1, 0);

    for (auto i = 1; i <= stones.size(); i++) {
      for (auto j = target; j >= stones[i - 1]; j--) {
        dp[j] = max(dp[j], dp[j - stones[i - 1]] + stones[i - 1]);
      }
    }

    return sum - 2 * dp[target];
  }
};
