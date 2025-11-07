#include <vector>

using namespace std;

class Solution {
 public:
  int searchInsert(vector<int>& nums, int target) {
    auto l = 0;
    auto r = nums.size();
    while (l < r) {
      auto m = l + ((r - l) >> 1);
      if (nums[m] == target) {
        return m;
      }
      if (nums[m] < target) {
        l = m + 1;
      } else {
        r = m;
      }
    }
    return l;
  }
};
