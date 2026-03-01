import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const iter = rl[Symbol.asyncIterator]();

const input = async () => (await iter.next()).value as string;

input().then((line) => {
  console.log(line.replace(/\d/g, () => "number"));
});
