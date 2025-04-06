//
// Created by user on 2025/03/02.
//

#include <algorithm>
#include <climits>
#include <cmath>
#include <deque>
#include <format>
#include <functional>
#include <iostream>
#include <numeric>
#include <queue>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <vector>

using namespace std;

class Solution {
public:
  string decodeString(string s) {
    auto cup = stack<string>{};
    function<bool(string &)> isInt = [](string &str) -> bool {
      try {
        stoi(str);
      } catch (exception &err) {
        return false;
      }
      return true;
    };

    for (const auto &ch : s) {
      auto item = string{""};
      if (ch == ']') {
        item = cup.top();
        cup.pop();
        // cup.top() == '['
        cup.pop();

        auto repeat = cup.top();
        cup.pop();

        // cout << format("item: {}, repeat: {}", item, repeat) << endl;
        auto repeatCnt = stoi(repeat);
        auto repeatVec = vector<string>(repeatCnt, item);
        auto repeatStr = string{""};
        for_each(repeatVec.begin(), repeatVec.end(),
                 [&repeatStr](const auto &str) { repeatStr += str; });
        // cout << format("repeatStr: {}", repeatStr) << endl;

        if (cup.empty()) {
          cup.emplace(repeatStr);
          // 不是整数, 不是 [, 则是字符串, append
        } else if (!isInt(cup.top()) && cup.top() != "[") {
          cup.top().append(repeatStr);
        } else {
          cup.emplace(repeatStr);
        }
        continue;
      }

      if (ch == '[') {
        cup.emplace("[");
        continue;
      }

      auto chStr = string{ch};
      if (isInt(chStr)) {
        if (cup.empty()) {
          cup.emplace(chStr);
          // 是整数, append
        } else if (isInt(cup.top())) {
          cup.top().append(chStr);
        } else {
          cup.emplace(chStr);
        }
        continue;
      }

      if (cup.empty()) {
        cup.emplace(chStr);
        // 不是整数, 不是 [, 则是字符串, append
      } else if (!isInt(cup.top()) && cup.top() != "[") {
        cup.top().append(chStr);
      } else {
        cup.emplace(chStr);
      }
    }
    return cup.top();
  };
};

int main() {
  auto testcase = Solution{};
  auto res = testcase.decodeString("3[z]2[2[y]pq4[2[jk]e1[f]]]ef");
  cout << format("res: {}", res) << endl;
}
