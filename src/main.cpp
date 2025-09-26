#include <algorithm>
#include <functional>
#include <vector>

using namespace std;

namespace ranges_ {
void sort(vector<int>& nums) {
  std::sort(nums.begin(), nums.end(),
            [&](auto a, auto b) -> bool { return a <= b; });
};
}  // namespace ranges_

class Solution {
 public:
  int triangleNumber2(vector<int>& nums) {
    if (nums.size() < 3) {
      return 0;
    }
    // sort(nums.begin(), nums.end(),
    //      [&](auto a, auto b) -> bool { return a <= b; });
    ranges_::sort(nums);
    auto ans = 0;
    for (auto k = 2; k < nums.size(); k++) {
      auto i = 0;
      auto j = k - 1;
      while (i < j) {
        if (nums[i] != 0 && nums[i] + nums[j] > nums[k]) {
          ans += j - i;
          j--;
        } else {
          i++;
        }
      }
    }

    return ans;
  }

  int triangleNumber(vector<int>& nums) {
    if (nums.size() < 3) {
      return 0;
    }
    // sort(nums.begin(), nums.end(), [&](auto a, auto b) { return a <= b; });
    ranges_::sort(nums);
    auto ans = 0;
    for (auto i = 0; i < nums.size() - 2; i++) {
      if (nums[i] == 0) {
        continue;
      }
      auto j = i + 1;
      for (auto k = i + 2; k < nums.size(); k++) {
        while (nums[i] + nums[j] <= nums[k]) {
          j++;
        }
        ans += k - j;
      }
    }
    return ans;
  }
};
