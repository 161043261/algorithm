from abc import ABC, abstractmethod
from typing import Optional


class Chair(ABC):
    @abstractmethod
    def print(self):
        pass


class ModernChair(Chair):
    def print(self):
        print("modern chair")


class ClassicalChair(Chair):
    def print(self):
        print("classical chair")


class Sofa(ABC):
    @abstractmethod
    def print(self):
        pass


class ModernSofa(Sofa):
    def print(self):
        print("modern sofa")


class ClassicalSofa(Sofa):
    def print(self):
        print("classical sofa")


class FurnitureFactory(ABC):
    @abstractmethod
    def createChair(self) -> Chair:
        pass

    @abstractmethod
    def createSofa(self) -> Sofa:
        pass


class ModernFurnitureFactory(FurnitureFactory):
    def createChair(self) -> Chair:
        return ModernChair()

    def createSofa(self) -> Sofa:
        return ModernSofa()


class ClassicalFurnitureFactory(FurnitureFactory):
    def createChair(self) -> Chair:
        return ClassicalChair()

    def createSofa(self) -> Sofa:
        return ClassicalSofa()


productionCnt = int(input().strip())
for _ in range(productionCnt):
    furnitureType = input().strip().lower()

    factory: Optional[FurnitureFactory] = None

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
