#include <string>

using namespace std;

class Solution {
 public:
  int maxVowels(string s, int k) {
    auto ans = 0, vowel = 0;
    for (auto i = 0; i < s.size(); i++) {
      if (s[i] == 'a' || s[i] == 'e' || s[i] == 'i' || s[i] == 'o' ||
          s[i] == 'u') {
        vowel++;
      }
      auto left = i - k + 1;
      if (left < 0) {
        continue;
      }
      ans = max(ans, vowel);
      auto out = s[left];
      if (out == 'a' || out == 'e' || out == 'i' || out == 'o' || out == 'u') {
        vowel--;
      }
    }
    return ans;
  }
};
