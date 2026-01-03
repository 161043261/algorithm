import { createInterface } from "node:readline";
const rl = createInterface({
  input: process.stdin,
});

const iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

(async function () {
  const line = await readline();
  console.log(line);
})();
