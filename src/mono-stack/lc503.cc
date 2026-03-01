#include <algorithm>
#include <iostream>
#include <stack>
#include <vector>

using namespace std;

class Solution {
 private:
  stack<int> idxStack = stack<int>{};
  vector<int> ans;
  vector<bool> visit;
  int cnt = 0;

 public:
  vector<int> nextGreaterElements(vector<int>& nums) {
    ans = vector<int>(nums.size(), -1);
    visit = vector<bool>(nums.size(), false);

    for (auto i = 0; cnt < nums.size(); i = (i + 1) % nums.size()) {
      if ((idxStack.empty() || nums[idxStack.top()] > nums[i]) && !visit[i]) {
        idxStack.push(i);
        visit[i] = true;
        continue;
      }

      if (i == idxStack.top() && visit[i]) {
        cnt++;
        idxStack.pop();
      }

      while (!idxStack.empty() && nums[idxStack.top()] < nums[i]) {
        auto idx = idxStack.top();
        idxStack.pop();
        ans[idx] = nums[i];
        cnt++;
      }

      if (!visit[i]) {
        idxStack.push(i);
      }
      visit[i] = true;
    };

    return ans;
  };
};

int main() {
  auto nums = vector<int>{1, 1, 1, 1, 1};
  auto solution = Solution{};
  auto ans = solution.nextGreaterElements(nums);
  for_each(ans.begin(), ans.end(),
           [&](const auto& item) -> void { cout << item << " "; });
}
