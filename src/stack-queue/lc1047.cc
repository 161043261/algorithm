#include <stack>
#include <string>

using namespace std;

class Solution {
 public:
  string removeDuplicates(string s) {
    auto stk = stack<char>{};
    for (auto& chr : s) {
      if (!stk.empty() && stk.top() == chr) {
        stk.pop();
      } else {
        stk.push(chr);
      }
    }
    auto ans = string{""};
    while (!stk.empty()) {
      ans = string{stk.top()} + ans;
      stk.pop();
    }
    return ans;
  }
};
