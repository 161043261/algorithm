#include <cstddef>
#include <unordered_map>
#include <vector>

using namespace std;

class Solution {
 public:
  vector<int> topKFrequent(vector<int>& nums, int k) {
    auto num2cnt = unordered_map<int, int>{};
    auto maxCnt = 0;
    for (auto& num : nums) {
      num2cnt[num]++;
      maxCnt = max(maxCnt, num2cnt[num]);
    }
    auto buckets = vector<vector<int>>{size_t(maxCnt + 1), vector<int>{}};
    for (auto& [num, cnt] : num2cnt) {
      buckets[cnt].push_back(num);
    }
    auto ans = vector<int>{};
    for (auto i = maxCnt; i >= 0 && ans.size() < k; i--) {
      ans.insert(ans.end(), buckets[i].begin(), buckets[i].end());
    }
    return ans;
  }
};
