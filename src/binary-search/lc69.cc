class Solution {
 public:
  int mySqrt(int x) {
    auto l = 0;
    auto r = x;
    while (l <= r) {
      auto m = (long long)(l + ((r - l) >> 1));
      if (m * m == x) {
        return m;
      }
      if (m * m < x) {
        if ((m + 1) * (m + 1) > x) {
          return m;
        }
        l = m + 1;
      } else {
        r = m - 1;
      }
    }
    return l;
  }
};
