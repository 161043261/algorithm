//! JS Node.js ACM 模式
// package.json 中 "type": "module"
// tsconfig.json 中 "module": "CommonJS" 时, 输出 cjs
// tsconfig.json 中 "module": "ESNext" 时, 输出 cjs
// tsconfig.json 中 "module": "NodeNext" 时, 输出 cjs

// 推荐
// package.json 中 "type": "module"
// tsconfig.json 中 "module": "CommonJS"
// extname === .ts
const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line: string) => {
  const [a, b] = line.split(" ").map(Number);
  console.log(a + b);
});

//! JS V8 ACM 模式
// while ((line = readline())) {
//   const [a, b] = line.split(" ").map(Number);
//   console.log(a + b); // print(a + b);
// }
