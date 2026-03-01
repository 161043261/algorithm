#include <vector>

using namespace std;

class Solution {
 public:
  int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
    auto arr = vector<int>(gas.size() + 1, 0);
    auto minIdx = 0;
    for (auto i = 1; i <= gas.size(); i++) {
      arr[i] = arr[i - 1] + gas[i - 1] - cost[i - 1];
      if (arr[i] < arr[minIdx]) {
        minIdx = i;
      }
    }
    if (arr[arr.size() - 1] < 0) {
      return -1;
    }
    return minIdx;
  }
};
