from math import gcd, lcm


def gcdIterative(a: int, b: int) -> int:
    if a < b:
        a, b = b, a
    while b != 0:
        a, b = b, a % b
    return a


def gcdRecursive(a: int, b: int) -> int:
    if b == 0:
        return a
    return gcdRecursive(b, a % b)


def lcmCustom(a: int, b: int) -> int:
    ret = a * b // gcd(a, b)
    print(ret == lcm(a, b))
    return ret
