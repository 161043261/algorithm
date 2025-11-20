#include <string>

using namespace std;

class Solution {
 public:
  int numSub(string s) {
    auto MOD = 1'000'000'007;
    auto ans = 0LL;
    auto last0 = -1;
    for (auto i = 0; i < s.length(); i++) {
      auto chr = s[i];
      if (chr == '0') {
        last0 = i;
      } else {
        ans += (i - last0);
      }
    }
    return ans % MOD;
  }
};
