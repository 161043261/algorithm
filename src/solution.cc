#include <algorithm>
#include <iostream>
#include <vector>

using namespace std;

class Solution {
 public:
  int minimumOperations(vector<int>& nums) {
    auto ans = 0;
    for (auto& num : nums) {
      auto sum = 0;
      while (num > 0) {
        sum += num % 10;
        num /= 10;
      }
      if (sum % 3 != 0) {
        ans += 1;
      }
    }
    return ans;
  }
};
