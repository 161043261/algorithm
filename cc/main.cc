//
// Created by user on 2025/03/02.
//

#include <algorithm>
#include <climits>
#include <cmath>
#include <deque>
#include <format>
#include <functional>
#include <iostream>
#include <numeric>
#include <queue>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>  // swap
#include <vector>

using namespace std;

class Solution {
 public:
  int minArraySum(vector<int> &nums, int k, int op1, int op2) {
    // auto key2ret = unordered_map<string, int>{};
    vector memo(nums.size(), vector(op1 + 1, vector<int>(op2 + 1, -1)));
    function<int(int, int, int)> dfs;
    dfs = [&](auto idx, auto op1, auto op2) -> auto {
      if (idx < 0) {
        return 0;
      }
      // auto key = format("{}-{}-{}", idx, op1, op2);
      if (memo[idx][op1][op2] != -1) {
        return memo[idx][op1][op2];
      };

      auto ret = dfs(idx - 1, op1, op2) + nums[idx];
      if (op1 > 0 && op2 > 0 && nums[idx] >= k) {
        ret =
            min(ret, dfs(idx - 1, op1 - 1, op2 - 1) +
                         ((nums[idx] + 1) / 2 >= k ? (nums[idx] + 1) / 2 - k
                                                   : (nums[idx] - k + 1) / 2));
      }
      if (op1 > 0) {
        ret = min(ret, dfs(idx - 1, op1 - 1, op2) + (nums[idx] + 1) / 2);
      }
      if (op2 > 0 && nums[idx] >= k) {
        ret = min(ret, dfs(idx - 1, op1, op2 - 1) + nums[idx] - k);
      }
      /*key2ret.insert({ key, ret });*/
      memo[idx][op1][op2] = ret;
      return ret;
    };

    return dfs(nums.size() - 1, op1, op2);
  }
};

int main() {
  auto nums = vector<int>{2, 8, 3, 19, 3};
  auto test = Solution{};
  auto ret = test.minArraySum(nums, 3, 1, 1);
  cout << ret << endl;
}
