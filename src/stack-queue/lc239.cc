#include <deque>
#include <vector>

using namespace std;

class Solution {
 public:
  vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    auto n = int(nums.size());
    auto ans = vector<int>(n - k + 1);

    // front 大
    // back 小
    auto q = deque<int>{};

    for (auto i = 0; i < n; i++) {
      while (!q.empty() && nums[q.back()] <= nums[i]) {
        q.pop_back();
      }
      q.push_back(i);
      auto left = i - k + 1;
      if (q.front() < left) {
        q.pop_front();
      }

      if (left >= 0) {
        ans[left] = nums[q.front()];
      }
    }
    return ans;
  }
};
