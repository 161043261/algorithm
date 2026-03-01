#include <algorithm>
#include <vector>

using namespace std;

class Solution {
 public:
  int largestSumAfterKNegations(vector<int>& nums, int k) {
    sort(nums.begin(), nums.end(), [&](auto a, auto b) { return a < b; });
    auto i = 0;
    for (; i < nums.size() && nums[i] < 0 && k > 0; i++) {
      nums[i] = -nums[i];
      k--;
    }
    // i == nums.size();
    if (i >= nums.size()) {
      if (k % 2 == 1) {
        nums[nums.size() - 1] = -nums[nums.size() - 1];
      }
      auto ans = 0;
      for (auto item : nums) {
        ans += item;
      }
      return ans;
    }

    // nums[i] >= 0
    if (nums[i] >= 0) {
      if (k % 2 == 1) {
        if (i > 0) {
          if (nums[i] >= nums[i - 1]) {
            nums[i - 1] = -nums[i - 1];
          } else {
            nums[i] = -nums[i];
          }
        } else {
          nums[0] = -nums[0];
        }
      }
      auto ans = 0;
      for (auto item : nums) {
        ans += item;
      }
      return ans;
    }

    // k == 0
    auto ans = 0;
    for (auto item : nums) {
      ans += item;
    }
    return ans;
  }
};
