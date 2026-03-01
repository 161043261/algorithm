#include <unordered_map>
#include <vector>

using namespace std;

class Solution {
 public:
  vector<int> twoSum(vector<int>& nums, int target) {
    auto num2idx = unordered_map<int, int>{};
    for (auto i = 0; i < nums.size(); i++) {
      auto num = nums[i];
      if (num2idx.find(target - num) != num2idx.end()) {
        return vector<int>{num2idx[num], i};
      }
      num2idx[num] = i;
    }
    return {};
  }
};
