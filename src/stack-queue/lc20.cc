#include <stack>
#include <string>

using namespace std;

class Solution {
 public:
  bool isValid(string s) {
    auto stk = stack<char>{};
    for (auto& chr : s) {
      if (chr == '(' || chr == '[' || chr == '{') {
        stk.push(chr);
        continue;
      }
      if (stk.empty()) {
        return false;
      }
      auto topChr = stk.top();
      if (!((topChr == '(' && chr == ')') || (topChr == '[' && chr == ']') ||
            (topChr == '{' && chr == '}'))) {
        return false;
      }
      stk.pop();
    }
    return stk.empty();
  }
};
