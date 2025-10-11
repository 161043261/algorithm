from abc import ABC, abstractmethod


class Prototype(ABC):
    @abstractmethod
    def clone(self) -> "Prototype":
        pass

    @abstractmethod
    def getDetails(self) -> str:
        pass


class RectanglePrototype(Prototype):
    def __init__(self, color: str, width: int, height: int):
        self.color: str = color
        self.width: int = width
        self.height: int = height

    def clone(self):
        return RectanglePrototype(self.color, self.width, self.height)

    def getDetails(self):
        return f"Color: {self.color}, Width: {self.width}, Height: {self.height}"


color, *rest = input().strip().split(" ")
width, height = map(int, rest)
rectangleCnt = int(input().strip())

for _ in range(rectangleCnt):
    originalRectangle = RectanglePrototype(color, width, height)
    clonedRectangle = originalRectangle.clone()
    print(clonedRectangle.getDetails())
