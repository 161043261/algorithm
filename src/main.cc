#include <iostream>
#include <string>
#include <utility>

using namespace std;
class Solution {
 public:
  int maximumGain(string s, int x, int y) {
    auto a = 'a', b = 'b';
    if (x < y) {
      swap(x, y);
      swap(a, b);
    }

    cout << x << y << a << b;

    auto ans = 0;
    for (auto i = 0; i < s.size(); i++) {
      auto cntA = 0, cntB = 0;

      for (; (i < s.size() && s[i] == a) || s[i] == b; i++) {
        if (s[i] == a) {
          cntA++;
          continue;
        }

        if (cntA > 0) {
          ans += x;
          cntA--;
        } else {
          cntB++;
        }
      }
      ans += max(cntA, cntB) * y;
    }
    return ans;
  }
};
