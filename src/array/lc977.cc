#include <vector>

using namespace std;

class Solution {
 public:
  vector<int> sortedSquares(vector<int>& nums) {
    auto l = 0;
    auto r = int(nums.size());
    while (l < r) {
      auto m = l + ((r - l) >> 1);
      if (nums[m] >= 0) {
        r = m;
      } else {
        l = m + 1;
      }
    }
    if (l == 0) {
      auto ret = vector<int>(nums.size());
      for (auto i = 0; i < nums.size(); ++i) {
        ret[i] = nums[i] * nums[i];
      }
      return ret;
    }
    if (r == nums.size()) {
      auto ret = vector<int>(nums.size());
      for (auto i = 0; i < nums.size(); ++i) {
        ret[nums.size() - 1 - i] = nums[i] * nums[i];
      }
      return ret;
    }
    l = l - 1;  // < 0
    auto ret = vector<int>(nums.size());
    for (auto i = 0; i < nums.size(); i++) {
      if (l < 0 && r >= nums.size()) {
        break;
      }
      if ((l >= 0 && r < nums.size() && abs(nums[l]) <= abs(nums[r])) ||
          r >= nums.size()) {
        ret[i] = nums[l] * nums[l];
        l--;
        continue;
      }
      if ((l >= 0 && r < nums.size() && abs(nums[l]) > abs(nums[r])) || l < 0) {
        ret[i] = nums[r] * nums[r];
        r++;
        continue;
      }
    }
    return ret;
  }
};
