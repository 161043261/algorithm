#include <iostream>
#include <string>
#include <vector>

using namespace std;

class Prototype {
 public:
  virtual Prototype* clone() const = 0;
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

  Prototype* clone() const override {
    return new RectanglePrototype(this->color, this->width, this->height);
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

  vector<Prototype*> rectangleList;

  for (auto i = 0; i < rectangleCnt; i++) {
    auto originalRectangle = new RectanglePrototype(color, width, height);
    rectangleList.emplace_back(originalRectangle);
  }

  for (const auto& rectangle : rectangleList) {
    auto clonedRectangle = rectangle->clone();
    cout << clonedRectangle->getDetails() << endl;
  }
}
