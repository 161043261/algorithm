#include <algorithm>
#include <condition_variable>
#include <iostream>
#include <mutex>
#include <queue>
#include <unordered_map>
#include <vector>

using namespace std;

struct WaitGroup {
 private:
  mutex mtx;
  condition_variable cv;
  size_t cnt = 0;

 public:
  void add(size_t n) {
    lock_guard<mutex> _{mtx};
    this->cnt += n;
  }

  void done() {
    lock_guard<mutex> _{mtx};
    if (this->cnt > 0) {
      this->cnt--;
      if (this->cnt == 0) {
        this->cv.notify_all();
      }
    }
  }

  void Wait() {
    auto _ = unique_lock<mutex>{mtx};
    cv.wait(_, [&]() { return this->cnt == 0; });
  }
};

class Solution {
 public:
  vector<int> findXSum(vector<int>& nums, int k, int x) {
    auto num2cnt = unordered_map<int, int>{};
    for (auto i = 0; i < k; i++) {
      num2cnt[nums[i]]++;
    }
    auto ans = vector<int>(nums.size() - k + 1, 0);
    for (auto i = 0; i <= int(nums.size()) - k; i++) {
      if (i > 0) {
        num2cnt[nums[i - 1]]--;
        num2cnt[nums[i + k - 1]]++;
      }

      auto kvs = vector<pair<int, int>>(num2cnt.begin(), num2cnt.end());
      // for_each(kvs.begin(), kvs.end(), [&](pair<int, int>& item) {
      //   cout << "{" << item.first << "," << item.second << "} ";
      // });
      // cout << endl;

      auto cmp = [&](pair<int, int>& a, pair<int, int>& b) -> bool {
        if (a.second == b.second) {
          return a.first > b.first;
        }
        return a.second > b.second;
      };
      auto pq =
          priority_queue<pair<int, int>, vector<pair<int, int>>, decltype(cmp)>{
              cmp};
      for (auto& kv : kvs) {
        pq.emplace(kv);
        if (pq.size() > x) {
          pq.pop();
        }
      }
      while (!pq.empty()) {
        auto [num, cnt] = pq.top();
        ans[i] += (num * cnt);
        pq.pop();
      }
    }
    return ans;
  }
};

int main() {
  auto nums = vector<int>{1, 1, 2, 2, 3, 4, 2, 3};
  auto _ = Solution{};
  auto ans = _.findXSum(nums, 6, 2);
  // for_each(ans.begin(), ans.end(), [&](auto& item) { cout << item << " "; });
  cout << endl;
}
