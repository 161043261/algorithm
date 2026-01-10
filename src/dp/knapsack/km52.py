from functools import cache

n, cap = list(map(int, input().split(" ")))
weights = [0 for _ in range(n)]
values = [0 for _ in range(n)]

for i in range(n):
    wI, vI = list(map(int, input().split(" ")))
    weights[i], values[i] = wI, vI


# ==================== Solution A ====================
@cache
def dfs(idx: int, size: int) -> int:
    if idx < 0:
        return 0
    if size < weights[idx]:
        return dfs(idx - 1, size)

    # size >= weights[idx]
    return max(dfs(idx - 1, size), dfs(idx, size - weights[idx]) + values[idx])


print(dfs(n - 1, cap))

# ==================== Solution B ====================
f = [([0] * (cap + 1)) for _ in range(n + 1)]
for idx in range(1, n + 1):
    for size in range(0, cap + 1):
        if size < weights[idx - 1]:
            f[idx][size] = f[idx - 1][size]
        else:
            f[idx][size] = max(
                f[idx - 1][size], f[idx][size - weights[idx - 1]] + values[idx - 1]
            )

print(f[n][cap])
