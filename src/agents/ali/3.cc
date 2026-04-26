#include <algorithm>
#include <iostream>
#include <vector>

using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int t;
  cin >> t;
  while (t--) {
    int n;
    cin >> n;

    vector<int> stack;
    stack.reserve(n);
    int base = 0;
    for (int i = 0; i < n; ++i) {
      int x;
      cin >> x;
      if (!stack.empty() && stack.back() == x) {
        stack.pop_back();
        ++base;
      } else {
        stack.push_back(x);
      }
    }

    if (stack.empty()) {
      cout << base << '\n';
      continue;
    }

    int m = static_cast<int>(stack.size());
    vector<int> d1(m, 0);
    int left = 0;
    int right = -1;
    int best = 1;

    for (int i = 0; i < m; ++i) {
      int k = 1;
      if (i <= right) {
        int mirror = left + right - i;
        k = min(d1[mirror], right - i + 1);
      }

      while (i - k >= 0 && i + k < m && stack[i - k] == stack[i + k]) {
        ++k;
      }

      d1[i] = k;
      best = max(best, k);
      if (i + k - 1 > right) {
        left = i - k + 1;
        right = i + k - 1;
      }
    }

    cout << base + best << '\n';
  }

  return 0;
}
