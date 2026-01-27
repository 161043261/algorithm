#include <vector>

using namespace std;

class Solution {
public:
  bool lemonadeChange(vector<int> &bills) {
    auto cnt5 = 0;
    auto cnt10 = 0;
    for (auto i = 0; i < bills.size(); i++) {
      if (bills[i] == 5) {
        cnt5++;
        continue;
      }

      if (bills[i] == 10) {
        if (cnt5 == 0) {
          return false;
        }
        cnt5--;
        cnt10++;
        continue;
      }

      if (bills[i] == 20) {
        if (cnt10 > 0 && cnt5 > 0) {
          cnt10--;
          cnt5--;
          continue;
        }
        if (cnt5 >= 3) {
          cnt5 -= 3;
          continue;
        }
        return false;
      }
    }
    return true;
  }
};
