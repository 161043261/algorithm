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

  auto f = vector<int>(totalVolume + 1, 0);

  for (auto i = 1; i <= itemNum; i++) {
    // 倒序
    for (auto j = totalVolume; j >= 1; j--) {
      if (j < itemVolumes[i - 1]) {
        continue;
      }

      f[j] = max(f[j], f[j - itemVolumes[i - 1]] + itemValues[i - 1]);
    }
  }

  cout << f[totalVolume] << endl;
}
