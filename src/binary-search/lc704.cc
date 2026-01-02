#include <vector>

using namespace std;

class Solution {
 public:
  int search(vector<int>& nums, int target) {
    auto l = nums.begin();
    auto r = nums.end() - 1;
    while (l <= r) {
      auto m = l + (r - l) / 2;
      if (*m == target) {
        return m - nums.begin();
      }
      if (*m < target) {
        l = m + 1;
      } else {
        r = m - 1;
      }
    }
    return -1;
  }
};
