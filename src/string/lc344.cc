#include <utility>
#include <vector>

using namespace std;

class Solution {
 public:
  void reverseString(vector<char>& s) {
    for (auto l = 0, r = int(s.size()) - 1; l < r; l++, r--) {
      swap(s[l], s[r]);
    }
  }
};
