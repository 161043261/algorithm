#include <vector>

using namespace std;

vector<vector<char>> grid{};
vector<vector<bool>> visited;

auto directions = vector<vector<int>>{{-1, 0}, {0, 1}, {1, 0}, {0, -1}};

void dfs(int y, int x);  // declare

auto dfs(int y, int x) -> void {
  visited[y][x] = true;
  for (auto direction : directions) {
    auto dy = direction[0];
    auto dx = direction[1];
    auto y2 = y + dy;
    auto x2 = x + dx;
    if (y2 >= 0 && y2 < grid.size() && x2 >= 0 && x2 < grid[0].size() &&
        !visited[y2][x2] && grid[y2][x2] == '1') {
      dfs(y2, x2);
    }
  }
}
auto ans = 0;

auto fn() {
  visited =
      vector<vector<bool>>(grid.size(), vector<bool>(grid[0].size(), false));
  for (auto y = 0; y < grid.size(); y++) {
    for (auto x = 0; x < grid[0].size(); x++) {
      if (!visited[y][x] && grid[y][x] == '1') {
        ans++;
        dfs(y, x);
      }
    }
  }
}

class Solution {
 public:
  int numIslands(vector<vector<char>> &grid_) {
    ans = 0;
    grid = grid_;
    fn();
    return ans;
  }
};

int main() {
  auto testcase = new Solution();
  vector<vector<char>> grid{
      {'1', '1', '1', '1', '0'},
      {'1', '1', '0', '1', '0'},
      {'1', '1', '0', '0', '0'},
      {'0', '0', '0', '0', '0'},
  };
  testcase->numIslands(grid);
}
