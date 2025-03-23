cmake_minimum_required(VERSION 3.21)

set(CMAKE_C_STANDARD 23)
set(CMAKE_C_STANDARD_REQUIRED OFF)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED OFF)

# set(CMAKE_C_COMPILER gcc)
set(CMAKE_C_COMPILER clang)
# set(CMAKE_CXX_COMPILER g++)
set(CMAKE_CXX_COMPILER clang++)

# debug
set(CMAKE_BUILD_TYPE Debug)

project(algorithm)

add_executable(main ./cpp/main.hpp ./cpp/main.cpp)
add_executable(dfs ./cpp/dfs.cpp)

# hot100
add_executable(17 ./hot100/17.cpp)
add_executable(78 ./hot100/78.cpp)
add_executable(207 ./hot100/207.cpp)
add_executable(239 ./hot100/239.cpp)
add_executable(994 ./hot100/994.cpp)

find_program(CLANG_FORMAT clang-format)
if(CLANG_FORMAT)
  add_custom_target(format ALL
    COMMAND ${CLANG_FORMAT} -i -style=google
    ${CMAKE_SOURCE_DIR}/cpp/*.hpp
    ${CMAKE_SOURCE_DIR}/cpp/*.cpp
  )
else()
  message(WARNING "clang-format not found")
endif()
