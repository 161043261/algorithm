#include <iostream>
#include <sstream>

using namespace std;

int main() {
  string line;
  cin >> line;  // 关键点1
  stringstream ss{line};
  string word;
  int len;
  while (ss >> word) {
    len = word.length();
  }
  cout << len;
}
