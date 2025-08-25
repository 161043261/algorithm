#include <iostream>

using namespace std;

// 抽象主题
class Buyer {
 public:
  virtual void requestBuy(int area) = 0;
};

// 真实主题
class HomeBuyer : public Buyer {
 public:
  void requestBuy(int area) override { cout << "YES" << endl; }
};

// 代理类
class HomeProxy : public HomeBuyer {
 private:
  HomeBuyer homeBuyer;

 public:
  void requestBuy(int area) override {
    if (area > 100) {
      homeBuyer.requestBuy(area);
    } else {
      cout << "NO" << endl;
    }
  }

  HomeProxy(HomeBuyer& buyer) : homeBuyer(buyer) {}
};

int main() {
  auto buyer = HomeBuyer();
  auto buyerProxy = HomeProxy(buyer);
  auto cnt = 0;
  cin >> cnt;

  for (auto _ = 0; _ < cnt; _++) {
    auto area = 0;
    cin >> area;
    buyerProxy.requestBuy(area);
  }
}
