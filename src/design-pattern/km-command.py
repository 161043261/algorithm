from abc import ABC, abstractmethod
from typing import Optional


class Command(ABC):
    @abstractmethod
    def execute(self):
        pass


class OrderCommand(Command):
    def __init__(self, drinkName: str, receiver: "DrinkMaker"):
        self.drinkName: str = drinkName
        self.receiver = receiver

    def execute(self):
        self.receiver.makeDrinker(self.drinkName)


class DrinkMaker:
    def makeDrinker(self, drinkName: str):
        print(f"{drinkName} is ready!")


class OrderMachine:
    def __init__(self) -> None:
        self.command: Optional[Command] = None

    def setCommand(self, command: Command):
        self.command = command

    def executeOrder(self):
        if self.command is not None:
            self.command.execute()


drinkMaker = DrinkMaker()
orderMachine = OrderMachine()

totalCnt = int(input().strip())

for _ in range(totalCnt):
    drinkName = input().strip()
    command = OrderCommand(drinkName, drinkMaker)

    orderMachine.setCommand(command)
    orderMachine.executeOrder()
