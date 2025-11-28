#include <condition_variable>
#include <mutex>

using namespace std;

struct WaitGroup {
 private:
  mutex mtx;
  condition_variable cv;
  size_t cnt = 0;

 public:
  void add(size_t n) {
    lock_guard<mutex> _{mtx};
    this->cnt += n;
  }

  void done() {
    lock_guard<mutex> _{mtx};
    if (this->cnt > 0) {
      this->cnt--;
      if (this->cnt == 0) {
        this->cv.notify_all();
      }
    }
  }

  void wait() {
    auto _ = unique_lock<mutex>{mtx};
    cv.wait(_, [&]() { return this->cnt == 0; });
  }
};
