#include <algorithm>
#include <functional>
#include <iostream>
#include <vector>

using namespace std;

void quickSort(vector<int>& nums, const int left, const int right) {
  if (left >= right) {
    return;
  }

  function<int()> partition = [&]() -> int {
    auto l = left, r = right, pivot = left;
    while (l < r) {
      while (l < r && nums[r] >= nums[pivot]) {
        r--;
      }
      while (l < r && nums[l] <= nums[pivot]) {
        l++;
      }
      swap(nums[l], nums[r]);
    }
    swap(nums[pivot], nums[l]);
    return l;
  };

  auto divider = partition();
  quickSort(nums, left, divider - 1);
  quickSort(nums, divider + 1, right);
}

int main() {
  auto nums = vector<int>{3, 4, 1, 5, 2};
  quickSort(nums, 0, nums.size() - 1);
  for_each(nums.begin(), nums.end(),
           [](const auto& item) { cout << item << " "; });
}
