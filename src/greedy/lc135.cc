#include <vector>

using namespace std;

class Solution {
 public:
  int candy(vector<int>& ratings) {
    auto leftArr = vector<int>(ratings.size(), 1);
    auto rightArr = vector<int>(ratings.size(), 1);
    for (auto i = 1; i < ratings.size(); i++) {
      if (ratings[i] > ratings[i - 1]) {
        leftArr[i] = leftArr[i - 1] + 1;
      }
    }
    auto ans = leftArr[leftArr.size() - 1];
    for (auto i = int(ratings.size()) - 2; i >= 0; i--) {
      if (ratings[i] > ratings[i + 1]) {
        rightArr[i] = rightArr[i + 1] + 1;
      }
      ans += max(leftArr[i], rightArr[i]);
    }
    return ans;
  }
};
