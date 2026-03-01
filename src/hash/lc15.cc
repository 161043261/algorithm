#include <algorithm>
#include <vector>

using namespace std;

class Solution {
 public:
  vector<vector<int>> threeSum(vector<int>& nums) {
    ranges::sort(nums);
    auto n = int(nums.size());
    auto ans = vector<vector<int>>{};
    for (auto i = 0; i < n - 2; i++) {
      auto x = nums[i];
      if (i > 0 && x == nums[i - 1]) {
        continue;
      }
      for (auto j = i + 1, k = n - 1; j < k;) {
        auto s = x + nums[j] + nums[k];
        if (s > 0) {
          k--;
        } else if (s < 0) {
          j++;
        } else {
          auto item = vector<int>{x, nums[j], nums[k]};
          ans.emplace_back(item);
          for (j++; j < k && nums[j] == nums[j - 1]; j++);
          for (k--; k > j && nums[k] == nums[k + 1]; k--);
        }
      }
    }
    return ans;
  }
};
