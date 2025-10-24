# 背包问题

| 参数              |                          |
| ----------------- | ------------------------ |
| 物品种类          | itemType, itemNum        |
| 背包总重量/总体积 | totalWeight, totalVolume |
| 物品重量/体积     | itemWeights, itemVolumes |
| 物品价值          | itemValues               |

## 01 背包

每个物品只有**一个**，求背包的最大价值

### 案例

[km64](./km46.py)

- 物品数量 = 物品种类 itemType = 3
- 背包容量 totalWeight = 4

|       | weights | values |
| ----- | ------- | ------ |
| item0 | 1       | 15     |
| item1 | 3       | 20     |
| item2 | 4       | 30     |

### 完全背包

每个物品有**无数个**，求背包的最大价值

### 多重背包 (可忽略)

每个物品有**若干个**，求背包的最大价值
