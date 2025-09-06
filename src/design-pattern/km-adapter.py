from abc import ABC, abstractmethod


class Usb(ABC):
    @abstractmethod
    def chargeWithUsb(self):
        pass


class TypeC(ABC):
    @abstractmethod
    def chargeWithTypeC(self):
        pass


class NewComputer(TypeC):
    def __init__(self) -> None:
        self.usbAdapter: UsbCharger

    def chargeWithTypeC(self):
        print("TypeC")


class UsbCharger(Usb):
    def chargeWithUsb(self):
        print("USB Adapter")


class TypeCToUsbAdapter(TypeC):
    def __init__(self, usbDevice: Usb) -> None:
        self.usbDevice: Usb = usbDevice

    def chargeWithTypeC(self):
        self.usbDevice.chargeWithUsb()


totalCnt = int(input().strip())

newComputer = NewComputer()
usbCharger = UsbCharger()
typeCToUsbAdapter = TypeCToUsbAdapter(usbCharger)

for _ in range(totalCnt):
    num = int(input().strip())
    if num == 1:
        newComputer.chargeWithTypeC()
        continue

    if num == 2:
        typeCToUsbAdapter.chargeWithTypeC()
