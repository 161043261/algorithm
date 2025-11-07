#include <climits>
#include <iostream>
#include <vector>

using namespace std;

int main() {
  int nodeNum, edgeNum;

  cin >> nodeNum >> edgeNum;

  auto grid = vector<vector<int>>(nodeNum + 1, vector<int>(nodeNum + 1, -1));

  for (auto i = 1; i <= nodeNum; i++) {
    grid[i][i] = 0;
  }

  int start_, end_, len_;
  for (auto i = 0; i < edgeNum; i++) {
    cin >> start_ >> end_ >> len_;
    grid[start_][end_] = len_;
  }

  auto inTree = vector<bool>(nodeNum + 1, false);
  auto minDist = vector<int>(nodeNum + 1, INT_MAX);

  int start = 1, end = nodeNum;

  minDist[start] = 0;

  for (auto i = 0; i < nodeNum - 1; i++) {
    auto minVal = INT_MAX;
    auto cur = 1;

    for (auto idx = 1; idx <= nodeNum; idx++) {
      if (!inTree[idx] && minDist[idx] < minVal) {
        minVal = minDist[idx];
        cur = idx;
      }
    }

    inTree[cur] = true;

    for (auto i = 1; i <= nodeNum; i++) {
      if (!inTree[i] && grid[cur][i] != -1 &&
          (minDist[cur] + grid[cur][i] < minDist[i])) {
        minDist[i] = minDist[cur] + grid[cur][i];
      }
    }
  }

  if (minDist[end] == INT_MAX) {
    cout << -1 << endl;
  } else {
    cout << minDist[end] << endl;
  }
}
