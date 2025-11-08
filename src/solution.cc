#include <bit>
#include <climits>
#include <vector>

using namespace std;

class Solution {
  using bigint = long long;

 public:
  long long maxPower(vector<int>& stations, int r, int k) {
    auto n = int(stations.size());
    auto preSum = vector<bigint>(n + 1);
    for (auto i = 0; i < n; i++) {
      preSum[i + 1] = preSum[i] + stations[i];
    }
    auto power = vector<bigint>(n);
    auto minPower = LLONG_MAX;

    for (auto i = 0; i < n; i++) {
      power[i] = preSum[min(i + r + 1, n)] - preSum[max(i - r, 0)];
      minPower = min(minPower, power[i]);
    }

    auto check = [&](bigint low) -> bool {
      auto diff = vector<bigint>(n + 1);
      auto sumDiff = 0LL;
      auto newCnt = 0LL;
      for (auto i = 0; i < n; i++) {
        sumDiff += diff[i];
        auto m = low - (power[i] + sumDiff);
        if (m <= 0) {
          continue;
        }
        newCnt += m;
        if (newCnt > k) {
          return false;
        }
        sumDiff += m;
        diff[min(i + r * 2 + 1, n)] -= m;
      }
      return true;
    };

    bigint left = minPower + k / n;
    bigint right = minPower + k + 1;
    while (left + 1 < right) {
      bigint mid = left + (right - left) / 2;
      (check(mid) ? left : right) = mid;
    }
    return left;
  }
};

int minimumOneBitOperations(int n) {
  if (n == 0) {
    return 0;
  }
  int k = bit_width((uint32_t)n);
  return (1 << k) - 1 - minimumOneBitOperations(n - (1 << (k - 1)));
}
