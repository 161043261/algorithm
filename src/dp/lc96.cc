#include <vector>

using namespace std;

class Solution {
 public:
  int numTrees(int n) {
    auto f = vector<int>(n + 1, 0);
    f[0] = 1;
    f[1] = 1;
    for (auto i = 2; i <= f.size(); i++) {
      for (auto j = 1; j <= i; j++) {
        f[i] += f[j - 1] * f[i - j];
      }
    }
    return f[n];
  }
};
