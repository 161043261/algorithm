import os
import sys
import re
from typing import List

src_dir = sys.argv[1]
results: List[str] = []
for root, dirs, files in os.walk(src_dir):
    for f in files:
        if any(f.endswith(ext) for ext in [".cc", ".cpp", ".cxx", ".c++"]):
            path = os.path.join(root, f)
            with open(path, "r", errors="ignore") as src:
                if re.search(r"int\s+main\s*\(", src.read()):
                    results.append(path)
print(";".join(results))
