#include <string>

using namespace std;

class Solution {
 public:
  int strStr(string haystack, string needle) {
    auto hs = haystack.size();
    auto ns = needle.size();
    for (auto i = 0; i + ns <= hs; i++) {
      auto flag = true;
      for (auto j = 0; j < ns; j++) {
        if (haystack[i + j] != needle[j]) {
          flag = false;
          break;
        }
      }
      if (flag) {
        return i;
      }
    }
    return -1;
  }
};
