#include <climits>
#include <vector>

using namespace std;

class Solution {
 public:
  // 线段树
  vector<int> segmentTree;
  vector<int> baskets;

  void build(int left, int right, int root) {
    if (left == right) {
      this->segmentTree[root] = this->baskets[left];
      return;
    }

    int mid = left + ((right - left) >> 1);
    this->build(left, mid, root * 2);
    this->build(mid + 1, right, root * 2 + 1);

    this->segmentTree[root] =
        max(this->segmentTree[root * 2], this->segmentTree[root * 2 + 1]);
  }

  int query(int left, int right, int queryLeft, int queryRight, int node) {
    if (queryLeft > right || queryRight < left) {
      return INT_MIN;
    }
    if (queryLeft <= left && right <= queryRight) {
      return this->segmentTree[node];
    }
    auto mid = left + ((right - left) >> 1);
    return max(
        this->query(left, mid, queryLeft, queryRight, node * 2),
        this->query(mid + 1, right, queryLeft, queryRight, node * 2 + 1));
  }

  void update(int left, int right, int pos, int val, int root) {
    if (left == right) {
      this->segmentTree[pos] = val;
      return;
    }
    auto mid = left + ((right - left) >> 1);
    if (pos <= mid) {
      this->update(left, mid, pos, val, root * 2);
    } else {
      this->update(mid + 1, right, pos, val, root * 2 + 1);
    }
    this->segmentTree[root] =
        max(this->segmentTree[root * 2], this->segmentTree[root * 2 + 1]);
  }

  int numOfUnplacedFruits(vector<int>& fruits, vector<int>& baskets) {
    if (baskets.size() == 0) {
      return fruits.size();
    }

    this->segmentTree = vector<int>(baskets.size() * 4);
    this->baskets = baskets;
    build(0, baskets.size() - 1, 1);
    auto ans = 0;

    for (auto i = 0; i < fruits.size(); i++) {
      auto left = 0;
      auto right = static_cast<int>(baskets.size() - 1);
      auto res = -1;
      while (left <= right) {
        auto mid = left + ((right - left) >> 1);
        if (this->query(0, baskets.size() - 1, 0, mid, 1) >= fruits[i]) {
          res = mid;
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      }

      if (res != -1 && baskets[res] >= fruits[i]) {
        update(0, baskets.size() - 1, res, INT_MIN, 1);
      } else {
        ans++;
      }
    }
    return ans;
  }
};
