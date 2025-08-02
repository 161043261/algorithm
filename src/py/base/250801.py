# 多维数组
def ndArray():
    arr1 = [1 for _ in range(3)]
    print(arr1)

    arr2 = [[1, 1, 1] for _ in range(3)]
    print(arr2)
    arr2[0][0] = 3
    print(arr2)

    arr3 = [1] * 3
    print(arr3)

    arr4 = [[1, 1, 1]] * 3
    print(arr4)
    arr4[0][0] = 3
    print(arr4)
