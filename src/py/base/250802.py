from typing import Callable


def createCounter(n: int) -> Callable[[], int]:
    print(createCounter)

    def counter() -> int:
        nonlocal n
        ret = n
        n += 1
        return ret

    return counter


# global 关键字用于内部作用域中, 修改全局作用域的变量
# nonlocal 关键字用于内部作用域中, 修改外部作用域 (非全局) 的变量
counter = createCounter(10)
print(counter())  # 10
print(counter())  # 11
print(counter())  # 12
