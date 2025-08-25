#include <iostream>

using namespace std;

class Usb {
 public:
  virtual void chargeWithUsb() = 0;
};

class TypeC {
 public:
  virtual void chargeWithTypeC() = 0;
};

class NewComputer : public TypeC {
 public:
  void chargeWithTypeC() override { cout << "TypeC" << endl; }
};

class UsbCharger : public Usb {
 public:
  void chargeWithUsb() override { cout << "USB Adapter" << endl; }
};

class TypeCToUsbAdapter : public TypeC {
 private:
  Usb* usbDevice;

 public:
  TypeCToUsbAdapter(Usb* usbDevice) : usbDevice(usbDevice) {}
  void chargeWithTypeC() override { usbDevice->chargeWithUsb(); }
};

int main() {
  auto totalCnt = 0;
  cin >> totalCnt;

  auto newComputer = NewComputer();
  auto usbCharger = UsbCharger();
  auto typeToUsbAdapter = TypeCToUsbAdapter(&usbCharger);

  for (auto _ = 0; _ < totalCnt; _++) {
    int num;
    cin >> num;
    if (num == 1) {
      newComputer.chargeWithTypeC();
      continue;
    }

    if (num == 2) {
      typeToUsbAdapter.chargeWithTypeC();
    }
  }
}
