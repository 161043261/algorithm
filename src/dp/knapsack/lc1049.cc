#include <numeric>
#include <vector>

using namespace std;

class Solution {
 public:
  int lastStoneWeightII(vector<int>& stones) {
    auto sum = accumulate(stones.begin(), stones.end(), 0);
    auto target = sum / 2;
    auto f = vector(stones.size() + 1, vector(target + 1, 0));

    for (auto i = 1; i <= stones.size(); i++) {
      for (auto j = 1; j <= target; j++) {
        if (j < stones[i - 1]) {
          f[i][j] = f[i - 1][j];
          continue;
        }

        f[i][j] = max(f[i - 1][j], f[i - 1][j - stones[i - 1]] + stones[i - 1]);
      }
    }

    return sum - 2 * f[stones.size()][target];
  }

  int lastStoneWeightIIPref(vector<int>& stones) {
    auto sum = accumulate(stones.begin(), stones.end(), 0);
    auto target = sum / 2;
    auto f = vector(target + 1, 0);

    for (auto i = 1; i <= stones.size(); i++) {
      for (auto j = target; j >= stones[i - 1]; j--) {
        f[j] = max(f[j], f[j - stones[i - 1]] + stones[i - 1]);
      }
    }

    return sum - 2 * f[target];
  }
};
