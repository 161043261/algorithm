#include <unordered_set>
#include <vector>

using namespace std;

class Solution {
 public:
  vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
    auto numsSet1 = unordered_set(nums1.begin(), nums1.end());
    auto numsSet2 = unordered_set<int>{};
    for (auto& num2 : nums2) {
      if (numsSet1.contains(num2)) {
        numsSet2.emplace(num2);
      }
    }
    return vector<int>(numsSet2.begin(), numsSet2.end());
  }
};
