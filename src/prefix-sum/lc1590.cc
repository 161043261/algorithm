#include <unordered_map>
#include <vector>

using namespace std;

class Solution {
 public:
  int minSubarray(vector<int>& nums, int p) {
    auto n = int(nums.size());
    auto preSumRes = vector<int>(n + 1, 0);
    for (auto i = 0; i < n; i++) {
      preSumRes[i + 1] = (preSumRes[i] + nums[i]) % p;
    }
    auto x = preSumRes[n];
    if (x == 0) {
      return 0;
    }
    auto ans = n;
    auto lastIdx = unordered_map<int, int>();
    for (auto i = 0; i <= n; i++) {
      lastIdx[preSumRes[i]] = i;
      auto it = lastIdx.find((preSumRes[i] - x + p) % p);
      if (it != lastIdx.end()) {
        ans = min(ans, i - it->second);
      }
    }
    return ans < n ? ans : -1;
  }
};
