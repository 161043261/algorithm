from typing import Dict, Optional
from threading import Lock


class Cart:
    __instance: Optional["Cart"] = None  # private static
    __lock: Lock = Lock()  # private static

    def __init__(self) -> None:
        self.name2cnt: Dict[str, int] = {}

    @classmethod
    def getInstance(cls):
        if cls.__instance is None:
            with cls.__lock:
                if cls.__instance is None:
                    cls.__instance = Cart()

        return cls.__instance

    def add(self, name: str, cnt: int):
        if name in self.name2cnt:
            self.name2cnt[name] += cnt
        else:
            self.name2cnt[name] = cnt

    def print(self):
        for name, cnt in self.name2cnt.items():
            print(name, cnt)


try:
    while True:
        name, cntStr = input().strip().split(" ")
        cnt = int(cntStr)
        cart = Cart.getInstance()
        cart.add(name, cnt)

except EOFError as _:
    cart = Cart.getInstance()
    cart.print()
