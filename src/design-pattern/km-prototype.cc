#include <iostream>
#include <memory>
#include <string>
#include <vector>

using namespace std;

class Prototype2 {
 public:
  virtual shared_ptr<Prototype2> clone() const = 0;
  virtual string getDetails() const = 0;
};

class RectanglePrototype2 : public Prototype2 {
 private:
  string color;
  int width;
  int height;

 public:
  RectanglePrototype2(string color, int width, int height)
      : color(color), width(width), height(height) {}

  shared_ptr<Prototype2> clone() const override {
    return make_shared<RectanglePrototype2>(this->color, this->width,
                                            this->height);
  }

  string getDetails() const override {
    return "Color: " + color + ", " + "Width: " + to_string(width) +
           ", Height: " + to_string(height);
  }
};

int main() {
  string color;
  int width, height;
  cin >> color >> width >> height;

  int rectangleCnt;
  cin >> rectangleCnt;

  vector<shared_ptr<Prototype2>> rectangleList;

  for (auto _ = 0; _ < rectangleCnt; _++) {
    auto originalRectangle =
        make_shared<RectanglePrototype2>(color, width, height);
    rectangleList.emplace_back(originalRectangle);
  }

  for (const auto& rectangle : rectangleList) {
    auto clonedRectangle = rectangle->clone();
    cout << clonedRectangle->getDetails() << endl;
  }
}
