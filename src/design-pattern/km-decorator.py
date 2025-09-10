from abc import ABC, abstractmethod
from typing import Union


class Coffee(ABC):
    @abstractmethod
    def brew(self):
        pass


class BlackCoffee(Coffee):
    def brew(self):
        print("Brewing Black Coffee")


class Latte(Coffee):
    def brew(self):
        print("Brewing Latte")


class Decorator(Coffee, ABC):
    def __init__(self, coffee: Coffee):
        self._coffee: Coffee = coffee

    def brew(self):
        self._coffee.brew()


class MilkDecorator(Decorator):
    def brew(self):
        super().brew()
        print("Adding Milk")


class SugarDecorator(Decorator):
    def brew(self):
        super().brew()
        print("Adding Sugar")


try:
    while True:
        coffeeType, condimentType = map(int, input().strip().split(" "))

        coffee: Union[Coffee, Decorator]
        if coffeeType == 1:
            coffee = BlackCoffee()
        elif coffeeType == 2:
            coffee = Latte()
        else:
            print("Invalid coffee type")
            continue

        if condimentType == 1:
            coffee = MilkDecorator(coffee)
        elif condimentType == 2:
            coffee = SugarDecorator(coffee)
        else:
            print("Invalid condiment type")
            continue

        coffee.brew()

except EOFError as _:
    pass
