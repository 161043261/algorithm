#include <algorithm>
#include <functional>
#include <iostream>
#include <unordered_map>
#include <vector>

using namespace std;

class Solution {
public:
  vector<string> letterCombinations(string digits) {
    if (digits == "") {
      return {};
    }
    unordered_map<int, vector<char>> num2runes{
        {2, {'a', 'b', 'c'}}, {3, {'d', 'e', 'f'}},
        {4, {'g', 'h', 'i'}}, {5, {'j', 'k', 'l'}},
        {6, {'m', 'n', 'o'}}, {7, {'p', 'q', 'r', 's'}},
        {8, {'t', 'u', 'v'}}, {9, {'w', 'x', 'y', 'z'}}};

    vector<vector<char>> opts{};
    for (const auto &rune : digits) {
      auto num = rune - '0';
      auto runes = num2runes[num];
      opts.emplace_back(runes);
    }

    auto println = [](const auto &item) { cout << item << " "; };
    // for_each(opts.cbegin(), opts.cend(), [&](const auto &opt) {
    //   for_each(opt.cbegin(), opt.cend(), println);
    // });

    string path = "";
    vector<string> ans{};

    function<void(int)> traverse;

    // recursive
    traverse = [&](int i) {
      if (i == opts.size()) {
        ans.emplace_back(path);
        return;
      }

      for (const auto &item : opts[i]) {
        path += item;
        traverse(i + 1);
        // restore
        path = path.substr(0, path.size() - 1);
      }
    };

    traverse(0);
    return ans;
  }
};

int main() {
  Solution s{};
  auto ans = s.letterCombinations("23");
  for_each(ans.cbegin(), ans.cend(),
           [&](const auto &item) { cout << item << endl; });
}
