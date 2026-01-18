itemNum, totalVolume = map(int, input().strip().split(" "))

itemVolumes = list(map(int, input().strip().split(" ")))
itemValues = list(map(int, input().strip().split(" ")))

f = [0] * (totalVolume + 1)

for i in range(1, itemNum + 1):
    for j in range(totalVolume, 0, -1):
        if j < itemVolumes[i - 1]:
            continue

        f[j] = max(f[j], f[j - itemVolumes[i - 1]] + itemValues[i - itemVolumes[i - 1]])

print(f[totalVolume])
