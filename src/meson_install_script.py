import os
import shutil
import sys


def install_script():
    build_dir = os.environ.get("MESON_BUILD_ROOT", os.getcwd())
    mappings = sys.argv[1:]

    for m in mappings:
        if ":" not in m:
            continue
        target_name, rel_path = m.split(":")

        exe_ext = ".exe" if os.name == "nt" else ""
        src_file = os.path.join(build_dir, target_name + exe_ext)
        dst_file = os.path.join(build_dir, rel_path + exe_ext)

        if os.path.exists(src_file):
            if src_file.lower() == dst_file.lower():
                continue
            os.makedirs(os.path.dirname(dst_file), exist_ok=True)
            shutil.copy2(src_file, dst_file)
            print(f"Installed: {src_file} -> {dst_file}")


if __name__ == "__main__":
    install_script()
