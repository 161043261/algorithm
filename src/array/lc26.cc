#include <vector>

using namespace std;

class Solution {
 public:
  int removeDuplicates(vector<int>& nums) {
    auto k = 0;
    for (auto i = 1; i < nums.size(); i++) {
      if (nums[i] != nums[k]) {
        k++;
        nums[k] = nums[i];
      }
    }
    return k + 1;
  }
};
