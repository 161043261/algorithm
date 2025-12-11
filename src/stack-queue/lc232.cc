#include <stack>

using namespace std;

class MyQueue {
 public:
  stack<int> stIn;
  stack<int> stOut;
  MyQueue() {}

  void push(int x) { stIn.push(x); }

  int pop() {
    if (stOut.empty()) {
      while (!stIn.empty()) {
        stOut.push(stIn.top());
        stIn.pop();
      }
    }
    auto ret = stOut.top();
    stOut.pop();
    return ret;
  }

  int peek() {
    if (stOut.empty()) {
      while (!stIn.empty()) {
        stOut.push(stIn.top());
        stIn.pop();
      }
    }
    return stOut.top();
  }

  bool empty() { return stIn.empty() && stOut.empty(); }
};
