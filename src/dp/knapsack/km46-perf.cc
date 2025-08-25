//
// Created by ByteDance on 2025/8/15.
//

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

  auto dp = vector<int>(totalVolume + 1, 0);

  for (auto i = 1; i <= itemNum; i++) {
    // 倒序
    for (auto j = totalVolume; j >= 1; j--) {
      if (j < itemVolumes[i - 1]) {
        continue;
      }

      dp[j] = max(dp[j], dp[j - itemVolumes[i - 1]] + itemValues[i - 1]);
    }
  }

  cout << dp[totalVolume] << endl;
}