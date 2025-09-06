#include <iostream>
#include <memory>
#include <string>
#include <vector>

using namespace std;

class Prototype {
 public:
  virtual unique_ptr<Prototype> clone() const = 0;
  virtual string getDetails() const = 0;
  virtual ~Prototype() = default;
};

class RectanglePrototype : public Prototype {
 private:
  string color;
  int width;
  int height;

 public:
  RectanglePrototype(string color, int width, int height)
      : color(color), width(width), height(height) {}

  unique_ptr<Prototype> clone() const override {
    return make_unique<RectanglePrototype>(this->color, this->width,
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

  vector<unique_ptr<Prototype>> rectangleList;

  for (auto _ = 0; _ < rectangleCnt; _++) {
    auto originalRectangle =
        make_unique<RectanglePrototype>(color, width, height);
    rectangleList.emplace_back(std::move(originalRectangle));
  }

  for (const auto& rectangle : rectangleList) {
    auto clonedRectangle = rectangle->clone();
    cout << clonedRectangle->getDetails() << endl;
  }
}
