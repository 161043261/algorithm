#include <functional>
#include <queue>
#include <vector>

using namespace std;

class Solution {
 public:
  vector<int> processQueries(int c, vector<vector<int>>& connections,
                             vector<vector<int>>& queries) {
    auto graph = vector<vector<int>>(c + 1, vector<int>{});
    for (auto& conn : connections) {
      auto x = conn[0];
      auto y = conn[1];
      graph[x].emplace_back(y);
      graph[y].emplace_back(x);
    }

    auto heapIdArr = vector<int>(c + 1, -1);

    auto cmp = [&](int a, int b) { return a > b; };
    auto heapList =
        vector<priority_queue<int, vector<int>, function<bool(int, int)>>>{};

    function<void(
        priority_queue<int, vector<int>, function<bool(int, int)>> & pq, int)>
        dfs;
    dfs = [&](priority_queue<int, vector<int>, function<bool(int, int)>>& pq,
              int x) {
      heapIdArr[x] = heapList.size();
      pq.push(x);
      for (auto y : graph[x]) {
        if (heapIdArr[y] == -1) {
          dfs(pq, y);
        }
      }
    };

    for (auto i = 1; i <= c; i++) {
      if (heapIdArr[i] == -1) {
        auto pq =
            priority_queue<int, vector<int>, function<bool(int, int)>>{cmp};
        dfs(pq, i);
        heapList.emplace_back(pq);
      }
    }

    auto ans = vector<int>{};
    auto offline = vector<int>(c + 1);
    for (auto& q : queries) {
      auto x = q[1];
      if (q[0] == 2) {
        offline[x] = true;
        continue;
      }

      if (!offline[x]) {
        ans.emplace_back(x);
        continue;
      }

      auto heap = heapList[heapIdArr[x]];
      while (!heap.empty() && offline[heap.top()]) {
        heap.pop();
      }
      ans.emplace_back(heap.empty() ? -1 : heap.top());
    }
    return ans;
  }
};
