#include <algorithm>
#include <iostream>
#include <vector>

using namespace std;

int main() {
  int itemNum, totalVolume;
  cin >> itemNum >> totalVolume;

  auto itemVolumes = vector<int>(itemNum, 0);
  auto itemValues = vector<int>(itemNum, 0);

  for (auto i = 0; i < itemNum; i++) {
    cin >> itemVolumes[i];
  }

  for (auto i = 0; i < itemNum; i++) {
    cin >> itemValues[i];
  }

  auto dp = vector<vector<int>>(itemNum + 1, vector<int>(totalVolume + 1, 0));

  for (auto i = 1; i <= itemNum; i++) {
    for (auto j = 1; j <= totalVolume; j++) {
      if (j < itemVolumes[i - 1]) {
        dp[i][j] = dp[i - 1][j];
        continue;
      }

      dp[i][j] = max(dp[i - 1][j],
                     dp[i - 1][j - itemVolumes[i - 1]] + itemValues[i - 1]);
    }
  }

  cout << dp[itemNum][totalVolume] << endl;
}
