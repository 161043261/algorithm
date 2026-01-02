#include <algorithm>
#include <iostream>
#include <stack>
#include <vector>

using namespace std;

class Solution {
 public:
  vector<int> dailyTemperatures(vector<int>& temperatures) {
    stack<int> idxStack{};
    auto ans = vector<int>(temperatures.size());

    for (auto i = 0; i < temperatures.size(); i++) {
      auto t = temperatures[i];
      if (idxStack.empty() ||
          (!idxStack.empty() && temperatures[idxStack.top()] >= t)) {
        idxStack.push(i);
        continue;
      }

      while (!idxStack.empty() && temperatures[idxStack.top()] < t) {
        auto idx = idxStack.top();

        idxStack.pop();
        ans[idx] = i - idx;
      }
      idxStack.push(i);
    }
    return ans;
  }
};

int main() {
  auto temperatures = vector<int>{73, 74, 75, 71, 69, 72, 76, 73};
  auto solution = Solution{};
  auto ans = solution.dailyTemperatures(temperatures);
  for_each(ans.begin(), ans.end(),
           [&](const auto& item) -> void { cout << item << ""; });
}
