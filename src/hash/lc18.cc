#include <algorithm>
#include <vector>

using namespace std;

class Solution {
 public:
  vector<vector<int>> fourSum(vector<int>& nums, int target) {
    auto n = int(nums.size());
    if (n < 4) {
      return {};
    }
    ranges::sort(nums);
    auto ans = vector<vector<int>>{};
    for (auto i = 0; i < n - 3; i++) {
      auto x = nums[i];
      if (i > 0 && x == nums[i - 1]) {
        continue;
      }
      for (auto j = i + 1; j < n - 2; j++) {
        auto y = nums[j];
        if (j > i + 1 && y == nums[j - 1]) {
          continue;
        }
        for (auto k = j + 1, l = n - 1; k < l;) {
          auto s = (long long)(x) + y + nums[k] + nums[l];
          if (s > target) {
            l--;
          } else if (s < target) {
            k++;
          } else {
            auto item = vector<int>{x, y, nums[k], nums[l]};
            ans.emplace_back(item);
            for (k++; k < l && nums[k] == nums[k - 1]; k++) {
            }
            for (l--; l > k && nums[l] == nums[l + 1]; l--) {
            }
          }
        }
      }
    }
    return ans;
  }
};
