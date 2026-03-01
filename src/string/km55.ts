import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const iter = rl[Symbol.asyncIterator]();

const input = async () => (await iter.next()).value;

let n = 0;

input().then((line) => {
  n = Number.parseInt(line);
});

input().then((line) => {
  console.log(line.slice(line.length - n) + line.slice(0, line.length - n));
});
