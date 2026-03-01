#include <stack>
#include <string>
#include <vector>

using namespace std;

class Solution {
 public:
  int evalRPN(vector<string>& tokens) {
    auto stk = stack<int>{};
    for (auto& token : tokens) {
      auto chr = token[0];
      if (token.size() > 1 || isdigit(chr)) {
        stk.push(stoi(token));
        continue;
      }

      auto x = stk.top();
      stk.pop();
      switch (chr) {
        case '+': {
          stk.top() += x;
          break;
        }
        case '-': {
          stk.top() -= x;
          break;
        }
        case '*': {
          stk.top() *= x;
          break;
        }
        case '/': {
          stk.top() /= x;
          break;
        }
      }
    }
    return stk.top();
  }
};
