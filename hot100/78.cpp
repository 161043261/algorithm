#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
  vector<int> nums;
  vector<vector<int>> ans{};
  vector<int> path{};

  vector<vector<int>> subsets(vector<int> &nums_) {
    nums = nums_;
    traverse(0);
    return ans;
  }

  // Automatic
  auto traverse(auto i) -> void {
    if (i == nums.size()) {
      // ans.emplace_back(vector<int>(path.cbegin(), path.cend()));
      ans.emplace_back(path);
      return;
    }
    traverse(i + 1); // 不选
    path.emplace_back(nums[i]);
    traverse(i + 1); // 选
    path.pop_back(); // 恢复现场
  }
};

int main() {
  vector<int> nums{1, 2, 3};
  Solution instance{};
  auto ans = instance.subsets(nums);
  for (const auto &path : ans) {
    for (const auto &item : path) {
      cout << item << " ";
    }
    cout << endl;
  }
}
