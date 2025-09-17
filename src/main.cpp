#include <set>
#include <unordered_map>

using namespace std;

class NumberContainers {
  unordered_map<int, int> idx2num;
  unordered_map<int, set<int>> num2indices;

 public:
  void change(int index, int number) {
    auto it = idx2num.find(index);
    if (it != idx2num.end()) {
      num2indices[it->second].erase(index);
    }
    idx2num[index] = number;
    num2indices[number].insert(index);
  }

  int find(int number) {
    auto it = num2indices.find(number);
    return it == num2indices.end() || it->second.empty() ? -1
                                                         : *it->second.begin();
  }
};
