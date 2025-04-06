cmake_minimum_required(VERSION 3.21)

set(CMAKE_GENERATOR Ninja)

set(CMAKE_C_STANDARD 23)
set(CMAKE_CXX_STANDARD 23)

# set(CMAKE_C_COMPILER gcc)
# set(CMAKE_CXX_COMPILER g++)
if(CMAKE_SYSTEM_NAME STREQUAL "Windows")
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

# debug
set(CMAKE_BUILD_TYPE Debug)

project(algorithm)

add_executable(main "cc/main.cc")
add_executable(dfs "cc/dfs.cc")

find_program(CLANG_FORMAT clang-format)
if(CLANG_FORMAT)
  add_custom_target(format ALL
    COMMAND ${CLANG_FORMAT} -i -style=google
    ${CMAKE_SOURCE_DIR}/cc/*.cc
  )
else()
  message(WARNING "clang-format not found")
endif()
