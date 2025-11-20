#include <string>

using namespace std;

class Solution {
 public:
  bool repeatedSubstringPattern(string s) {
    auto s2 = (s + s).substr(1, 2 * s.length() - 2);
    return s2.find(s) != s2.npos;
  }
};
