//
// Updated by user on 2025/04/30.
//

#include <algorithm>
#include <array>
#include <climits>
#include <cmath>
#include <cstddef>
#include <cstdint>
#include <deque>
#include <format>
#include <functional>
#include <iostream>
#include <iterator>
#include <memory>
#include <numeric>
#include <queue>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>  // swap
#include <vector>

using namespace std;

int
snakesAndLadders(vector<vector<int>>& board) {
  auto n = static_cast<int>(board.size());
  vector<int8_t> visited(n * n + 1);
  visited[1] = true;
  vector<int> q{1};
  for (auto step = 0; !q.empty(); step++) {
    auto temp = q;
    q.clear();
    for (auto x : temp) {
      if (x == n * n) {
        return step;
      }
      for (auto y = x + 1; y <= min(x + 6, n * n); y++) {
        auto r = (y - 1) / n;
        auto c = (y - 1) % n;
        if (r % 2 /** == 1 */) {
          c = n - 1 - c;
        }
        auto next = board[n - 1 - r][c];
        if (next < 0) {
          next = y;
        }
        if (!visited[next]) {
          visited[next] = true;
          q.emplace_back(next);
        }
      }
    }
  }
  return -1;
}

class Solution {
 public:
  int snakesAndLadders(vector<vector<int>>& board) { return snakesAndLadders(board); }
};
