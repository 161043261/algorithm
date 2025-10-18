from abc import ABC, abstractmethod


class Buyer(ABC):
    @abstractmethod
    def requestPurchase(self, area: int):
        pass


class HomeBuyer(Buyer):
    def requestPurchase(self, area: int):
        print("YES")


class HomeProxy(Buyer):
    def __init__(self) -> None:
        self.homeBuyer: HomeBuyer = HomeBuyer()

    def requestPurchase(self, area: int):
        if area > 100:
            self.homeBuyer.requestPurchase(area)
        else:
            print("NO")


homeProxy = HomeProxy()
totalCnt = int(input().strip())

for _ in range(totalCnt):
    area = int(input().strip())
    homeProxy.requestPurchase(area)
