#include <string>

using namespace std;

class Solution {
 public:
  bool backspaceCompare(string s, string t) {
    auto buildStr = [&](string originalStr) -> string {
      auto ret = string{};
      for (auto chr : originalStr) {
        if (chr != '#') {
          ret.push_back(chr);
        } else if (!ret.empty()) {
          ret.pop_back();
        }
      }
      return ret;
    };

    return buildStr(s) == buildStr(t);
  }
};
