from typing import Optional
from abc import ABC, abstractmethod


class Bike:
    def __init__(self) -> None:
        self.frame: Optional[str] = None
        self.tires: Optional[str] = None

    def setFrame(self, frame: str):
        self.frame = frame

    def setTires(self, tires: str):
        self.tires = tires

    def __str__(self):
        return f"{self.frame} {self.tires}"


class BikeBuilder(ABC):
    @abstractmethod
    def buildFrame(self):
        pass

    @abstractmethod
    def buildTires(self):
        pass

    @abstractmethod
    def getBike(self) -> Bike:
        pass


class MountainBikeBuilder(BikeBuilder):
    def __init__(self) -> None:
        self.bike: Bike = Bike()

    def buildFrame(self):
        self.bike.setFrame("Aluminum Frame")

    def buildTires(self):
        self.bike.setTires("Knobby Tires")

    def getBike(self):
        return self.bike


class RoadBikeBuilder(BikeBuilder):
    def __init__(self) -> None:
        self.bike: Bike = Bike()

    def buildFrame(self):
        self.bike.setFrame("Carbon Frame")

    def buildTires(self):
        self.bike.setTires("Slim Tires")

    def getBike(self):
        return self.bike


class BikeDirector:
    def constructBike(self, builder: BikeBuilder):
        builder.buildFrame()
        builder.buildTires()
        return builder.getBike()


director = BikeDirector()
mountainBikeBuilder = MountainBikeBuilder()
roadBikeBuilder = RoadBikeBuilder()

orderCnt = int(input().strip())
for _ in range(orderCnt):
    bikeType = input().strip().lower()

    builder: Optional[BikeBuilder] = None

    if bikeType == "mountain":
        builder = mountainBikeBuilder
    elif bikeType == "road":
        builder = roadBikeBuilder
    else:
        continue

    bike = director.constructBike(builder)
    print(bike)
