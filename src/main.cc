#include <vector>

using namespace std;

class Solution {
 public:
  vector<int> sumZero(int n) {
    auto ans = vector<int>(n % 2 == 0 ? n : n - 1, 0);
    for (auto i = 0; i < (n % 2 == 0 ? n : n - 1); i++) {
      ans[i] = i % 2 == 0 ? (i / 2 + 1) : -(i / 2 + 1);
    }
    if (n % 2 == 1) {
      ans.emplace_back(0);
    }
    return ans;
  }
};
