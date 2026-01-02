#include <climits>
#include <iostream>
#include <vector>

using namespace std;

class Solution {
 public:
  int minSubArrayLen(int target, vector<int>& nums) {
    auto l = 0;
    auto r = 0;
    auto sum = 0;
    auto ans = INT_MAX;
    while (l <= r && r < nums.size()) {
      if (sum >= target) {
        while (sum >= target && l <= r) {
          ans = min(ans, r - l);
          sum -= nums[l];
          l++;
        }
        continue;
      }

      // sum < target
      sum += nums[r];
      r++;
    }

    while (sum >= target && l <= r) {
      ans = min(ans, r - l);
      sum -= nums[l];
      l++;
    }
    return ans == INT_MAX ? 0 : ans;
  }
};

int main() {
  auto target = 7;
  auto nums = vector<int>{2, 3, 1, 2, 4, 3};
  auto solution = Solution();
  auto ans = solution.minSubArrayLen(target, nums);
  cout << ans << endl;
}
