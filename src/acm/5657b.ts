//! JS Node.js ACM 模式
import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let num = 0;
let t = 0;
const ans: number[] = [];

rl.on("line", (line) => {
  if (num === 0) {
    t = Number(line);
  } else {
    const [a, b] = line.split(" ").map(Number);
    ans.push(a + b); // console.log(a + b);
  }
  num++;
  if (num > t) {
    rl.close();
  }
});

rl.on("close", () => {
  ans.forEach(item => console.log(item));
});
