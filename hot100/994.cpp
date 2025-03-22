#include <array>
#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
  vector<vector<int>> grid;
  array<array<int, 2>, 4> directions{{{1, 0}, {0, 1}, {-1, 0}, {0, -1}}};
  int freshCnt = 0;
  int ans = 0;
  vector<pair<int, int>> queue{}; // bfs

  int orangesRotting(vector<vector<int>> &grid_) {
    grid = grid_;
    init();
    bfs();
    return freshCnt == 0 ? ans : -1;
  }

  void init() {
    for (auto y = 0; y < grid.size(); y++) {
      for (auto x = 0; x < grid[0].size(); x++) {
        if (grid[y][x] == 1) {
          freshCnt++;
          continue;
        }
        if (grid[y][x] == 2) {
          queue.emplace_back(y, x);
        }
      }
    }
  }

  void bfs() {
    while (freshCnt > 0 && queue.size() > 0) {
      ans++;
      vector<pair<int, int>> newQueue{};

      while (queue.size() > 0) {
        auto pos = queue.front();
        auto y = pos.first;
        auto x = pos.second;
        // vector 删除队首元素
        queue.erase(queue.cbegin());
        // vector 删除队尾元素 queue.pop_back();

        for (const auto &direction : directions) {
          auto ny = y + direction[0];
          auto nx = x + direction[1];
          if (ny >= grid.size() || ny < 0 || nx >= grid[0].size() || nx < 0 ||
              grid[ny][nx] != 1) {
            continue;
          }
          // grid[ny][nx] == 1
          grid[ny][nx] = 2;
          freshCnt -= 1;
          newQueue.emplace_back(ny, nx);
        }
      }
      // queue.size() == 0;
      queue = newQueue;
    }
  }
};

int main() {
  vector<vector<int>> grid{{2, 1, 1}, {1, 1, 0}, {0, 1, 1}};
  auto solution = Solution{};
  auto ans = solution.orangesRotting(grid);
  cout << ans;
}
