#include <climits>
#include <functional>
#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

class Solution {
 public:
  int minScoreTriangulation(vector<int>& values) {
    auto memo = unordered_map<string, int>();
    function<int(int, int)> dp = [&](auto i, auto j) -> int {
      if (i + 2 > j) {
        return 0;
      }
      if (i + 2 == j) {
        return values[i] * values[i + 1] * values[i + 2];
      }
      auto key = to_string(i) + "," + to_string(j);
      if (!memo.contains(key)) {
        auto minScore = INT_MAX;
        for (auto k = i + 1; k < j; k++) {
          minScore = min(minScore, values[i] * values[k] * values[j] +
                                       dp(i, k) + dp(k, j));
        }
        memo[key] = minScore;
      }
      return memo[key];
    };
    return dp(0, values.size() - 1);
  }
};
