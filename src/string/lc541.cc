#include <string>
#include <utility>

using namespace std;

class Solution {
 public:
  string reverseStr(string s, int k) {
    auto i = 0;
    auto n = int(s.length());
    for (; i + 2 * k < n; i += 2 * k) {
      for (auto l = i, r = i + k - 1; l < r; l++, r--) {
        swap(s[l], s[r]);
      }
    }
    for (auto l = i, r = min(n - 1, i + k - 1); l < r; l++, r--) {
      swap(s[l], s[r]);
    }
    return s;
  }
};
