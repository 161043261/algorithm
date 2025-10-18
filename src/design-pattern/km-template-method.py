from abc import ABC, abstractmethod


class CoffeeMakerTemplate(ABC):
    def __init__(self, coffeeName: str):
        self.coffeeName: str = coffeeName

    def makeCoffee(self):
        print(f"Making {self.coffeeName}:")
        self.grindCoffeeBean()
        self.brewCoffee()
        self.addCondiments()
        print()

    @abstractmethod
    def grindCoffeeBean(self):
        pass

    @abstractmethod
    def brewCoffee(self):
        pass

    def addCondiments(self):
        print("Adding condiments")


class AmericanCoffeeMaker(CoffeeMakerTemplate):
    def __init__(self):
        super().__init__("American Coffee")

    def grindCoffeeBean(self):
        print("Grinding coffee beans")

    def brewCoffee(self):
        print("Brewing coffee")


class LatteCoffeeMaker(CoffeeMakerTemplate):
    def __init__(self):
        super().__init__("Latte")

    def grindCoffeeBean(self):
        print("Grinding coffee beans")

    def brewCoffee(self):
        print("Brewing coffee")

    def addCondiments(self):
        print("Adding milk")
        print("Adding condiments")


while True:
    try:
        coffeeType = int(input().strip())
        coffeeMaker: CoffeeMakerTemplate
        if coffeeType == 1:
            coffeeMaker = AmericanCoffeeMaker()
        elif coffeeType == 2:
            coffeeMaker = LatteCoffeeMaker()
        else:
            continue

        coffeeMaker.makeCoffee()

    except EOFError as _:
        break
