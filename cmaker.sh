#!/bin/bash

# sudo apt install build-essential clang clang-format clangd cmake gdb lld llvm ninja-build -y

if [ -z "$1" ]; then
  cmake_app="cmake-app"
else
  cmake_app=$1
fi

if [ -d "$cmake_app" ]; then
  rm -rf "$cmake_app"
fi

mkdir $cmake_app

cd $cmake_app

cat <<EOL >CMakeLists.txt
cmake_minimum_required(VERSION 3.21)

set(CMAKE_C_STANDARD 23)
set(CMAKE_CXX_STANDARD 23)

# set(CMAKE_C_COMPILER gcc)
# set(CMAKE_CXX_COMPILER g++)
if (CMAKE_SYSTEM_NAME STREQUAL "Windows")
  set(CMAKE_C_COMPILER clang-cl)
  set(CMAKE_CXX_COMPILER clang-cl)
  set(CMAKE_C_STANDARD_REQUIRED OFF)
  set(CMAKE_CXX_STANDARD_REQUIRED OFF)
else()
  set(CMAKE_C_COMPILER clang)
  set(CMAKE_CXX_COMPILER clang++)
  set(CMAKE_C_STANDARD_REQUIRED ON)
  set(CMAKE_CXX_STANDARD_REQUIRED ON)
endif()

set(CMAKE_BUILD_TYPE Debug)

project($cmake_app)

add_executable(main ./src/main.cc)

find_program(CLANG_FORMAT clang-format)
if(CLANG_FORMAT)
  add_custom_target(format ALL
    COMMAND \${CLANG_FORMAT} -i -style=google
    \${CMAKE_SOURCE_DIR}/src/*.cc
  )
else()
  message(WARNING "clang-format not found")
endif()
EOL

mkdir src

cat <<EOL >src/main.cc
//
// Created by $(whoami) on $(date +"%Y/%m/%d").
//

#include <iostream>
#include <format>

using namespace std;

int main() {
  cout << format("Hello {}!\n", "World");
}
EOL

mkdir build && cd build
cmake .. -G Ninja && ninja
./main
