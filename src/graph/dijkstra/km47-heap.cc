#include <climits>
#include <iostream>
#include <list>
#include <queue>
#include <utility>
#include <vector>

using namespace std;

struct CustomCompare {
  bool operator()(const pair<int, int>& lhs, const pair<int, int>& rhs) {
    return lhs.second /** minDist */ > rhs.second /** minDist */;
  }
};

struct Edge {
  int end;
  int val;
};

int main() {
  int vertexNum, edgeNum;
  cin >> vertexNum >> edgeNum;

  auto grid = vector<list<Edge>>(vertexNum + 1);

  auto start_ = 0, end_ = 0, val_ = 0;
  for (auto i = 0; i < edgeNum; i++) {
    cin >> start_ >> end_ >> val_;

    auto edge = Edge();
    edge.end = end_;
    edge.val = val_;

    grid[start_].emplace_back(edge);
  }

  const auto start = 1;
  const auto end = vertexNum;

  auto minDist = vector<int>(vertexNum + 1, INT_MAX);
  auto inTree = vector<bool>(vertexNum + 1, false);

  auto minHeap = priority_queue<
      pair<int /** vertexIdx */, int /** minDist */> /** elementType */,
      vector<pair<int, int>> /** containerType */,
      CustomCompare /** customCompare */>();

  minHeap.push(pair<int, int>(start /** vertexIdx */, 0 /** minDist */));
  minDist[start] = 0;

  while (!minHeap.empty()) {
    auto cur = minHeap.top();
    minHeap.pop();

    if (inTree[cur.first /** vertexIdx */]) {
      // cout << "vertexIdx " << cur.first << " already in tree" << endl;
      continue;
    }

    inTree[cur.first /** vertexIdx */] = true;
    for (auto& edge : grid[cur.first]) {
      if (!inTree[edge.end] &&
          minDist[cur.first /** vertexIdx */] + edge.val < minDist[edge.end]) {
        minDist[edge.end] = minDist[cur.first] + edge.val;
        minHeap.push(pair<int, int>(edge.end /** vertexIdx */,
                                    minDist[edge.end] /** minDist */));
      }
    }
  }

  if (minDist[end] == INT_MAX) {
    cout << -1 << endl;
  } else {
    cout << minDist[end] << endl;
  }
}
