from copy import copy, deepcopy
from typing import List


# 深浅拷贝
def copyDemo() -> None:
    arr: List[List[int]] = [[1, 2], [3, 4]]

    shallowCopiedArr = arr.copy()
    shallowCopiedArr2 = copy(arr)
    shallowCopiedArr3 = arr[:]
    deepCopiedArr = deepcopy(arr)

    print(arr == shallowCopiedArr)  # True
    print(arr is shallowCopiedArr)  # False
    print(id(arr) == id(shallowCopiedArr))  # False

    print(arr == shallowCopiedArr2)  # True
    print(arr is shallowCopiedArr2)  # False
    print(id(arr) == id(shallowCopiedArr2))  # False

    print(arr == shallowCopiedArr3)  # True
    print(arr is shallowCopiedArr3)  # False
    print(id(arr) == id(shallowCopiedArr3))  # False

    print(arr == deepCopiedArr)  # True
    print(arr is deepCopiedArr)  # False
    print(id(arr) == id(deepCopiedArr))
    # False

    arr[0][0] = 5
    print(shallowCopiedArr)  # [[5, 2], [3, 4]]
    print(shallowCopiedArr2)  # [[5, 2], [3, 4]]
    print(shallowCopiedArr3)  # [[5, 2], [3, 4]]
    print(deepCopiedArr)  # [[1, 2], [3, 4]]


# 自定义排序
def sortDemo() -> None:
    arr = ["cherry", "apple", "banana"]
    # 按字符串长度排序
    # 字符串长度相同时, 按字典序排序
    sortedArr = sorted(arr, key=lambda item: (len(item), item))
    print(arr)
    print(sortedArr)

    arr.sort(key=lambda item: (len(item), item))
    print(arr)
    print(sortedArr)
