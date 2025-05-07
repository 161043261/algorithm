//
// Updated by user on 2025/04/30.
//

#include <algorithm>
#include <array>
#include <climits>
#include <cmath>
#include <cstddef>
#include <deque>
#include <format>
#include <functional>
#include <iostream>
#include <memory>
#include <numeric>
#include <queue>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility> // swap
#include <vector>

using namespace std;

class Solution {
public:
  int myAtoi(string s) {
    auto b = s.begin();
    // cout << *(++b);
    // cout << *(--b);
    for (; b != s.end() && *b == ' '; b++)
      ;

    auto isNeg = false;
    if (b + 1 != s.end() && (*b == '-' || *b == '+')) {
      isNeg = (*b == '-');
      b++;
    }

    for (; b != s.end() && *b == '0'; b++)
      ;
    auto e = b;
    for (; *e >= '0' && *e <= '9' && e != s.end(); e++)
      ;
    auto payload = string(b, e);
    cout << payload << endl;
    auto ans = 0;
    for (auto i = 0; i < payload.size(); i++) {
      auto j = payload.size() - 1 - i;
      auto delta = (payload[i] - '0') * pow(10, j);
      if (delta > INT_MAX - ans) {
        return isNeg ? INT_MIN : INT_MAX;
      } else {
        ans += delta;
      }
    }
    return isNeg ? 0 - ans : ans;
  }

  string intToRoman(int num) {
    vector<vector<string>> hashArr = {
        {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"},
        {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"},
        {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"},
        {"", "M", "MM", "MMM"}};
    string roman = "";
    roman.append(hashArr[3][num / 1000]);
    roman.append(hashArr[2][num / 100 % 10]);
    roman.append(hashArr[1][num / 10 % 10]);
    roman.append(hashArr[0][num % 10]);
    return roman;
  };
};

int main() {
  auto _ = Solution{};
  const auto ret = _.myAtoi("-91283472332");
  cout << ret << endl;
}
