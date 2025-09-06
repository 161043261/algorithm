from abc import ABC, abstractmethod
from typing import List, Optional


class AbstractDiscountStrategy(ABC):
    @abstractmethod
    def applyDiscount(self, originalPrice: int) -> int:
        pass


class DiscountStrategy(AbstractDiscountStrategy):
    def applyDiscount(self, originalPrice: int):
        return round(originalPrice * 0.9)


class DiscountStrategy2(AbstractDiscountStrategy):
    def __init__(self) -> None:
        self.thresholds: List[int] = [100, 150, 200, 300]
        self.discounts: List[int] = [5, 15, 25, 40]

    def applyDiscount(self, originalPrice: int) -> int:
        for threshold, discount in zip(
            reversed(self.thresholds), reversed(self.discounts)
        ):
            if originalPrice >= threshold:
                return originalPrice - discount
        return originalPrice


class DiscountContext(AbstractDiscountStrategy):
    def __init__(self) -> None:
        self.discountStrategy: Optional[AbstractDiscountStrategy] = None

    def setDiscountStrategy(self, discountStrategy: AbstractDiscountStrategy):
        self.discountStrategy = discountStrategy

    def applyDiscount(self, originalPrice: int) -> int:
        if self.discountStrategy:
            return self.discountStrategy.applyDiscount(originalPrice)
        return originalPrice


totalCnt = int(input().strip())

for _ in range(totalCnt):
    originalPrice, strategyType = map(int, input().strip().split(" "))
    discountStrategy: AbstractDiscountStrategy
    if strategyType == 1:
        discountStrategy = DiscountStrategy()
    elif strategyType == 2:
        discountStrategy = DiscountStrategy2()
    else:
        continue
    context = DiscountContext()
    context.setDiscountStrategy(discountStrategy)
    discountedPrice = context.applyDiscount(originalPrice)
    print(discountedPrice)
