#include <vector>

using namespace std;

class Solution {
 public:
  vector<int> spiralArray(vector<vector<int>>& array) {
    if (array.size() == 0 || array[0].size() == 0) {
      return {};
    }

    int n = array.size(), m = array[0].size();
    vector<int> ans;
    int l = 0, r = m - 1, t = 0, b = n - 1;
    while (l <= r && t <= b) {
      for (int x = l; x <= r; x++) {
        ans.push_back(array[t][x]);
      }
      for (int y = t + 1; y <= b; y++) {
        ans.push_back(array[y][r]);
      }
      if (l < r && t < b) {
        for (int x = r - 1; x > l; x--) {
          ans.push_back(array[b][x]);
        }
        for (int y = b; y > t; y--) {
          ans.push_back(array[y][l]);
        }
      }
      l++;
      r--;
      t++;
      b--;
    }
    return ans;
  }
};
