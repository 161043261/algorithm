#include <algorithm>
#include <sstream>
#include <string>
#include <vector>

using namespace std;

class Solution {
 public:
  string reverseWords(string s) {
    auto l = 0;
    auto r = int(s.length()) - 1;
    for (; l <= r && s[l] == ' '; l++);
    for (; l <= r && s[r] == ' '; r--);
    s = s.substr(l, r - l + 1);
    auto iss = istringstream{s};
    auto words = vector<string>{};
    auto w = string{};
    while (iss >> w) {
      words.emplace_back(w);
    }
    reverse(words.begin(), words.end());
    auto oss = ostringstream{};
    for (auto i = 0; i < int(words.size()); i++) {
      if (i != 0) {
        oss << " ";
      }
      oss << words[i];
    }
    return oss.str();
  }
};
