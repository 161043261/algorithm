#include <numeric>
#include <set>
#include <vector>

using namespace std;

class Solution {
 public:
  long long minimumCost(vector<int>& nums, int k, int dist) {
    k--;

    auto leftSum = accumulate(nums.begin(), nums.begin() + dist + 2, 0LL);

    auto cmp = [&](int a, int b) { return a < b; };
    auto leftMultiSet = multiset<int, decltype(cmp)>(
        nums.begin() + 1, nums.begin() + dist + 2, cmp);

    auto rightMultiSet = multiset<int, decltype(cmp)>(cmp);

    auto left2right = [&]() {
      // auto leftMaxPtr = leftMultiSet.rbegin();
      auto leftMaxPtr = --leftMultiSet.end();

      // auto leftMax = *leftMaxPtr;
      auto leftMax = *leftMaxPtr;
      leftSum -= leftMax;

      // leftMultiSet.erase(leftMultiSet.find(leftMax));
      leftMultiSet.erase(leftMaxPtr);
      rightMultiSet.insert(leftMax);
    };

    auto right2left = [&]() {
      auto rightMinPtr = rightMultiSet.begin();

      auto rightMin = *rightMinPtr;
      leftSum += rightMin;

      rightMultiSet.erase(rightMinPtr);
      leftMultiSet.insert(rightMin);
    };

    while (leftMultiSet.size() > k) {
      left2right();
    }

    auto ans = leftSum;
    for (auto i = dist + 2; i < nums.size(); i++) {
      auto out = nums[i - dist - 1];
      auto it = leftMultiSet.find(out);
      if (it != leftMultiSet.end()) {
        leftSum -= out;
        leftMultiSet.erase(it);
      } else {
        rightMultiSet.erase(rightMultiSet.find(out));
      }

      auto in = nums[i];
      if (in < *leftMultiSet.rbegin()) {
        leftSum += in;
        leftMultiSet.insert(in);
      } else {
        rightMultiSet.insert(in);
      }

      if (leftMultiSet.size() == k - 1) {
        right2left();
      } else if (leftMultiSet.size() == k + 1) {
        left2right();
      }
      ans = min(ans, leftSum);
    }
    return ans;
  }
};
