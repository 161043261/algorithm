#include <iostream>
#include <memory>
#include <string>
#include <vector>

using namespace std;

class Prototype {
 public:
  virtual shared_ptr<Prototype> clone() const = 0;
  virtual string getDetails() const = 0;
};

class RectanglePrototype : public Prototype {
 private:
  string color;
  int width;
  int height;

 public:
  RectanglePrototype(string color, int width, int height)
      : color(color), width(width), height(height) {}

  shared_ptr<Prototype> clone() const override {
    return make_shared<RectanglePrototype>(this->color, this->width,
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

  vector<shared_ptr<Prototype>> rectangleList;

  for (auto _ = 0; _ < rectangleCnt; _++) {
    auto originalRectangle =
        make_shared<RectanglePrototype>(color, width, height);
    rectangleList.emplace_back(originalRectangle);
  }

  for (const auto& rectangle : rectangleList) {
    auto clonedRectangle = rectangle->clone();
    cout << clonedRectangle->getDetails() << endl;
  }
}
