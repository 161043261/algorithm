# 01 背包

itemNum, totalVolume = map(int, input().strip().split(" "))

itemVolumes = list(map(int, input().strip().split(" ")))
itemValues = list(map(int, input().strip().split(" ")))

dp = [[0 for _ in range(totalVolume + 1)] for _ in range(itemNum + 1)]

for i in range(1, itemNum + 1):
    for j in range(1, totalVolume + 1):
        if j < itemVolumes[i - 1]:
            dp[i][j] = dp[i - 1][j]
            continue

        dp[i][j] = max(
            dp[i - 1][j], dp[i - 1][j - itemVolumes[i - 1]] + itemValues[i - 1]
        )

print(dp[itemNum][totalVolume])
