#include <string>

using namespace std;

class Solution {
 public:
  int maximum69Number(int num) {
    auto numStr = to_string(num);
    for (auto i = 0; i < numStr.size(); i++) {
      if (numStr[i] == '6') {
        numStr[i] = '9';
        return stoi(numStr);
      }
    }

    numStr[numStr.size() - 1] = '6';
    return stoi(numStr);
  }
};
