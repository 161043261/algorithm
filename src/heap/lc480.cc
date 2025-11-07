#include <functional>
#include <queue>
#include <unordered_map>
#include <vector>

using namespace std;

template <typename T, typename Cmp = function<bool(T, T)>>
struct LazyHeap {
  Cmp cmp;
  priority_queue<T, vector<T>, Cmp> pq;
  unordered_map<T, int> removeCnts;
  size_t sz = 0;

  LazyHeap<T, Cmp>(Cmp cmp)
      : cmp(cmp),
        pq(priority_queue<T, vector<T>, Cmp>{cmp}),
        removeCnts(unordered_map<T, int>{}),
        sz(0) {}

  size_t size() { return this->sz; }

  void applyRemove() {
    while (!this->pq.empty() && this->removeCnts[pq.top()] > 0) {
      this->removeCnts[pq.top()]--;
      this->pq.pop();
    }
  }

  void remove(T& t) {
    this->removeCnts[t]++;
    this->sz--;
  }

  T top() {
    this->applyRemove();
    return this->pq.top();
  }

  T pop() {
    this->applyRemove();
    this->sz--;
    auto ret = this->pq.top();
    this->pq.pop();
    return ret;
  }

  void push(T t) {
    this->pq.push(t);
    this->sz++;
  }

  T pushThenPop(T t) {
    if (this->sz > 0 && this->cmp(t, this->top())) {
      this->pq.push(t);
      auto ret = this->pq.top();
      this->pq.pop();
      return ret;
    }
    return t;
  }
};

class Solution {
 public:
  vector<double> medianSlidingWindow(vector<int>& nums, int k) {
    auto n = nums.size();
    auto ans = vector<double>(n - k + 1);
    auto leftHeap = LazyHeap<int, function<bool(int, int)>>{
        [](int a, int b) -> bool { return a < b; }};
    auto rightHeap = LazyHeap<int, function<bool(int, int)>>{
        [](int a, int b) -> bool { return a > b; }};

    for (auto i = 0; i < n; i++) {
      auto in = nums[i];
      if (leftHeap.size() == rightHeap.size()) {
        leftHeap.push(rightHeap.pushThenPop(in));
      } else {
        rightHeap.push(leftHeap.pushThenPop(in));
      }

      auto left = i + 1 - k;
      if (left < 0) {
        continue;
      }
      if (k % 2 == 0) {
        ans[left] = ((long long)(leftHeap.top()) + rightHeap.top()) / 2.;
      } else {
        ans[left] = leftHeap.top();
      }

      auto out = nums[left];
      if (out <= leftHeap.top()) {
        leftHeap.remove(out);
        if (leftHeap.size() < rightHeap.size()) {
          leftHeap.push(rightHeap.pop());
        }
      } else {
        rightHeap.remove(out);
        if (leftHeap.size() > rightHeap.size() + 1) {
          rightHeap.push(leftHeap.pop());
        }
      }
    }
    return ans;
  }
};
