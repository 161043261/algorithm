#include <queue>

using namespace std;

class MyStack {
 public:
  queue<int> q1;
  queue<int> q2;

  MyStack() {}

  void push(int x) { q1.push(x); }

  int pop() {
    for (auto i = int(q1.size()); i > 1; i--) {
      q2.push(q1.front());
      q1.pop();
    }

    auto ret = q1.front();
    q1.pop();
    swap(q1, q2);
    return ret;
  }

  int top() {
    for (auto i = int(q1.size()); i > 1; i--) {
      q2.push(q1.front());
      q1.pop();
    }

    auto ret = q1.front();
    q2.push(q1.front());
    q1.pop();
    swap(q1, q2);
    return ret;
  }

  bool empty() { return q1.empty(); }
};
