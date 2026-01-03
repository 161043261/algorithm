import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const iter = rl[Symbol.asyncIterator]();

const readline = async () => (await iter.next()).value;

let n = 0;

readline().then((line) => {
  n = Number.parseInt(line);
});

readline().then((line) => {
  console.log(line.slice(line.length - n) + line.slice(0, line.length - n));
});
