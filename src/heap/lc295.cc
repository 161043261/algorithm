#include <functional>
#include <queue>

using namespace std;

class MedianFinder {
  // Maximum Heap
  priority_queue<int, vector<int>, function<bool(int, int)>> leftHeap =
      priority_queue<int, vector<int>, function<bool(int, int)>>{
          [](int a, int b) -> bool { return a < b; }};

  // Minimum Heap
  priority_queue<int, vector<int>, function<bool(int, int)>> rightHeap =
      priority_queue<int, vector<int>, function<bool(int, int)>>{
          [](int a, int b) -> bool { return a > b; }};

 public:
  MedianFinder() {}

  void addNum(int num) {
    if (this->leftHeap.size() == this->rightHeap.size()) {
      this->rightHeap.push(num);
      this->leftHeap.push(this->rightHeap.top());
      this->rightHeap.pop();
    } else {
      this->leftHeap.push(num);
      this->rightHeap.push(this->leftHeap.top());
      this->leftHeap.pop();
    }
  }

  double findMedian() {
    if (this->leftHeap.size() > this->rightHeap.size()) {
      return this->leftHeap.top();
    }
    return (this->leftHeap.top() + this->rightHeap.top()) / 2.;
  }
};
