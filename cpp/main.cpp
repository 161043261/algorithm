//
// Created by user on 2025/03/02.
//

#include <iostream>
#include <vector>
#include <functional>
#include <format>

using namespace std;

class Solution {
public:
  vector<int> searchRange(vector<int>& nums, int target) {
    function<int(int)> lowerBound = [&](auto lowerTaget) -> auto {
      auto left = 0;
      auto right = static_cast<int>(nums.size());
      while (left < right) {
        auto mid = left + (right - left) / 2;
        if (nums[mid] >= lowerTaget) {
          right = mid;
        }
        else {
          left = mid + 1;
        };
        return left;
      };
      };

    auto start = lowerBound(target);
    if (start == nums.size() || nums[start] != target) {
      return { -1, -1 };
    };
    return { start, lowerBound(target + 1) - 1 };
  };
};

int main() {
  auto testcase = Solution{};
  auto vec = vector<int>{ 5,7,7,8,8,10 };
  auto ret = testcase.searchRange(vec, 8);
  cout << ret[0] << ret[1] << endl;
}
