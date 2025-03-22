#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

// 判断图中是否有环
class Solution {
public:
  int n = 0;
  vector<vector<int>> graph;
  vector<int> visit;
  // 0 未访问, 1 正在访问, 2 已访问

  bool canFinish(int numCourses, vector<vector<int>> &prerequisites) {
    createGraph(prerequisites);

    for (auto i = 0; i < n; i++) {
      if (visit[i] == 0) {
        if (dfs(i)) {
          return !true; // 有环
        }
      }
    }
    return !false; // 无环
  }

  void createGraph(vector<vector<int>> &paths) {
    for_each(paths.cbegin(), paths.cend(),
             [&](const auto &path) { n = max(n, max(path[0] + 1, path[1] + 1)); });

    graph = vector<vector<int>>(n, vector<int>(n, 0));
    for_each(paths.cbegin(), paths.cend(), [&](const auto &path) {
      graph[path[1]][path[0]] = 1; // path[0] <--- path[1]
    });
    visit = vector<int>(n, 0);
  }

  bool dfs(int i) {
    if (visit[i] == 2) {
      return false; // 没有环
    }
    if (visit[i] == 1) {
      return true; // 有环
    }
    visit[i] = 1;
    for (auto x = 0; x < graph[0].size(); x++) {
      if (graph[i][x] == 1) {
        if (dfs(x)) {
          return true; // 有环
        }
      }
    }
    visit[i] = 2;
    return false; // 没有环
  }
};

int main() { cout << "Hello world" << endl; }
