﻿cmake_minimum_required(VERSION 3.21)

set(CMAKE_GENERATOR Ninja)
set(CMAKE_C_STANDARD 23)
set(CMAKE_CXX_STANDARD 23)

if(CMAKE_SYSTEM_NAME STREQUAL "Linux" OR CMAKE_SYSTEM_NAME STREQUAL "Darwin")
  set(CMAKE_C_COMPILER clang)
  set(CMAKE_CXX_COMPILER clang++)
else()
  set(CMAKE_C_COMPILER clang-cl)
  set(CMAKE_CXX_COMPILER clang-cl)
endif()

# Debug
set(CMAKE_BUILD_TYPE Debug)
project(algorithm)

add_executable(main src/cc/main.cc)
add_executable(dfs src/cc/dfs.cc)
add_executable(heap src/cc/heap.cc)
add_executable(quick_sort src/cc/quick_sort.cc)

add_custom_target(format ALL COMMAND clang-format -i -style=google ${CMAKE_SOURCE_DIR}/src/cc/*.cc)
