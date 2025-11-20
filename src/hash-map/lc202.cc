#include <cmath>
#include <iostream>
#include <unordered_set>

using namespace std;

class Solution {
 public:
  bool isHappy(int n) {
    for (auto snapshots = unordered_set<int>{};
         !(snapshots.find(n) != snapshots.end()) && n != 1;) {
      snapshots.emplace(n);
      auto n2 = 0;
      while (n != 0) {
        auto _ = n / 10;
        n2 += pow(n % 10, 2);
        n = _;
      }
      n = n2;
    }
    return n == 1;
  }
};

int main() {
  auto ans = Solution().isHappy(2);
  cout << ans << endl;
}
