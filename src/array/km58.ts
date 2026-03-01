import { createInterface } from "node:readline";
const rl = createInterface({
  input: process.stdin,
});

const iter = rl[Symbol.asyncIterator]();
const input = async () => (await iter.next()).value;

(async function () {
  const n = Number.parseInt(await input());
  const arr: number[] = new Array<number>(n);
  for (let i = 0; i < n; i++) {
    arr[i] = Number.parseInt(await input());
  }
  // Calculate prefix sum
  const preSum = new Array<number>(n + 1);
  preSum[0] = 0;
  for (let i = 1; i <= n; i++) {
    preSum[i] = preSum[i - 1] + arr[i - 1];
  }
  let line = "";
  while ((line = await input())) {
    const [start, end] = line.split(" ").map((item) => Number.parseInt(item));
    const ans = preSum[end + 1] - preSum[start];
    console.log(ans);
  }
})();
