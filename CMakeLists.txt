cmake_minimum_required(VERSION 3.21)

set(CMAKE_GENERATOR Ninja)
set(CMAKE_C_STANDARD 23)
set(CMAKE_CXX_STANDARD 23)

if(WIN32)
  set(CMAKE_C_COMPILER gcc)
  set(CMAKE_CXX_COMPILER g++)
else()
  set(CMAKE_C_COMPILER clang)
  set(CMAKE_CXX_COMPILER clang++)
endif()

# Debug
set(CMAKE_BUILD_TYPE Debug)
project(algorithm)

add_executable(main src/main.cc)
add_executable(dfs src/cc/dfs.cc)
add_executable(heap src/cc/heap.cc)
add_executable(quick_sort src/cc/quicksort.cc)

add_custom_target(format ALL COMMAND clang-format -i -style=google ${CMAKE_SOURCE_DIR}/src/*.cc ${CMAKE_SOURCE_DIR}/src/cc/*.cc)
# cmake -S . -B ./build && cmake --build ./build
