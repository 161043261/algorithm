cmake_minimum_required(VERSION 3.21)

project(algorithm CXX)

# sudo apt install clang-tools
set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

set(CMAKE_GENERATOR Ninja)

if(WIN32)
  set(CMAKE_CXX_COMPILER clang-cl)
else()
  set(CMAKE_CXX_COMPILER clang++)
endif()

set(CMAKE_BUILD_TYPE Debug)

file(GLOB_RECURSE source_files CONFIGURE_DEPENDS
  "${CMAKE_SOURCE_DIR}/src/*.cc"
  "${CMAKE_SOURCE_DIR}/src/*.cpp"
  "${CMAKE_SOURCE_DIR}/src/*.cxx"
  "${CMAKE_SOURCE_DIR}/src/*.c++"
)

set(SOURCE_EXTENSIONS ".cc" ".cpp" ".cxx" ".c++")

foreach(source_file IN LISTS source_files)
  file(READ "${source_file}" source_file_content)
  string(REGEX MATCH "int[ \t\r\n]+main[ \t\r\n]*\\(" main_match "${source_file_content}")
  if(main_match)
    file(RELATIVE_PATH rel_path "${CMAKE_SOURCE_DIR}" "${source_file}")
    get_filename_component(source_file_name_we "${rel_path}" NAME_WE) # with extension
    get_filename_component(source_directory "${rel_path}" DIRECTORY)
    string(REPLACE "/" "_" target_name "${rel_path}")
    string(REPLACE "\\" "_" target_name "${target_name}")
    foreach(ext IN LISTS SOURCE_EXTENSIONS)
      string(REPLACE "${ext}" "" target_name "${target_name}")
    endforeach()
    add_executable(${target_name} "${source_file}")
    set(target_directory "${CMAKE_BINARY_DIR}/${source_directory}")
    set_target_properties(${target_name} PROPERTIES
      RUNTIME_OUTPUT_DIRECTORY "${target_directory}"
      OUTPUT_NAME "${source_file_name_we}"
    )
    message(STATUS "${rel_path} => ${target_directory}/${source_file_name_we}")
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
