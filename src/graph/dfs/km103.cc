#include <functional>
#include <iostream>
#include <vector>

using namespace std;

auto step = vector<pair<int, int>>{{1, 0}, {0, 1}, {-1, 0}, {0, -1}};

int rowNum;
int colNum;

vector<vector<int>> grid;
vector<vector<bool>> luVisit;
vector<vector<bool>> rdVisit;

int main() {
  cin >> rowNum >> colNum;
  grid = vector<vector<int>>(rowNum, vector<int>(colNum, 0));

  for (auto y = 0; y < rowNum; y++) {
    for (auto x = 0; x < colNum; x++) {
      cin >> grid[y][x];
    }
  }

  luVisit = vector<vector<bool>>(rowNum, vector<bool>(colNum, false));
  rdVisit = vector<vector<bool>>(rowNum, vector<bool>(colNum, false));

  function<void(int, int, vector<vector<bool>>&)> dfs;

  dfs = [&](int y, int x, vector<vector<bool>>& visit) -> void {
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
    dfs(0, x, luVisit);
    dfs(rowNum - 1, x, rdVisit);
  }

  for (auto y = 0; y < rowNum; y++) {
    dfs(y, 0, luVisit);
    dfs(y, colNum - 1, rdVisit);
  }

  for (auto y = 0; y < rowNum; y++) {
    for (auto x = 0; x < colNum; x++) {
      if (luVisit[y][x] && rdVisit[y][x]) {
        cout << y << " " << x << endl;
      }
    }
  }
}
