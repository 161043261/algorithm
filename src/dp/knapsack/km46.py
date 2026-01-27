# 01 背包

itemNum, totalVolume = map(int, input().strip().split(" "))

itemVolumes = list(map(int, input().strip().split(" ")))
itemValues = list(map(int, input().strip().split(" ")))

f = [[0 for _ in range(totalVolume + 1)] for _ in range(itemNum + 1)]

for i in range(1, itemNum + 1):
    for j in range(1, totalVolume + 1):
        if j < itemVolumes[i - 1]:
            f[i][j] = f[i - 1][j]
            continue

        f[i][j] = max(f[i - 1][j], f[i - 1][j - itemVolumes[i - 1]] + itemValues[i - 1])

print(f[itemNum][totalVolume])
