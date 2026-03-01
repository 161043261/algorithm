#include <vector>

using namespace std;

class Solution {
 public:
  int maxSubArray(vector<int>& nums) {
    auto cur = nums[0];
    auto ans = nums[0];
    for (auto i = 1; i < nums.size(); i++) {
      cur = max(cur + nums[i], nums[i]);
      ans = max(ans, cur);
    }
    return ans;
  }
};
