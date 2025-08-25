from abc import ABC, abstractmethod
from typing import List  # Abstract Base Class


# Abstract product
class AbstractBlock(ABC):
    @abstractmethod
    def produce(self):
        pass


# Concrete product A
class CircleBlock(AbstractBlock):
    def produce(self):
        print("Circle Block")


# Concrete product B
class SquareBlock(AbstractBlock):
    def produce(self):
        print("Square Block")


# Abstract factory
class AbstractBlockFactory(ABC):
    @abstractmethod
    def createBlock(self) -> AbstractBlock:
        pass


# Concrete Factory A
class CircleBlockFactory(AbstractBlockFactory):
    def createBlock(self) -> AbstractBlock:
        return CircleBlock()


# Concrete Factory B
class SquareBlockFactory(AbstractBlockFactory):
    def createBlock(self) -> AbstractBlock:
        return SquareBlock()


class BlockFactorySystem:
    def __init__(self) -> None:
        self.blocks: List[AbstractBlock] = []

    def produceBlocks(self, factory: AbstractBlockFactory, cnt: int):
        for _ in range(cnt):
            block = factory.createBlock()
            self.blocks.append(block)
            block.produce()

    def getBlocks(self):
        return self.blocks


if __name__ == "__main__":
    factorySystem = BlockFactorySystem()
    productionCnt = int(input().strip())

    circleBlockFactory = CircleBlockFactory()
    squareBlockFactory = SquareBlockFactory()

    for _ in range(productionCnt):
        blockType, cntStr = input().strip().split(" ")
        cnt = int(cntStr)

        if blockType == "Circle":
            factorySystem.produceBlocks(circleBlockFactory, cnt)
            continue

        if blockType == "Square":
            factorySystem.produceBlocks(squareBlockFactory, cnt)
