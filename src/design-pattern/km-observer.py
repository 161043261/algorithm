from abc import ABC, abstractmethod
from typing import List


class Observer(ABC):
    @abstractmethod
    def update(self, hour: int):
        pass


class Subject(ABC):
    @abstractmethod
    def registerObserver(self, observer: Observer):
        pass

    @abstractmethod
    def removeObserver(self, observer: Observer):
        pass

    @abstractmethod
    def notifyObservers(self):
        pass


class Clock(Subject):
    def __init__(self) -> None:
        self.observers: List[Observer] = []
        self.hour: int = 0

    def registerObserver(self, observer: Observer):
        self.observers.append(observer)

    def removeObserver(self, observer: Observer):
        self.observers.remove(observer)

    def notifyObservers(self):
        for observer in self.observers:
            observer.update(self.hour)

    def tick(self):
        self.hour += 1
        self.notifyObservers()


class Student(Observer):
    def __init__(self, name: str):
        self.name = name

    def update(self, hour: int):
        print(f"{self.name} {hour}")


studentNum = int(input().strip())
clock = Clock()

for _ in range(studentNum):
    studentName = input().strip()
    clock.registerObserver(Student(studentName))

updateCnt = int(input().strip())
for _ in range(updateCnt):
    clock.tick()
