from os import path, walk, makedirs
from shutil import rmtree
from sys import platform, exit
from subprocess import run, CalledProcessError

# ==============================
srcDir = "src"
outDir = "out"
srcExtTuple = (".cc", ".cpp")
cppStd = "c++23"
# ==============================

def getCompiler() -> str:
    if platform == "win32":
        return "g++"

    if platform in ["linux", "darwin"]:
        return "clang++"

    print(f"[error] unsupported platform: {platform}")
    return exit(1)


def hasMain(filePath: str) -> bool:
    try:
        with open(filePath, "r", encoding="utf-8", errors="ignore") as f:
            return "int main(" in f.read()
    except Exception as err:
        print(f"[error] file path: {filePath}, error: {err}")
        return False

def removeDir(dirPath: str):
    if path.isdir(outDir):
        try:
            rmtree(outDir)
            print(f"-- {outDir} removed")
        except OSError as err:
            print(f"[error] remove {outDir} error: {err}")
            exit(1)


def startCompile():
    removeDir(outDir)

    compiler = getCompiler()

    print("==================== build start ====================")
    print(f"-- platform: {platform}")
    print(f"-- compiler: {compiler}")
    print(f"-- cpp standard: {cppStd}")
    print(f"-- source directory: {srcDir}")
    print(f"-- out directory: {outDir}")

    if not path.isdir(srcDir):
        print(f"[error] {srcDir} is not a directory")
        exit(1)

    # dirpath, dirnames, filenames
    for dirPath, _, filenames in walk(srcDir):
        for filename in filenames:
            if not filename.endswith(srcExtTuple):
                continue

            srcPath = path.join(dirPath, filename)
            if not hasMain(srcPath):
                continue

            print(f"\033[92m-- Add executable {srcPath}\033[0m")

            srcPathNoExt, _ = path.splitext(srcPath)
            exePath = path.join(outDir, srcPathNoExt)

            if platform == "win32":
                exePath += ".exe"

            exeDir = path.dirname(exePath)
            makedirs(exeDir, exist_ok=True)

            compileCmds = [
                compiler,
                f"-std={cppStd}",
                "-g",
                "-o",
                exePath,
                srcPath,
            ]

            print(f"-- compile command: {' '.join(compileCmds)}")

            try:
                res = run(compileCmds, check=True, capture_output=True, text=True)
                print(f"-- compiled, output -> {exePath}")
                if res.stderr:
                    print(f"[warning] compiler warning: {res.stderr}")
            except FileNotFoundError:
                print(f"[error] {compiler} not found")
            except CalledProcessError as err:
                print(f"[error] compiler error: {err.stderr}")

    print("==================== build end ====================")

if __name__ == '__main__':
    startCompile()
