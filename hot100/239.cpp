#include <algorithm>
#include <iostream>
#include <queue>
#include <vector>

using namespace std;

struct PairComparator {
  bool operator()(pair<int, int> &a, pair<int, int> &b) {
    return a.first < b.first;
  }
};

class Solution {
public:
  vector<int> maxSlidingWindow(vector<int> &nums, int k) {
    // 自定义比较器
    priority_queue<pair<int, int>, vector<pair<int, int>>, PairComparator> pq(
        PairComparator{});
    for (auto i = 0; i < k; i++) {
      pq.emplace(nums[i], i);
    }
    vector<int> ans = {pq.top().first};
    for (auto i = k; i < nums.size(); i++) {
      pq.emplace(nums[i], i);
      while (pq.top().second <= i - k) {
        pq.pop();
      }
      ans.emplace_back(pq.top().first);
      // ans.push_back(pq.top().first);
    }
    for_each(ans.cbegin(), ans.cend(),
               [](const auto &item) { cout << item << " "; });
    return ans;
  };
};

int main() {
  vector<int> nums{1, 3, -1, -3, 5, 3, 6, 7};
  auto k = 3;
  Solution solution{};
  solution.maxSlidingWindow(nums, k);

  return 0;
}
