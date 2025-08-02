import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const [a, b] = line.split(" ").map((item) => Number.parseInt(item));
  if (a === 0 && b === 0) {
    rl.close();
  }
  console.log(a + b);
});
