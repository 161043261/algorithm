#include <stack>
#include <string>

using namespace std;

struct ChrCnt {
  char chr;
  int cnt;
};

class Solution {
 public:
  int countCollisions(string directions) {
    auto stk = stack<ChrCnt>{};
    auto ans = 0;
    for (auto chr : directions) {
      if (stk.size() == 0) {
        stk.push(ChrCnt{chr, 1});
        continue;
      }
      auto top = stk.top();
      auto topChr = top.chr;
      auto topCnt = top.cnt;
      switch (topChr) {
        case 'L': {  // topCnt
          switch (chr) {
            case 'L': {
              stk.pop();
              stk.push(ChrCnt{'L', topCnt + 1});
              break;
            }
            case 'R': {
              stk.push(ChrCnt{'R', 1});
              break;
            }
            case 'S': {
              stk.push(ChrCnt{'S', 0});
              break;
            }
          }
          break;
        }
        case 'R': {  // topCnt
          switch (chr) {
            case 'L': {
              ans += topCnt + 1;
              stk.pop();
              stk.push(ChrCnt{'S', 0});
              break;
            }
            case 'R': {
              stk.pop();
              stk.push(ChrCnt{'R', topCnt + 1});
              break;
            }
            case 'S': {
              ans += topCnt;
              stk.pop();
              stk.push(ChrCnt{'S', 0});
              break;
            }
          }
          break;
        }
        case 'S': {  // topCnt
          switch (chr) {
            case 'L': {
              ans += 1;
              break;
            }
            case 'R': {
              stk.push(ChrCnt{'R', 1});
              break;
            }
            case 'S': {
              break;
            }
          }
          break;
        }
      }
    }
    return ans;
  }
};
