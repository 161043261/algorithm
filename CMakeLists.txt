cmake_minimum_required(VERSION 3.21)

project(algorithm)

set(CMAKE_C_STANDARD 23)
set(CMAKE_C_STANDARD_REQUIRED ON)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# set(CMAKE_C_COMPILER gcc)
set(CMAKE_C_COMPILER clang)

# set(CMAKE_C_COMPILER g++)
set(CMAKE_C_COMPILER clang++)

add_executable(main ./cc/main.h ./cc/main.cc)
add_executable(dfs ./cc/dfs.cc)

find_package(Threads REQUIRED)
target_link_libraries(main Threads::Threads)

find_program(CLANG_FORMAT clang-format)
if(CLANG_FORMAT)
  add_custom_target(format ALL
    COMMAND ${CLANG_FORMAT} -i -style=google
    ${CMAKE_SOURCE_DIR}/cc/*.h
    ${CMAKE_SOURCE_DIR}/cc/*.cc
  )
else()
  message(WARNING "clang-format not found")
endif()
