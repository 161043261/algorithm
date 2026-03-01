#include <vector>

using namespace std;

class Solution {
 public:
  int curX = 0;
  int curY = 0;
  int curVal = 0;
  int n = 0;
  bool isGenerating = true;
  vector<vector<int>> ans;

  vector<vector<int>> generateMatrix(int n_) {
    curX = 0;
    curY = 0;
    curVal = 1;
    n = n_;
    ans = vector<vector<int>>(n_, vector<int>(n, -1));
    ans[0][0] = 1;
    while (isGenerating) {
      turnRight()->turnDown()->turnLeft()->turnUp();
    }
    return ans;
  }

  Solution* turnRight() {
    if (!isGenerating) {
      return this;
    }
    isGenerating = false;
    while (true) {
      if (curY == n - 1 || (curY + 1 < n && ans[curX][curY + 1] != -1)) {
        break;
      }
      isGenerating = true;
      curVal++;
      ans[curX][curY + 1] = curVal;
      curY++;
    }
    return this;
  }

  Solution* turnDown() {
    if (!isGenerating) {
      return this;
    }
    isGenerating = false;
    while (true) {
      if (curX == n - 1 || (curX + 1 < n && ans[curX + 1][curY] != -1)) {
        break;
      }
      isGenerating = true;
      curVal++;
      ans[curX + 1][curY] = curVal;
      curX++;
    }
    return this;
  }

  Solution* turnLeft() {
    if (!isGenerating) {
      return this;
    }
    isGenerating = false;
    while (true) {
      if (curY == 0 || (curY - 1 >= 0 && ans[curX][curY - 1] != -1)) {
        break;
      }
      isGenerating = true;
      curVal++;
      ans[curX][curY - 1] = curVal;
      curY--;
    }
    return this;
  }

  Solution* turnUp() {
    if (!isGenerating) {
      return this;
    }
    isGenerating = false;
    while (true) {
      if (curX == 0 || (curX - 1 >= 0 && ans[curX - 1][curY] != -1)) {
        break;
      }
      isGenerating = true;
      curVal++;
      ans[curX - 1][curY] = curVal;
      curX--;
    }
    return this;
  }
};
