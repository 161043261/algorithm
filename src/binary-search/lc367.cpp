class Solution {
 public:
  bool isPerfectSquare(int num) {
    auto l = 0;
    auto r = num;
    while (l <= r) {
      auto m = (long long)(l + ((r - l) >> 1));
      if (m * m == num) {
        return true;
      }
      if (m * m < num) {
        if ((m + 1) * (m + 1) > num) {
          return false;
        }
        l = m + 1;
      } else {
        r = m - 1;
      }
    }
    return false;
  }
};
