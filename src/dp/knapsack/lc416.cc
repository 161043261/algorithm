#include <numeric>
#include <vector>

using namespace std;

class Solution {
 public:
  bool canPartition(vector<int>& nums) {
    auto sum = 0;

    for (auto& item : nums) {
      sum += item;
    }

    if (sum % 2 != 0) {
      return false;
    }

    auto target = sum / 2;

    auto f = vector(nums.size() + 1, vector(target + 1, 0));
    for (auto i = 1; i <= nums.size(); i++) {
      for (auto j = 1; j <= target; j++) {
        if (j < nums[i - 1]) {
          f[i][j] = f[i - 1][j];
        } else {
          f[i][j] = max(f[i - 1][j], f[i - 1][j - nums[i - 1]] + nums[i - 1]);
        }
      }
    }

    return f[nums.size()][target] == target;
  }

  bool canPartitionPerf(vector<int>& nums) {
    auto sum = accumulate(nums.begin(), nums.end(), 0);

    if (sum % 2 != 0) {
      return false;
    }

    auto target = sum / 2;

    auto f = vector<int>(target + 1, 0);

    for (auto i = 1; i <= nums.size(); i++) {
      for (auto j = target; j >= nums[i - 1]; j--) {
        f[j] = max(f[j], f[j - nums[i - 1]] + nums[i - 1]);
      }
    }

    return f[target] == target;
  }
};
