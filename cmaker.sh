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

set(CMAKE_C_STANDARD 23)
set(CMAKE_C_STANDARD_REQUIRED OFF)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED OFF)

if(WIN32)
  set(CMAKE_C_COMPILER clang-cl)
  set(CMAKE_CXX_COMPILER clang-cl)
else()
  # set(CMAKE_C_COMPILER gcc)
  set(CMAKE_C_COMPILER clang)
  # set(CMAKE_CXX_COMPILER g++)
  set(CMAKE_CXX_COMPILER clang++)
endif()

project($PROJECT)

add_executable(main ./src/main.hpp ./src/main.cpp)

find_program(CLANG_FORMAT clang-format)
if(CLANG_FORMAT)
  add_custom_target(format ALL
    COMMAND \${CLANG_FORMAT} -i -style=google
    \${CMAKE_SOURCE_DIR}/src/*.hpp
    \${CMAKE_SOURCE_DIR}/src/*.cpp
  )
else()
  message(WARNING "clang-format not found")
endif()
EOL

mkdir src

cat <<EOL >src/main.hpp
//
// Created by $(whoami) on $(date +"%Y/%m/%d").
//

#ifndef MAIN_H
#define MAIN_H

#endif // MAIN_H
EOL

cat <<EOL >src/main.cpp
//
// Created by $(whoami) on $(date +"%Y/%m/%d").
//

#include "main.hpp"
#include <iostream>

using namespace std;

int main() {
  cout << "Hello world" << endl;
}
EOL

mkdir build && cd build
cmake .. -G Ninja && ninja
./main

echo "Copyright https://161043261.github.io. All rights reserved."
