import { createInterface } from "node:readline";

const rl = createInterface({
  input: process.stdin,
  // output: process.stdout
});

let lineno = 0;

let vertexNum = 0;
let edgeNum = 0;
let grid: number[][];
const ans: number[][] = [];

function main() {
  const dfs = (cur: number, path: number[]) => {
    if (cur === vertexNum) {
      ans.push([...path]);
      return;
    }

    for (let i = 1; i <= vertexNum; i++) {
      if (grid[cur][i] === 1) {
        path.push(i);
        dfs(i, path);
        path.pop();
      }
    }
  };

  dfs(1, [1]);
  if (ans.length > 0) {
    for (const item of ans) {
      console.log(item.join(" "));
    }
  } else {
    console.log(-1);
  }
}

rl.on("line", (line) => {
  lineno++;

  if (lineno === 1) {
    [vertexNum, edgeNum] = line.split(" ").map((item) => Number.parseInt(item));
    grid = Array.from({ length: vertexNum + 1 }, () =>
      new Array<number>(vertexNum + 1).fill(0),
    );
    return;
  }

  const [start, end] = line.split(" ").map((item) => Number.parseInt(item));
  grid[start][end] = 1;

  if (lineno === 1 + edgeNum) {
    main();
    rl.close();
  }
});
