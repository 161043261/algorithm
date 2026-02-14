#include <queue>
#include <vector>

using namespace std;

class Solution {
 public:
  int minCost(int n, vector<vector<int>>& edges) {
    auto graph = vector<vector<pair<int, int>>>(n);
    for (auto& edge : edges) {
      auto u = edge[0], v = edge[1], w = edge[2];
      graph[u].emplace_back(v, w);
      graph[v].emplace_back(u, w * 2);
    }
    auto dis = vector<int>(n, INT_MAX);
    auto pq =
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>>();
    dis[0] = 0;
    pq.emplace(0, 0);
    while (!pq.empty()) {
      auto [dis_x, x] = pq.top();
      pq.pop();
      if (dis_x > dis[x]) {
        continue;
      }
      if (x == n - 1) {
        return dis_x;
      }
      for (auto& [y, wt] : graph[x]) {
        auto new_dis_y = dis_x + wt;
        if (new_dis_y < dis[y]) {
          dis[y] = new_dis_y;
          pq.emplace(new_dis_y, y);
        }
      }
    }
    return -1;
  };
};
