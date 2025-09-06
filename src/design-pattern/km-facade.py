class AirConditioner:
    def turnOff(self):
        print("Air Conditioner is turned off.")


class DeskLamp:
    def turnOff(self):
        print("Desk Lamp is turned off.")


class Television:
    def turnOff(self):
        print("Television is turned off.")


class PowerSwitchFacade:
    def __init__(self) -> None:
        self.airConditioner: AirConditioner = AirConditioner()
        self.deskLamp: DeskLamp = DeskLamp()
        self.television: Television = Television()

    def turnOffDevice(self, deviceCode: int):
        if deviceCode == 1:
            self.airConditioner.turnOff()
        elif deviceCode == 2:
            self.deskLamp.turnOff()
        elif deviceCode == 3:
            self.television.turnOff()
        elif deviceCode == 4:
            print("All devices are off.")
        else:
            print("Invalid device code.")


totalCnt = int(input().strip())
powerSwitch = PowerSwitchFacade()

for _ in range(totalCnt):
    deviceCode = int(input().strip())
    powerSwitch.turnOffDevice(deviceCode)
