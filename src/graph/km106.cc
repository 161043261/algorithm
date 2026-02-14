#include <iostream>
#include <vector>

using namespace std;

int main() {
  int rowNum, colNum;
  cin >> rowNum >> colNum;

  auto step = vector<pair<int, int>>{{1, 0}, {0, 1}, {-1, 0}, {0, -1}};

  auto grid = vector<vector<int>>(rowNum, vector<int>(colNum, 0));

  for (auto y = 0; y < rowNum; y++) {
    for (auto x = 0; x < colNum; x++) {
      cin >> grid[y][x];
    }
  }

  auto ans = 0;

  for (auto y = 0; y < rowNum; y++) {
    for (auto x = 0; x < colNum; x++) {
      if (grid[y][x] == 1) {
        for (const auto& item : step) {
          auto dy = item.first;
          auto dx = item.second;
          auto nextY = y + dy;
          auto nextX = x + dx;
          if (nextY < 0 || nextY >= rowNum || nextX < 0 || nextX >= colNum ||
              grid[nextY][nextX] == 0) {
            ans++;
          }
        }
      }
    }
  }

  cout << ans << endl;
}
