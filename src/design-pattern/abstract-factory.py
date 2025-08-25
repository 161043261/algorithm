# 简单工厂: 一个工厂方法创建所有具体产品
# 工厂方法: 一个工厂方法创建一个具体产品
# 抽象工厂: 一个工厂方法创建一类具体产品

# 抽象工厂

from abc import ABC, abstractmethod
from typing import Optional


class AbstractChair(ABC):
    @abstractmethod
    def print(self):
        pass


class ModernChair(AbstractChair):
    def print(self):
        print("modern chair")


class ClassicalChair(AbstractChair):
    def print(self):
        print("classical chair")


class AbstractSofa(ABC):
    @abstractmethod
    def print(self):
        pass


class ModernSofa(AbstractSofa):
    def print(self):
        print("modern sofa")


class ClassicalSofa(AbstractSofa):
    def print(self):
        print("classical sofa")


class AbstractFurnitureFactory(ABC):
    @abstractmethod
    def createChair(self) -> AbstractChair:
        pass

    @abstractmethod
    def createSofa(self) -> AbstractSofa:
        pass


class ModernFurnitureFactory(AbstractFurnitureFactory):
    def createChair(self) -> AbstractChair:
        return ModernChair()

    def createSofa(self) -> AbstractSofa:
        return ModernSofa()


class ClassicalFurnitureFactory(AbstractFurnitureFactory):
    def createChair(self) -> AbstractChair:
        return ClassicalChair()

    def createSofa(self) -> AbstractSofa:
        return ClassicalSofa()


productionCnt = int(input().strip())
for _ in range(productionCnt):
    furnitureType = input().strip().lower()

    factory: Optional[AbstractFurnitureFactory] = None

    if furnitureType == "modern":
        factory = ModernFurnitureFactory()
    elif furnitureType == "classical":
        factory = ClassicalFurnitureFactory()
    else:
        continue

    chair = factory.createChair()
    sofa = factory.createSofa()

    chair.print()
    sofa.print()
