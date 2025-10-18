itemNum, totalVolume = map(int, input().strip().split(" "))

itemVolumes = list(map(int, input().strip().split(" ")))
itemValues = list(map(int, input().strip().split(" ")))

dp = [0] * (totalVolume + 1)

for i in range(1, itemNum + 1):
    for j in range(totalVolume, 0, -1):
        if j < itemVolumes[i - 1]:
            continue

        dp[j] = max(
            dp[j], dp[j - itemVolumes[i - 1]] + itemValues[i - itemVolumes[i - 1]]
        )

print(dp[totalVolume])
