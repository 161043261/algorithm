#include <unordered_map>
#include <vector>

using namespace std;
class Solution {
 public:
  int minimumDistance(vector<int>& nums) {
    auto num2idx = unordered_map<int, vector<int>>();
    auto ans = -1;
    for (auto i = 0; i < nums.size(); i++) {
      num2idx[nums[i]].push_back(i);

      if (num2idx[nums[i]].size() >= 3) {
        auto idxs = num2idx[nums[i]];
        auto i = idxs[idxs.size() - 3];
        auto j = idxs[idxs.size() - 2];
        auto k = idxs[idxs.size() - 1];
        auto dis = abs(i - j) + abs(j - k) + abs(k - i);
        if (ans == -1) {
          ans = dis;
        } else {
          ans = min(ans, dis);
        }
      }
    }
    return ans;
  }
};
