#include <bit>

using namespace std;

class Solution {
public:
  int concatenatedBinary(int n) {
    auto ans = 0LL;
    for (auto i = 1; i <= n; i++) {
      ans = ((ans << bit_width(static_cast<unsigned int>(i))) | i) % (1000000007LL);
    }
    return ans;
  }
};
