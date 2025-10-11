from abc import ABC, abstractmethod


class TV(ABC):
    @abstractmethod
    def turnOn(self):
        pass

    @abstractmethod
    def turnOff(self):
        pass

    @abstractmethod
    def switchChannel(self):
        pass


class SonyTV(TV):
    def turnOn(self):
        print("Sony TV is ON")

    def turnOff(self):
        print("Sony TV is OFF")

    def switchChannel(self):
        print("Switching Sony TV channel")


class TclTV(TV):
    def turnOn(self):
        print("TCL TV is ON")

    def turnOff(self):
        print("TCL TV is OFF")

    def switchChannel(self):
        print("Switching TCL TV channel")


class RemoteControl(ABC):
    def __init__(self, tv: TV):
        self.tv: TV = tv

    @abstractmethod
    def performOperation(self):
        pass


class OnOperation(RemoteControl):
    def performOperation(self):
        self.tv.turnOn()


class OffOperation(RemoteControl):
    def performOperation(self):
        self.tv.turnOff()


class ChannelSwitchOperation(RemoteControl):
    def performOperation(self):
        self.tv.switchChannel()


totalCnt = int(input().strip())
for _ in range(totalCnt):
    brand, operation = map(int, input().strip().split(" "))

    tv: TV
    if brand == 0:
        tv = SonyTV()
    elif brand == 1:
        tv = TclTV()
    else:
        continue

    remoteControl: RemoteControl
    if operation == 2:
        remoteControl = OnOperation(tv)
    elif operation == 3:
        remoteControl = OffOperation(tv)
    elif operation == 4:
        remoteControl = ChannelSwitchOperation(tv)
    else:
        continue

    remoteControl.performOperation()
