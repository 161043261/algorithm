from abc import ABC, abstractmethod
from typing import List


# Abstract product
class Block(ABC):
    @abstractmethod
    def produce(self):
        pass


# Concrete product A
class CircleBlock(Block):
    def produce(self):
        print("Circle Block")


# Concrete product B
class SquareBlock(Block):
    def produce(self):
        print("Square Block")


# Abstract factory
class BlockFactory(ABC):
    @abstractmethod
    def createBlock(self) -> Block:
        pass


# Concrete factory A
class CircleBlockFactory(BlockFactory):
    def createBlock(self) -> Block:
        return CircleBlock()


# Concrete factory B
class SquareBlockFactory(BlockFactory):
    def createBlock(self) -> Block:
        return SquareBlock()


class BlockFactorySystem:
    def __init__(self) -> None:
        self.blocks: List[Block] = []

    def produceBlocks(self, factory: BlockFactory, cnt: int):
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
