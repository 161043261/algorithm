# pip install meson

# cmake -S ./ -B ./build -G Ninja
# meson setup build

# cmake --build ./build
# meson compile -C build

# cmake --build ./build --target format
# meson compile -C build format

# cmake --build build --target clean
# meson compile -C build --clean

# rm -rf ./build
# meson setup build --wipe
project('algorithm',
  'cpp',
  version : '0.1',
  meson_version: '>= 1.3.0',
  default_options : ['cpp_std=c++latest', 'buildtype=debug']
)

fs = import('fs')
py = import('python').find_installation()

meson_setup = files('src/meson_setup.py')
meson_install_script = files('src/meson_install_script.py')

cmd = run_command(py, meson_setup, meson.current_source_dir() / 'src', check: true)
main_sources_raw = cmd.stdout().strip()
main_sources = main_sources_raw != '' ? main_sources_raw.split(';') : []

mappings = []

foreach src : main_sources
  rel_path_with_ext = fs.relative_to(src, meson.current_source_dir())
  rel_path_no_ext = fs.replace_suffix(rel_path_with_ext, '')
  target_id = rel_path_with_ext.underscorify()
  executable(target_id,
    src,
    name_prefix: '',
    install: true
  )
  mappings += target_id + ':' + rel_path_no_ext
endforeach

meson.add_install_script(py, meson_install_script, mappings)

clang_format = find_program('clang-format', required: false)
if clang_format.found()
  run_target('format', command: [clang_format, '-i', '-style=google'] + main_sources)
endif
