#include <climits>
#include <iostream>
#include <vector>

using namespace std;

int main() {
  int vertexNum, edgeNum;
  cin >> vertexNum >> edgeNum;

  auto edges = vector<vector<int>>();

  for (int i = 0; i < edgeNum; i++) {
    int start, end, price;
    cin >> start >> end >> price;
    auto item = vector<int>{start, end, price};
    edges.emplace_back(item);
  }

  auto minDist = vector<int>(vertexNum + 1, INT_MAX);
  const auto start = 1;
  const auto end = vertexNum;

  minDist[start] = 0;
  for (auto i = 0; i < vertexNum - 1; i++) {
    auto updated = false;
    for (auto& edge : edges) {
      auto from = edge[0];
      auto to = edge[1];
      auto price = edge[2];

      if (minDist[from] != INT_MAX && minDist[to] > minDist[from] + price) {
        updated = true;
        minDist[to] = minDist[from] + price;
      }
    }

    if (!updated) {
      break;
    }
  }

  if (minDist[end] == INT_MAX) {
    cout << "unconnected" << endl;
  } else {
    cout << minDist[end] << endl;
  }
}
