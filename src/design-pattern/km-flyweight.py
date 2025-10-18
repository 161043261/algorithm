from enum import Enum
from typing import Dict
from abc import ABC, abstractmethod


class ShapeType(Enum):
    CIRCLE = "CIRCLE"
    RECTANGLE = "RECTANGLE"
    TRIANGLE = "TRIANGLE"


class Position:
    def __init__(self, x: int, y: int) -> None:
        self.x = x
        self.y = y


class Shape(ABC):
    @abstractmethod
    def draw(self, position: Position):
        pass

    @abstractmethod
    def setFirstTime(self, isFirstTime: bool):
        pass


class ConcreteShape(Shape):
    def __init__(self, shapeType: ShapeType):
        self.shapeType: ShapeType = shapeType
        self.isFirstTime = True

    def draw(self, position: Position):
        if self.isFirstTime:
            print(f"{self.shapeType.value} drawn at ({position.x}, {position.y})")
        else:
            print(f"{self.shapeType.value} shared at ({position.x}, {position.y})")

    def setFirstTime(self, isFirstTime: bool):
        self.isFirstTime = isFirstTime


class ShapeFactory:
    def __init__(self) -> None:
        self.shapes: Dict[ShapeType, Shape] = {}

    def getShape(self, shapeType: ShapeType) -> Shape:
        if shapeType not in self.shapes:
            self.shapes[shapeType] = ConcreteShape(shapeType)
        return self.shapes[shapeType]


def processCmd(factory: ShapeFactory, cmd: str):
    shapeType_, x_, y_ = cmd.split(" ")

    shapeType = ShapeType(shapeType_)
    x = int(x_)
    y = int(y_)

    shape = factory.getShape(shapeType)
    shape.draw(Position(x, y))
    shape.setFirstTime(False)


factory = ShapeFactory()
while True:
    try:
        cmd = input().strip()
        processCmd(factory, cmd)
    except EOFError as _:
        break
