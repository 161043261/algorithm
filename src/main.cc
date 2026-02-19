#include <string>
#include <vector>

using namespace std;

class Solution {
 public:
  int countBinarySubstrings(string s) {
    auto cnts = vector<int>();
    for (auto i = 0; i < s.size();) {
      auto c = s[i];
      auto cnt = 0;
      while (i < s.size() && s[i] == c) {
        i++;
        cnt++;
      }
      cnts.emplace_back(cnt);
    }
    auto ans = 0;
    for (auto i = 1; i < cnts.size(); i++) {
      ans += min(cnts[i], cnts[i - 1]);
    }

    return ans;
  }
};
