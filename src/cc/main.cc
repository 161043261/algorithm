
#include <vector>

using namespace std;

class Solution {
 public:
  int searchInsert(vector<int> &nums, int target) {
    auto l = 0, r = static_cast<int>(nums.size());
    // l 左边的全部 < target
    // r 和 r 右边的全部 >= target
    while (l < r) {
      auto m = l + (r - l) / 2;
      if (nums[m] < target) {
        l = m + 1;
        continue;
      }

      // nums[m] >= target
      r = m;
    }
    return r;
  }
};
