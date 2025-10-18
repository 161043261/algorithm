from abc import ABC, abstractmethod


class State(ABC):
    @abstractmethod
    def handle(self) -> str:
        pass


class OnState(State):
    def handle(self):
        return "Light is ON"


class OffState(State):
    def handle(self) -> str:
        return "Light is OFF"


class BlinkState(State):
    def handle(self) -> str:
        return "Light is Blinking"


class Light:
    def __init__(self) -> None:
        self.state: State = OffState()

    def setState(self, state: State):
        self.state = state

    def performOperation(self):
        return self.state.handle()


light = Light()
totalCnt = int(input().strip())

for _ in range(totalCnt):
    command = input().strip()
    if command == "ON":
        light.setState(OnState())
    elif command == "OFF":
        light.setState(OffState())
    elif command == "BLINK":
        light.setState(BlinkState())
    else:
        continue

    print(light.performOperation())
