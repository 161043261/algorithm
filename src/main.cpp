#include <string>
#include <vector>

using namespace std;

class Spreadsheet {
 public:
  vector<vector<int>> sheet;
  Spreadsheet(int rows)
      : sheet(vector<vector<int>>(rows, vector<int>(26, 0))) {}

  void setCell(string cell, int value) {
    auto col = cell[0] - 'A';
    auto row = stoi(cell.substr(1)) - 1;
    this->sheet[row][col] = value;
  }

  void resetCell(string cell) { this->setCell(cell, 0); }

  int getValue(string formula) {
    auto addIdx = formula.find_first_of('+');
    auto lExpr = formula.substr(1, addIdx - 1);
    auto rExpr = formula.substr(addIdx + 1);
    int l, r;
    try {
      l = stoi(lExpr);
    } catch (...) {
      l = this->getCell(lExpr);
    }

    try {
      r = stoi(rExpr);
    } catch (...) {
      r = this->getCell(rExpr);
    }
    return l + r;
  }

 private:
  int getCell(string cell) {
    auto col = cell[0] - 'A';
    auto row = stoi(cell.substr(1)) - 1;
    return this->sheet[row][col];
  }
};
