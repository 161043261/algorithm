#include <unordered_map>
#include <vector>

using namespace std;

class Solution {
 public:
  int fourSumCount(vector<int>& nums1, vector<int>& nums2, vector<int>& nums3,
                   vector<int>& nums4) {
    auto cnt = unordered_map<int, int>{};
    for (auto& n1 : nums1) {
      for (auto& n2 : nums2) {
        cnt[n1 + n2]++;
      }
    }
    auto ans = 0;
    for (auto& n3 : nums3) {
      for (auto& n4 : nums4) {
        ans += cnt[-n3 - n4];
      }
    }
    return ans;
  }
};
