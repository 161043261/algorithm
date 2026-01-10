#include <functional>
#include <iostream>
#include <numeric>
#include <vector>

using namespace std;

class Solution {
 public:
  int findTargetSumWaysBacktrack(vector<int>& nums, int target) {
    auto ans = 0;

    function<void(int, int)> backtrack;
    backtrack = [&](int idx, int cur) -> void {
      if (idx == nums.size()) {
        if (cur == target) {
          ans++;
        }
        return;
      }

      backtrack(idx + 1, cur + nums[idx]);
      backtrack(idx + 1, cur - nums[idx]);
    };

    backtrack(0, 0);
    return ans;
  }

  int findTargetSumWaysDp(vector<int>& nums, int target) {
    auto sum = accumulate(nums.begin(), nums.end(), 0);
    auto diff = sum - target;
    if (diff < 0 || diff % 2 != 0) {
      return 0;
    }

    auto negSum = diff / 2;
    auto f = vector(nums.size() + 1, vector(negSum + 1, 0));
    f[0][0] = 1;

    for (auto i = 1; i <= nums.size(); i++) {
      for (auto j = 0; j <= negSum; j++) {
        f[i][j] = f[i - 1][j];
        if (j >= nums[i - 1]) {
          f[i][j] += f[i - 1][j - nums[i - 1]];
        }
      }
    }
    return f[nums.size()][negSum];
  }
};

int main() {
  auto nums = vector{14, 45, 15, 50, 1, 23, 37, 12, 30, 26,
                     42, 21, 15, 12, 8, 28, 16, 4,  16, 47};
  auto ans = Solution().findTargetSumWaysBacktrack(nums, 6);
  cout << ans << endl;
}
