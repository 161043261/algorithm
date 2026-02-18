import os
import sys
import re
from typing import List


def find_mains(src_dir: str) -> List[str]:
    res: List[str] = []
    extensions = (".cc", ".cpp", ".cxx", ".c++")
    for root, _, files in os.walk(src_dir):
        for f in files:
            if f.endswith(extensions):
                path = os.path.join(root, f)
                try:
                    with open(path, "r", encoding="utf-8", errors="ignore") as s:
                        if re.search(r"int\s+main\s*\(", s.read()):
                            res.append(os.path.abspath(path))
                except Exception:
                    continue
    return res


if __name__ == "__main__":
    if len(sys.argv) > 1:
        print(";".join(find_mains(sys.argv[1])))
