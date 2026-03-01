#include <algorithm>
#include <iostream>
#include <unordered_map>
#include <vector>

using namespace std;

class Solution {
 public:
  int minMeetingRooms(vector<vector<int>>& intervals) {
    auto diffMap = unordered_map<int, int>{};
    for (auto interval : intervals) {
      auto start = interval[0];
      auto end = interval[1];
      if (diffMap.find(start) != diffMap.end()) {
        diffMap[start]++;
      } else {
        diffMap[start] = 1;
      }
      if (diffMap.find(end + 1) != diffMap.end()) {
        diffMap[end + 1]--;
      } else {
        diffMap[end + 1] = -1;
      }
    }
    auto entries = vector<vector<int>>{};
    for (auto iter = diffMap.begin(); iter != diffMap.end(); iter++) {
      entries.push_back(vector<int>{iter->first, iter->second});
    }
    sort(entries.begin(), entries.end(), [&](auto a, auto b) {
      if (a[0] != b[0]) {
        return a[0] - b[0];
      }
      return a[1] - b[1];
    });
    for_each(entries.begin(), entries.end(),
             [&](auto item) { cout << item[0] << " " << item[1]; });
    auto ans = 0;
    auto cur = 0;
    for (auto item : entries) {
      auto delta = item[1];
      cur += delta;
      ans = max(ans, cur);
    }
    return ans;
  }
};

int main() {
  auto intervals = vector<vector<int>>{{0, 30}, {5, 10}, {15, 20}};
  auto ans = Solution{}.minMeetingRooms(intervals);
  cout << ans << endl;
}
