#!/bin/bash

# sudo apt install build-essential clang clang-format clangd cmake gdb lld llvm ninja-build -y

if [ -z "$1" ]; then
  PROJECT="cmake-app"
else
  PROJECT=$1
fi

if [ -d "$PROJECT" ]; then
  rm -rf "$PROJECT"
fi

mkdir $PROJECT

cd $PROJECT

cat <<EOL >CMakeLists.txt
cmake_minimum_required(VERSION 3.21)

project($PROJECT)

set(CMAKE_C_STANDARD 23)
set(CMAKE_C_STANDARD_REQUIRED ON)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# set(CMAKE_C_COMPILER gcc)
set(CMAKE_C_COMPILER clang)

# set(CMAKE_C_COMPILER g++)
set(CMAKE_C_COMPILER clang++)

add_executable($PROJECT ./src/main.h ./src/main.cc)

find_package(Threads REQUIRED)
target_link_libraries($PROJECT Threads::Threads)

find_program(CLANG_FORMAT clang-format)
if(CLANG_FORMAT)
  add_custom_target(format ALL
    COMMAND \${CLANG_FORMAT} -i -style=google
    \${CMAKE_SOURCE_DIR}/src/*.h
    \${CMAKE_SOURCE_DIR}/src/*.cc
  )
else()
  message(WARNING "clang-format not found")
endif()
EOL

mkdir src

cat <<EOL >src/main.h
//
// Created by $(whoami) on $(date +"%Y/%m/%d").
//

#ifndef MAIN_H
#define MAIN_H

#endif // MAIN_H
EOL

cat <<EOL >src/main.cc
//
// Created by $(whoami) on $(date +"%Y/%m/%d").
//

#include "main.h"

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
EOL

mkdir build && cd build
cmake .. && ninja

./${PROJECT}

echo ==================== Done! ====================
