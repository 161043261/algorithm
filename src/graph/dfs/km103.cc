#include <functional>
#include <iostream>
#include <vector>

using namespace std;

auto step = vector<pair<int, int>>{{1, 0}, {0, 1}, {-1, 0}, {0, -1}};

int rowNum;
int colNum;

vector<vector<int>> grid;
vector<vector<bool>> leftUpVisit;
vector<vector<bool>> rightDownVisit;

int main() {
  cin >> rowNum >> colNum;
  grid = vector<vector<int>>(rowNum, vector<int>(colNum, 0));

  for (auto y = 0; y < rowNum; y++) {
    for (auto x = 0; x < colNum; x++) {
      cin >> grid[y][x];
    }
  }

  leftUpVisit = vector<vector<bool>>(rowNum, vector<bool>(colNum, false));
  rightDownVisit = vector<vector<bool>>(rowNum, vector<bool>(colNum, false));

  function<void(int, int, vector<vector<bool>>&)> dfs;

  dfs = [&](auto y, auto x, auto& visit) -> void {
    visit[y][x] = true;

    for (const auto& item : step) {
      auto dy = item.first;
      auto dx = item.second;
      auto nextY = y + dy;
      auto nextX = x + dx;
      if (nextY >= 0 && nextY < rowNum && nextX >= 0 && nextX < colNum &&
          grid[y][x] <= grid[nextY][nextX] && !visit[nextY][nextX]) {
        dfs(nextY, nextX, visit);
      }
    }
  };

  for (auto x = 0; x < colNum; x++) {
    dfs(0, x, leftUpVisit);
    dfs(rowNum - 1, x, rightDownVisit);
  }

  for (auto y = 0; y < rowNum; y++) {
    dfs(y, 0, leftUpVisit);
    dfs(y, colNum - 1, rightDownVisit);
  }

  for (auto y = 0; y < rowNum; y++) {
    for (auto x = 0; x < colNum; x++) {
      if (leftUpVisit[y][x] && rightDownVisit[y][x]) {
        cout << y << " " << x << endl;
      }
    }
  }
}
