import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineno = 0;

let itemNum = 0;
let totalVolume = 0;
let itemVolumes: number[];
let itemValues: number[];

rl.on("line", (line) => {
  lineno++;

  if (lineno === 1) {
    [itemNum, totalVolume] = line
      .trim()
      .split(" ")
      .map((item) => Number.parseInt(item));
    return;
  }

  if (lineno === 2) {
    itemVolumes = line
      .trim()
      .split(" ")
      .map((item) => Number.parseInt(item));
    return;
  }

  itemValues = line
    .trim()
    .split(" ")
    .map((item) => Number.parseInt(item));
  console.log(maxTotalValue(itemNum, totalVolume, itemVolumes, itemValues));
  rl.close();
});

function maxTotalValue(
  itemNum: number,
  totalWeight: number,
  itemWeights: number[],
  itemValues: number[],
): number {
  // 初始化 f 数组
  const f = Array.from({ length: itemNum + 1 }, () =>
    new Array(totalWeight + 1).fill(0),
  );

  // console.log(f)
  for (let i = 1; i <= itemNum; i++) {
    for (let j = 1; j <= totalWeight; j++) {
      if (j < itemWeights[i - 1]) {
        f[i][j] = f[i - 1][j];
        continue;
      }
      f[i][j] = // 前 i 个物品, 放入容量为 j 的背包的最大收益
        Math.max(
          // 不放物品 i
          // 则 f[i][j] = 前 i-1 个物品, 放入容量为 j 的背包的最大收益
          f[i - 1][j],
          // 放物品 i
          // 则 f[i][j] = 前 i-1 个物品, 放入容量为 j-w[i-1] 的背包的最大收益,
          // 再加上 物品 i-1 的收益 v[i-1]
          f[i - 1][j - itemWeights[i - 1]] + itemValues[i - 1],
        );
    }
  }
  return f[itemNum][totalWeight];
}
