#include <string>
#include <vector>

using namespace std;

class Solution {
 public:
  bool isAnagram(string s, string t) {
    if (s.length() != t.length()) {
      return false;
    }
    auto cnts4s = vector<int>(26, 0);
    auto cnts4t = vector<int>(26, 0);
    for (auto& chr : s) {
      cnts4s[chr - 'a']++;
    }
    for (auto& chr : t) {
      cnts4t[chr - 'a']++;
    }
    for (auto i = 0; i < 26; i++) {
      if (cnts4s[i] != cnts4t[i]) {
        return false;
      }
    }
    return true;
  }
};
