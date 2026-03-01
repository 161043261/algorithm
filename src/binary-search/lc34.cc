#include <vector>

using namespace std;

class Solution {
 public:
  vector<int> searchRange(vector<int>& nums, int target) {
    auto l = 0;
    auto r = int(nums.size());
    while (l < r) {
      auto m = l + ((r - l) >> 1);
      if (nums[m] >= target) {
        r = m;
      } else {
        l = m + 1;
      }
    }
    auto lowBound = r;
    if (lowBound < 0 || lowBound >= nums.size() || nums[lowBound] != target) {
      return {-1, -1};
    }
    l = 0;
    r = nums.size();
    while (l < r) {
      auto m = l + ((r - l) >> 1);
      if (nums[m] <= target) {
        l = m + 1;
      } else {
        r = m;
      }
    }
    auto highBound = l - 1;
    if (highBound < 0 || highBound >= nums.size() ||
        nums[highBound] != target) {
      return {-1, -1};
    }
    return {lowBound, highBound};
  }
};
