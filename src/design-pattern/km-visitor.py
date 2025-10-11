from abc import ABC, abstractmethod
from typing import List


class Visitor(ABC):
    @abstractmethod
    def visit(self, shape: "Shape"):
        pass


class Shape(ABC):
    @abstractmethod
    def accept(self, visitor: Visitor):
        pass


class Circle(Shape):
    def __init__(self, radius: int):
        self.radius: int = radius

    def getRadius(self):
        return self.radius

    def accept(self, visitor: Visitor):
        visitor.visit(self)


class Rectangle(Shape):
    def __init__(self, width: int, height: int) -> None:
        self.width: int = width
        self.height: int = height

    def getWidth(self):
        return self.width

    def getHeight(self):
        return self.height

    def accept(self, visitor: Visitor):
        visitor.visit(self)


class AreaCalculator(Visitor):
    def visit(self, shape: Shape):
        if isinstance(shape, Circle):
            area = 3.14 * (shape.getRadius() ** 2)
            print(area)
        if isinstance(shape, Rectangle):
            area = shape.getWidth() * shape.getHeight()
            print(area)


class Drawing(Shape):
    def __init__(self, shapeList: List[Shape]):
        self.shapeList: List[Shape] = shapeList

    def accept(self, visitor: Visitor):
        for shape in self.shapeList:
            shape.accept(visitor)


totalCnt = int(input().strip())
shapeList: List[Shape] = []

for _ in range(totalCnt):
    shapeType, *rest = input().strip().split(" ")

    if shapeType == "Circle":
        radius = int(rest[0])
        shapeList.append(Circle(radius))
    elif shapeType == "Rectangle":
        width, height = map(int, rest)
        shapeList.append(Rectangle(width, height))
    else:
        continue

drawing = Drawing(shapeList)
areaCalculator = AreaCalculator()
drawing.accept(areaCalculator)
