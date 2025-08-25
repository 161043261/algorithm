#include <vector>

using namespace std;

class Solution {
 public:
  vector<int> findDiagonalOrder(vector<vector<int>>& mat) {
    auto matH = static_cast<int>(mat.size());
    auto matW = static_cast<int>(mat[0].size());
    auto ans = vector<int>();

    auto ld2rt = [&](int y, int x) {
      for (auto i = 0; i < matH; i++, y--, x++) {
        if (y < 0 or y >= matH or x < 0 or x >= matW) {
          continue;
        }
        ans.emplace_back(mat[y][x]);
      }
    };

    auto rt2ld = [&](int y, int x) {
      for (auto i = 0; i < matH; i++, y++, x--) {
        if (y < 0 or y >= matH or x < 0 or x >= matW) {
          continue;
        }
        ans.emplace_back(mat[y][x]);
      }
    };

    auto loop = (matH + matW) / 2;
    for (auto i = 0, x = -matH + 1, x2 = 1; i < loop; i++, x += 2, x2 += 2) {
      ld2rt(matH - 1, x);
      rt2ld(0, x2);
    }

    return ans;
  }
};

int main() {
  auto mat = vector<vector<int>>{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
  Solution().findDiagonalOrder(mat);
}
