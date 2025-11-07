#include <string>
#include <thread>
#include <unordered_map>

using namespace std;

class Solution {
 public:
  bool canConstruct(string ransomNote, string magazine) {
    auto rChr2cnt = unordered_map<char, int>{};
    auto mChr2cnt = unordered_map<char, int>{};
    auto tr = thread{[&]() {
      for (auto& chr : ransomNote) {
        rChr2cnt[chr]++;
      }
    }};
    auto tm = thread{[&]() {
      for (auto& chr : magazine) {
        mChr2cnt[chr]++;
      }
    }};
    tr.join();
    tm.join();
    for (auto& [chr, rCnt] : rChr2cnt) {
      if (mChr2cnt[chr] < rCnt) {
        return false;
      }
    }
    return true;
  }
};
