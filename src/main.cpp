#include <filesystem>
#include <fstream>
#include <iostream>

using namespace std;

int main() {
  string dir = "ac";
  if (filesystem::exists(dir)) {
    filesystem::remove_all(dir);
  }
  filesystem::create_directory(dir);
  string cdCmd = "cd " + dir;

  auto runCmd = [&](const string& cmd) -> void {
    int ret = system(cmd.c_str());
    if (ret != 0) {
      exit(1);
    }
  };

  runCmd(cdCmd + " && pnpm init");
  runCmd(cdCmd + " && tsc --init");
  runCmd(cdCmd + " && pnpm add @types/node -D");
  ofstream("ac/main1.ts");
  ofstream("ac/main2.ts");
  ofstream("ac/main3.ts");
  runCmd(cdCmd + " && code .");
  return 0;
}
