// package.json 中 "type": "module"
// tsconfig.json 中 "module": "CommonJS" 时, 输出 cjs
// tsconfig.json 中 "module": "ESNext" 时, 输出 cjs
// tsconfig.json 中 "module": "NodeNext" 时, 输出 esm
import readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const [a, b] = line.split(" ").map(Number);
  console.log(a + b);
})
