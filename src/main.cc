#include <functional>
#include <string>
#include <vector>

using namespace std;

class Solution {
 public:
  vector<string> restoreIpAddresses(string s) {
    vector<string> ans;
    vector<int> segments;

    function<void(const string &, int, int)> dfs;
    dfs = [&](const string &s, int segId, int segStart) -> void {
      if (segId == 4) {
        if (segStart == s.size()) {
          string ipAddr;
          for (auto i = 0; i < 4; i++) {
            ipAddr += to_string(segments[i]);
            if (i != 3) {
              ipAddr += ".";
            }
          }
          // ans.push_back(move(ipAddr));
          ans.emplace_back(ipAddr);
        }
        return;
      }

      if (segStart == s.size()) {
        return;
      }

      if (s[segStart] == '0') {
        segments[segId] = 0;
        dfs(s, segId + 1, segStart + 1);
        return;
      }

      int addr = 0;
      for (int segEnd = segStart; segEnd < s.size(); segEnd++) {
        addr = addr * 10 + (s[segEnd] - '0');
        if (addr > 0 && addr <= 0xff) {
          segments[segId] = addr;
          dfs(s, segId + 1, segEnd + 1);
        } else {
          break;
        }
      }
    };

    segments.resize(4);
    dfs(s, 0, 0);
    return ans;
  }
};

int main() {}
