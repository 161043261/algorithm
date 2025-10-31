cmake_minimum_required(VERSION 3.21)

project(algorithm CXX)

# sudo apt install clang-tools
set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_GENERATOR Ninja)

if(WIN32)
  set(CMAKE_C_COMPILER gcc)
  set(CMAKE_CXX_COMPILER g++)
else()
  set(CMAKE_C_COMPILER clang)
  set(CMAKE_CXX_COMPILER clang++)
endif()

# ---------- Debug ----------
set(CMAKE_BUILD_TYPE Debug)

file(GLOB_RECURSE source_files CONFIGURE_DEPENDS "${CMAKE_SOURCE_DIR}/src/*.cpp")

foreach(source_file IN LISTS source_files)
  file(READ "${source_file}" source_file_content)
  string(FIND "${source_file_content}" "int main(" main_position)
  if(NOT main_position EQUAL -1)
    file(RELATIVE_PATH rel_path "${CMAKE_SOURCE_DIR}" "${source_file}")
    get_filename_component(source_file_name_we "${rel_path}" NAME_WE) # with extension
    get_filename_component(source_directory "${rel_path}" DIRECTORY)
    string(REPLACE "/" "_" target_name "${rel_path}")
    string(REPLACE ".cpp" "" target_name "${target_name}")
    add_executable(${target_name} "${source_file}")
    set(target_directory "${CMAKE_BINARY_DIR}/${source_directory}")
    set_target_properties(${target_name} PROPERTIES
      RUNTIME_OUTPUT_DIRECTORY "${target_directory}"
      OUTPUT_NAME "${source_file_name_we}"
    )
    message(STATUS "Y: ${source_file} → ${target_directory}/${source_file_name_we}")
  else()
    message(STATUS "n: ${source_file}")
  endif()
endforeach()

find_program(clang_format_executable NAMES clang-format)

if(clang_format_executable)
  add_custom_target(format ALL
    COMMAND ${clang_format_executable} -i -style=google ${source_files}
    WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
    COMMENT "clang-format -i -style=google ${source_files}"
  )
else()
  message(WARNING "clang-format not found")
endif()
