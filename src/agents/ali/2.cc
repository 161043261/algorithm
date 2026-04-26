#include <algorithm>
#include <iostream>
#include <vector>

using namespace std;

struct Interval {
  int r;
  int l;
  long long w;
};

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int t;
  cin >> t;
  while (t--) {
    int n, m;
    cin >> n >> m;

    vector<long long> prefix(n + 1, 0);
    for (int i = 1; i <= n; ++i) {
      long long x;
      cin >> x;
      prefix[i] = prefix[i - 1] + x;
    }

    vector<Interval> intervals;
    intervals.reserve(m);
    for (int i = 0; i < m; ++i) {
      int l, r;
      cin >> l >> r;
      long long w = prefix[r] - prefix[l - 1];
      intervals.push_back({r, l, w});
    }

    sort(intervals.begin(), intervals.end(),
         [](const Interval& a, const Interval& b) {
           if (a.r != b.r) {
             return a.r < b.r;
           }
           return a.l < b.l;
         });

    vector<int> ends(m);
    for (int i = 0; i < m; ++i) {
      ends[i] = intervals[i].r;
    }

    vector<long long> dp(m + 1, 0);
    for (int i = 1; i <= m; ++i) {
      const auto& cur = intervals[i - 1];
      int prev = lower_bound(ends.begin(), ends.end(), cur.l) - ends.begin();
      dp[i] = max(dp[i - 1], dp[prev] + cur.w);
    }

    cout << dp[m] << '\n';
  }

  return 0;
}
