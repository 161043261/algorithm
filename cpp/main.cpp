//
// Created by user on 2025/03/02.
//

#include "main.hpp"

#include <functional>
#include <iostream>
#include <mutex>
#include <thread>

using namespace std;

class Foo {
  mutex mtx1, mtx2;
  unique_lock<mutex> lock1, lock2;

 public:
  Foo() : lock1(mtx1, try_to_lock), lock2(mtx2, try_to_lock) {}

  void first(function<void()> printFirst) {
    printFirst();
    lock1.unlock();
  }

  void second(function<void()> printSecond) {
    lock_guard<mutex> guard(mtx1);
    printSecond();
    lock2.unlock();
  }

  void third(function<void()> printThird) {
    lock_guard<mutex> guard(mtx2);
    printThird();
  }
};

int main() {
  Foo foo;

  auto printFirst = []() { cout << "first" << endl; };
  auto printSecond = []() { cout << "second" << endl; };
  auto printThird = []() { cout << "third" << endl; };

  thread t3{&Foo::third, &foo, printThird};
  thread t2{&Foo::second, &foo, printSecond};
  thread t1{&Foo::first, &foo, printFirst};

  t1.join();
  t2.join();
  t3.join();

  return 0;
}
