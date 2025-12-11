#include <vector>

using namespace std;

class Solution {
 public:
  void moveZeroes(vector<int>& nums) {
    auto k = 0;
    for (auto i = 0; i < nums.size(); i++) {
      if (nums[i] != 0) {
        nums[k] = nums[i];
        k++;
      }
    }
    for (auto i = k; i < nums.size(); i++) {
      nums[i] = 0;
    }
  }
};
